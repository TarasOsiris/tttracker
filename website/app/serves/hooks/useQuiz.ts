import { useReducer, useCallback } from "react";
import { useDataStore } from "../context";
import { useLanguage } from "../context";
import type { EnrichedServe } from "../models";
import { computeScore } from "../utils/similarity";

export type QuestionType =
  | "identify-spin"
  | "match-motion"
  | "guess-bounce"
  | "return-advice"
  | "name-serve";

export interface QuizQuestion {
  type: QuestionType;
  prompt: string;
  promptData?: Record<string, string>;
  visual?: { spinProfileId: string };
  options: string[];
  correctIndex: number;
  serveId: string;
}

interface QuizState {
  status: "idle" | "playing" | "answered" | "finished";
  questions: QuizQuestion[];
  currentIndex: number;
  selectedAnswer: number | null;
  score: number;
}

type QuizAction =
  | { type: "start"; questions: QuizQuestion[] }
  | { type: "answer"; optionIndex: number }
  | { type: "next" }
  | { type: "restart" };

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "start":
      return {
        status: "playing",
        questions: action.questions,
        currentIndex: 0,
        selectedAnswer: null,
        score: 0,
      };
    case "answer": {
      const q = state.questions[state.currentIndex];
      const correct = action.optionIndex === q.correctIndex;
      return {
        ...state,
        status: "answered",
        selectedAnswer: action.optionIndex,
        score: correct ? state.score + 1 : state.score,
      };
    }
    case "next": {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, status: "finished", selectedAnswer: null };
      }
      return {
        ...state,
        status: "playing",
        currentIndex: nextIndex,
        selectedAnswer: null,
      };
    }
    case "restart":
      return { status: "idle", questions: [], currentIndex: 0, selectedAnswer: null, score: 0 };
    default:
      return state;
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick the most similar serves as plausible distractors, with some randomness. */
function pickSimilar(target: EnrichedServe, candidates: EnrichedServe[], count: number): EnrichedServe[] {
  const scored = candidates
    .map((s) => ({ serve: s, score: computeScore(target, s) }))
    .sort((a, b) => b.score - a.score);
  // Take the top pool (2x count) then shuffle to add variety
  const pool = scored.slice(0, count * 2).map((s) => s.serve);
  return shuffle(pool).slice(0, count);
}

/** Shuffle options while reliably tracking the correct answer's index. */
function buildOptions(correct: string, distractors: string[]): { options: string[]; correctIndex: number } {
  // Remove any distractor that duplicates the correct answer
  const unique = distractors.filter((d) => d !== correct).slice(0, 3);
  // Build indexed pairs so shuffle can't lose track
  const pairs: [string, boolean][] = [[correct, true], ...unique.map((d) => [d, false] as [string, boolean])];
  const shuffled = shuffle(pairs);
  return {
    options: shuffled.map(([label]) => label),
    correctIndex: shuffled.findIndex(([, isCorrect]) => isCorrect),
  };
}

type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

// ─── Question generators ────────────────────────────────────────────

function generateIdentifySpin(serve: EnrichedServe, allServes: EnrichedServe[]): QuizQuestion | null {
  // Distractors must have a different spin profile so only the correct answer matches the wheel
  const others = allServes.filter((s) => s.spinProfile.id !== serve.spinProfile.id);
  if (others.length < 3) return null;
  // Pick similar serves as plausible wrong answers
  const distractors = pickSimilar(serve, others, 3).map((s) => s.name);
  const { options, correctIndex } = buildOptions(serve.name, distractors);
  return {
    type: "identify-spin",
    prompt: "quiz.identifySpin",
    visual: { spinProfileId: serve.spinProfile.id },
    options,
    correctIndex,
    serveId: serve.id,
  };
}

function generateMatchMotion(serve: EnrichedServe, allServes: EnrichedServe[]): QuizQuestion | null {
  // Pick motions from similar serves for plausible wrong answers
  const othersWithDiffMotion = allServes.filter((s) => s.motion.id !== serve.motion.id);
  if (othersWithDiffMotion.length < 3) return null;
  const similar = pickSimilar(serve, othersWithDiffMotion, 6);
  // Deduplicate motion names
  const motionNames = [...new Set(similar.map((s) => s.motion.name))].slice(0, 3);
  // Fall back to random if not enough unique motions from similar serves
  if (motionNames.length < 3) {
    const allMotionNames = [...new Set(othersWithDiffMotion.map((s) => s.motion.name))];
    while (motionNames.length < 3 && allMotionNames.length > motionNames.length) {
      const next = allMotionNames.find((m) => !motionNames.includes(m));
      if (next) motionNames.push(next);
      else break;
    }
  }
  if (motionNames.length < 3) return null;
  const distractors = motionNames.slice(0, 3);
  const { options, correctIndex } = buildOptions(serve.motion.name, distractors);
  return {
    type: "match-motion",
    prompt: "quiz.matchMotion",
    promptData: { name: serve.name },
    options,
    correctIndex,
    serveId: serve.id,
  };
}

/**
 * Uses bounce *category* (short / half-long / long) with translated labels
 * so there are exactly 3 unambiguous options regardless of how many
 * bounce IDs exist within each category.
 */
function generateGuessBounce(
  serve: EnrichedServe,
  allServes: EnrichedServe[],
  t: TranslateFn,
): QuizQuestion | null {
  const allCategories = [...new Set(allServes.map((s) => s.bounce.category))];
  if (allCategories.length < 2) return null;

  const correctCategory = serve.bounce.category;
  const correctLabel = t(`quiz.bounce.${correctCategory}`);
  const otherLabels = allCategories
    .filter((c) => c !== correctCategory)
    .map((c) => t(`quiz.bounce.${c}`));

  const { options, correctIndex } = buildOptions(correctLabel, otherLabels);
  return {
    type: "guess-bounce",
    prompt: "quiz.guessBounce",
    promptData: { name: serve.name },
    options,
    correctIndex,
    serveId: serve.id,
  };
}

function generateReturnAdvice(serve: EnrichedServe, allServes: EnrichedServe[]): QuizQuestion | null {
  if (!serve.returnAdvice) return null;
  // Pick return advice from similar serves for plausible wrong answers
  const othersWithAdvice = allServes.filter(
    (s) => s.returnAdvice && s.returnAdvice !== serve.returnAdvice,
  );
  if (othersWithAdvice.length < 3) return null;
  const similar = pickSimilar(serve, othersWithAdvice, 3);
  const distractors = similar.map((s) => s.returnAdvice!);
  const { options, correctIndex } = buildOptions(serve.returnAdvice, distractors);
  return {
    type: "return-advice",
    prompt: "quiz.returnAdvice",
    promptData: { name: serve.name },
    options,
    correctIndex,
    serveId: serve.id,
  };
}

function generateNameServe(serve: EnrichedServe, allServes: EnrichedServe[]): QuizQuestion | null {
  const others = allServes.filter((s) => s.id !== serve.id);
  if (others.length < 3) return null;
  // Pick similar serves as plausible wrong answers
  const distractors = pickSimilar(serve, others, 3).map((s) => s.name);

  // Truncate at a word boundary
  let desc = serve.description;
  if (desc.length > 120) {
    const cut = desc.lastIndexOf(" ", 120);
    desc = desc.slice(0, cut > 60 ? cut : 120) + "…";
  }

  const { options, correctIndex } = buildOptions(serve.name, distractors);
  return {
    type: "name-serve",
    prompt: "quiz.nameServe",
    promptData: { description: desc },
    options,
    correctIndex,
    serveId: serve.id,
  };
}

// ─── Question generation orchestrator ───────────────────────────────

type Generator = (serve: EnrichedServe, allServes: EnrichedServe[], t: TranslateFn) => QuizQuestion | null;

const generators: Generator[] = [
  generateIdentifySpin,
  generateMatchMotion,
  generateGuessBounce,
  generateReturnAdvice,
  generateNameServe,
];

function generateQuestions(serves: EnrichedServe[], count: number, t: TranslateFn): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const shuffledServes = shuffle(serves);
  let attempts = 0;

  while (questions.length < count && attempts < count * 5) {
    const serve = shuffledServes[attempts % shuffledServes.length];
    const gen = generators[Math.floor(Math.random() * generators.length)];
    const q = gen(serve, serves, t);
    if (q) {
      questions.push(q);
    }
    attempts++;
  }

  return questions;
}

// ─── Hook ───────────────────────────────────────────────────────────

const initialState: QuizState = {
  status: "idle",
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  score: 0,
};

export function useQuiz() {
  const { enrichedServes } = useDataStore();
  const { t } = useLanguage();
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = useCallback(
    (count: number) => {
      const questions = generateQuestions(enrichedServes, count, t);
      dispatch({ type: "start", questions });
    },
    [enrichedServes, t],
  );

  const answer = useCallback((optionIndex: number) => {
    dispatch({ type: "answer", optionIndex });
  }, []);

  const next = useCallback(() => {
    dispatch({ type: "next" });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: "restart" });
  }, []);

  return { state, start, answer, next, restart };
}

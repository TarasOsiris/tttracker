import { useState } from "react";
import { Link, useNavigate } from "../navigation";
import { useLanguage } from "../context";
import { useDataStore } from "../context";
import { Seo } from "../components/Seo";
import { SpinWheel } from "../components/SpinWheel";
import { useQuiz } from "../hooks/useQuiz";
import { breadcrumbList } from "../utils/seo";

const QUESTION_COUNTS = [5, 10, 15];

export default function Quiz() {
  const { language, t } = useLanguage();
  const { store } = useDataStore();
  const { state, start, answer, next, restart } = useQuiz();
  const navigate = useNavigate();
  const [selectedCount, setSelectedCount] = useState(10);

  const question = state.status !== "idle" && state.status !== "finished"
    ? state.questions[state.currentIndex]
    : null;

  const progress = state.questions.length > 0
    ? ((state.currentIndex + (state.status === "answered" ? 1 : 0)) / state.questions.length) * 100
    : 0;

  function getResultMessage() {
    const pct = state.score / state.questions.length;
    if (pct === 1) return t("quiz.resultPerfect");
    if (pct >= 0.7) return t("quiz.resultGreat");
    if (pct >= 0.4) return t("quiz.resultGood");
    return t("quiz.resultPractice");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Seo
        title={t("quiz.pageTitle")}
        description={t("quiz.subtitle")}
        path="/quiz"
        jsonLd={breadcrumbList(language, t("nav.home"), [{ name: t("nav.quiz"), path: "/quiz" }])}
      />

      {/* Start Screen */}
      {state.status === "idle" && (
        <div className="space-y-6 text-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("quiz.title")}</h1>
            <p className="mt-2 text-muted-foreground">{t("quiz.subtitle")}</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">{t("quiz.questionCount")}</label>
            <div className="flex justify-center gap-2">
              {QUESTION_COUNTS.map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedCount(n)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCount === n
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  {n} {t("quiz.questions")}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => start(selectedCount)}
            className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            {t("quiz.start")}
          </button>
        </div>
      )}

      {/* Question / Answer Screen */}
      {(state.status === "playing" || state.status === "answered") && question && (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {state.currentIndex + 1} / {state.questions.length}
          </p>

          {/* Visual */}
          {question.visual && (
            <div className="flex justify-center">
              {(() => {
                const spin = store.spins.get(question.visual.spinProfileId);
                return spin ? <SpinWheel spin={spin} size={160} /> : null;
              })()}
            </div>
          )}

          {/* Question text */}
          <h2 className="text-center text-lg font-semibold text-foreground">
            {question.type === "name-serve" && question.promptData?.description ? (
              <>
                <span className="mb-2 block text-sm font-normal text-muted-foreground italic">
                  "{question.promptData.description}"
                </span>
                {t(question.prompt)}
              </>
            ) : (
              t(question.prompt, question.promptData)
            )}
          </h2>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option, i) => {
              let className =
                "w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ";

              if (state.status === "answered") {
                if (i === question.correctIndex) {
                  className += "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300";
                } else if (i === state.selectedAnswer) {
                  className += "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300";
                } else {
                  className += "border-border bg-card text-foreground opacity-50";
                }
              } else {
                className +=
                  "border-border bg-card text-foreground hover:bg-muted cursor-pointer";
              }

              return (
                <button
                  key={i}
                  onClick={() => state.status === "playing" && answer(i)}
                  disabled={state.status === "answered"}
                  className={className}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {state.status === "answered" && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {state.selectedAnswer === question.correctIndex ? (
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {t("quiz.correct")}
                  </span>
                ) : (
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {t("quiz.wrong")}
                  </span>
                )}
                <span className="mx-2 text-muted-foreground">·</span>
                <Link
                  to={`/serves/${question.serveId}`}
                  className="text-primary hover:underline"
                >
                  {t("quiz.learnMore")}
                </Link>
              </div>
              <button
                onClick={next}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("quiz.next")}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Screen */}
      {state.status === "finished" && (
        <div className="space-y-6 text-center">
          <div>
            <p className="text-4xl font-bold text-foreground">
              {t("quiz.score", { score: state.score, total: state.questions.length })}
            </p>
            <p className="mt-2 text-lg text-muted-foreground">{getResultMessage()}</p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={restart}
              className="rounded-3xl border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {t("quiz.tryAgain")}
            </button>
            <button
              onClick={() => navigate("/serves")}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("quiz.browseServes")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

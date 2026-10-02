import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';
import {Storyboard, Timeline, beatFrame, eventsIn} from '../storyboard';
import {entersWithDissolve} from './Device';

type Cue = {frame: number; sound: string; volume: number};

/** Every sound is placed from the storyboard, so a re-recorded take re-times its own clicks. */
export const cues = (board: Storyboard, timeline: Timeline): Cue[] => {
	const list: Cue[] = [
		{frame: 2, sound: 'pop', volume: 0.7},
		{frame: timeline.introEnd - 20, sound: 'whoosh', volume: 0.45},
		{frame: timeline.outroStart - 6, sound: 'whoosh', volume: 0.45},
		{frame: timeline.outroStart + 8, sound: 'pop', volume: 0.6},
	];
	for (const beat of timeline.beats) {
		if (entersWithDissolve(beat) && beat.effect !== 'night') list.push({frame: beat.start - 5, sound: 'whoosh', volume: 0.35});
		if (beat.effect === 'confetti') list.push({frame: beat.start, sound: 'chime', volume: 0.75});
		if (beat.effect === 'night') list.push({frame: beat.start + 2, sound: 'sweep', volume: 0.5});
		for (const e of eventsIn(board, beat)) {
			if (e.kind !== 'tap') continue;
			const check = beat.tapSound === 'check' && e.y !== undefined && e.y < board.clips[beat.clip].points[1] * 0.8;
			list.push({frame: Math.round(beatFrame(beat, e.t)), sound: check ? 'check' : 'tap', volume: check ? 0.6 : 0.35});
		}
	}
	return list.filter((c) => c.frame >= 0 && c.frame < timeline.total);
};

export const Soundtrack: React.FC<{board: Storyboard; timeline: Timeline}> = ({board, timeline}) => (
	<>
		<Audio
			src={staticFile('audio/music.wav')}
			volume={(f) => interpolate(f, [0, 6, timeline.total - 40, timeline.total - 2], [0, 0.55, 0.55, 0], {extrapolateRight: 'clamp'})}
		/>
		{cues(board, timeline).map((c, i) => (
			<Sequence key={i} from={c.frame} durationInFrames={60} layout="none">
				<Audio src={staticFile(`audio/${c.sound}.wav`)} volume={c.volume} />
			</Sequence>
		))}
	</>
);

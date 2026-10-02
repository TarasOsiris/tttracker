import React from 'react';
import {AbsoluteFill, Freeze, OffthreadVideo, Sequence, interpolate, spring, staticFile, useVideoConfig} from 'remotion';
import {Camera, DISSOLVE, FPS, Storyboard, Timeline, TimedBeat, WIDE, eventsIn} from '../storyboard';
import {Touches} from './Touches';

const mix = (a: Camera, b: Camera, p: number): Camera => ({
	scale: a.scale + (b.scale - a.scale) * p,
	fx: a.fx + (b.fx - a.fx) * p,
	fy: a.fy + (b.fy - a.fy) * p,
});

const cameraAt = (timeline: Timeline, frame: number, fps: number): Camera => {
	const beats = timeline.beats;
	const i = Math.max(0, beats.findIndex((b) => frame < b.end));
	const beat = beats[i] ?? beats[beats.length - 1];
	const from = beats[i - 1]?.camera ?? WIDE;
	const p = spring({frame: frame - beat.start, fps, config: {damping: 200}, durationInFrames: 26});
	return mix(from, beat.camera ?? WIDE, p);
};

/** Content transform for a zoom that keeps the focal point centred but never shows an edge. */
const zoom = (cam: Camera, w: number, h: number) => {
	const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
	const tx = clamp(w / 2 - cam.scale * cam.fx * w, w - cam.scale * w);
	const ty = clamp(h / 2 - cam.scale * cam.fy * h, h - cam.scale * h);
	return `translate(${tx}px, ${ty}px) scale(${cam.scale})`;
};

/** The device rises before the first beat starts; its screen holds the first frame meanwhile. */
const PREROLL = 24;

export const entersWithDissolve = (beat: TimedBeat) => beat.index > 0 && beat.enter !== 'cut';

const BeatScreen: React.FC<{board: Storyboard; beat: TimedBeat; next?: TimedBeat; frame: number; night: boolean}> = ({
	board,
	beat,
	next,
	frame,
	night,
}) => {
	const {screenW, screenH} = board.layout;
	const tail = next && entersWithDissolve(next) ? DISSOLVE : 0;
	const length = beat.end - beat.start + tail + (next ? 0 : 16);
	const preroll = beat.index === 0 ? PREROLL : 0;
	if (frame < beat.start - preroll || frame >= beat.start + length) return null;
	const clip = night && beat.effect === 'night' ? 'dark' : beat.clip;
	const src = staticFile(`clips/${board.kind}/${clip}.mp4`);
	const fadeIn = entersWithDissolve(beat)
		? interpolate(frame - beat.start, [0, DISSOLVE], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
		: 1;
	return (
		<AbsoluteFill style={{opacity: fadeIn, filter: fadeIn < 1 ? `blur(${(1 - fadeIn) * 8}px)` : undefined}}>
			{frame < beat.start && (
				<Freeze frame={Math.round(beat.from * FPS)}>
					<OffthreadVideo src={src} muted style={{width: screenW, height: screenH, display: 'block'}} />
				</Freeze>
			)}
			<Sequence from={beat.start} durationInFrames={length} layout="none">
				<OffthreadVideo
					src={src}
					trimBefore={Math.round(beat.from * FPS)}
					playbackRate={beat.rate}
					muted
					style={{width: screenW, height: screenH, display: 'block'}}
				/>
			</Sequence>
			<Touches
				frame={frame}
				beat={beat}
				events={eventsIn(board, beat, 0.3)}
				points={board.clips[clip].points}
				width={screenW}
				height={screenH}
			/>
		</AbsoluteFill>
	);
};

/**
 * The device and everything that happens on its screen: the takes cut into beats, the in-screen
 * camera, and the enter/leave moves. `night` swaps the night beat's take for the dark-mode one.
 */
export const Device: React.FC<{board: Storyboard; timeline: Timeline; frame: number; night?: boolean}> = ({
	board,
	timeline,
	frame,
	night = false,
}) => {
	const {fps, width, height} = useVideoConfig();
	const {screenW, screenH, bezel, radius, deviceTop} = board.layout;

	const enter = spring({frame: frame - (timeline.introEnd - 18), fps, config: {damping: 16, stiffness: 70, mass: 1}});
	const leave = interpolate(frame, [timeline.outroStart - 4, timeline.outroStart + 16], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: (t) => t * t * t,
	});
	if (enter <= 0.001 || leave >= 1) return null;

	const breath = timeline.beats
		.filter(entersWithDissolve)
		.reduce((acc, b) => acc * (1 - 0.025 * Math.sin(Math.PI * Math.min(1, Math.max(0, (frame - b.start + 4) / (DISSOLVE + 8))))), 1);
	const float = Math.sin(frame / 38) * 5;
	const y = (1 - enter) * height * 0.85 + leave * height * 0.9 + float;
	const tilt = (1 - enter) * 22 - leave * 12;
	const scale = breath * (1 - leave * 0.12);
	const cam = cameraAt(timeline, frame, fps);

	return (
		<div
			style={{
				position: 'absolute',
				left: (width - screenW) / 2 - bezel,
				top: deviceTop,
				width: screenW + bezel * 2,
				height: screenH + bezel * 2,
				padding: bezel,
				borderRadius: radius + bezel,
				background: 'linear-gradient(150deg, #4a4d45 0%, #1b1d18 22%, #2c2f28 60%, #121410 100%)',
				boxShadow: `0 ${height * 0.03}px ${height * 0.05}px -${height * 0.012}px rgba(26,28,22,0.45), inset 0 0 0 2px rgba(255,255,255,0.10)`,
				transform: `perspective(2400px) translateY(${y}px) rotateX(${tilt}deg) scale(${scale})`,
				transformOrigin: '50% 0%',
			}}
		>
			<div style={{position: 'relative', width: screenW, height: screenH, borderRadius: radius, overflow: 'hidden', background: '#000'}}>
				<div style={{position: 'absolute', width: screenW, height: screenH, transformOrigin: '0 0', transform: zoom(cam, screenW, screenH)}}>
					{timeline.beats.map((beat, i) => (
						<BeatScreen key={i} board={board} beat={beat} next={timeline.beats[i + 1]} frame={frame} night={night} />
					))}
				</div>
			</div>
		</div>
	);
};

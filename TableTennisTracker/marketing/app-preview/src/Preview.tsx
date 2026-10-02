import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Background} from './components/Background';
import {Caption} from './components/Caption';
import {Confetti} from './components/Confetti';
import {Device} from './components/Device';
import {Lockup} from './components/Lockup';
import {Soundtrack} from './components/Soundtrack';
import {DeviceKind, STORYBOARDS, Storyboard, Timeline, beatFrame, buildTimeline} from './storyboard';
import {DARK, LIGHT, Palette} from './theme';

const INTRO_TAGLINE = 'Your table tennis training log';
const OUTRO_TAGLINE = 'Log every session. Watch your game grow.';

/** Everything but the effects, in one palette — drawn twice during the night beat. */
const Stage: React.FC<{board: Storyboard; timeline: Timeline; frame: number; palette: Palette; night?: boolean}> = ({
	board,
	timeline,
	frame,
	palette,
	night,
}) => {
	const {layout} = board;
	return (
		<AbsoluteFill>
			<Background palette={palette} />
			{frame < timeline.introEnd + 6 && (
				<Lockup frame={frame} layout={layout} palette={palette} tagline={INTRO_TAGLINE} leaveAt={timeline.introEnd - 22} />
			)}
			{frame >= timeline.outroStart + 4 && (
				<Lockup frame={frame - timeline.outroStart - 4} layout={layout} palette={palette} tagline={OUTRO_TAGLINE} />
			)}
			<Device board={board} timeline={timeline} frame={frame} night={night} />
			{timeline.beats.map((beat) =>
				frame >= beat.start && frame < beat.end ? (
					<div
						key={beat.index}
						style={{
							position: 'absolute',
							left: layout.captionLeft ?? (layout.width - layout.captionWidth) / 2,
							width: layout.captionWidth,
							top: layout.captionTop,
							height: layout.captionBottom - layout.captionTop,
							display: 'flex',
							alignItems: 'center',
							justifyContent: layout.captionAlign === 'left' ? 'flex-start' : 'center',
						}}
					>
						<Caption
							text={beat.caption}
							frame={frame - beat.start}
							duration={beat.end - beat.start}
							palette={palette}
							size={layout.captionSize}
							align={layout.captionAlign}
						/>
					</div>
				) : null,
			)}
		</AbsoluteFill>
	);
};

export const Preview: React.FC<{device: DeviceKind}> = ({device}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const board = STORYBOARDS[device];
	const timeline = buildTimeline(board);

	const nightBeat = timeline.beats.find((b) => b.effect === 'night');
	let nightRadius = 0;
	if (nightBeat) {
		const open = spring({frame: frame - nightBeat.start - 4, fps, config: {damping: 200}, durationInFrames: 30});
		const close = interpolate(frame, [timeline.outroStart - 8, timeline.outroStart + 14], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: (t) => t * t,
		});
		nightRadius = Math.hypot(width, height) * open * (1 - close);
	}
	const nightCenter = `${(board.layout.deviceX ?? width / 2) + board.layout.screenW * 0.5}px ${board.layout.deviceTop + 60}px`;

	// The confetti fires on the tap that saves the won match, wherever that lands in its beat.
	const confettiBeat = timeline.beats.find((b) => b.effect === 'confetti');
	const confettiStart = confettiBeat?.confettiAt !== undefined ? Math.round(beatFrame(confettiBeat, confettiBeat.confettiAt)) : confettiBeat?.start;
	const confettiFrame = confettiStart !== undefined ? frame - confettiStart : -1;

	return (
		<AbsoluteFill>
			<Stage board={board} timeline={timeline} frame={frame} palette={LIGHT} />
			{nightRadius > 0.5 && (
				<AbsoluteFill style={{clipPath: `circle(${nightRadius}px at ${nightCenter})`}}>
					<Stage board={board} timeline={timeline} frame={frame} palette={DARK} night />
				</AbsoluteFill>
			)}
			{confettiFrame >= 0 && confettiFrame < fps * 2.8 && <Confetti frame={confettiFrame} />}
			<Soundtrack board={board} timeline={timeline} />
		</AbsoluteFill>
	);
};

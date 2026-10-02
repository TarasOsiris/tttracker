import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Palette} from '../theme';

type Disc = {x: number; y: number; size: number; tone: 'soft' | 'softer' | 'marker'; delay: number};

// Big soft discs, like out-of-focus balls behind the device. Positions are fractions of the canvas,
// sizes fractions of its width.
const DISCS: Disc[] = [
	{x: 0.92, y: 0.1, size: 0.62, tone: 'marker', delay: 0},
	{x: 0.02, y: 0.38, size: 0.46, tone: 'soft', delay: 4},
	{x: 1.0, y: 0.64, size: 0.36, tone: 'softer', delay: 8},
	{x: 0.08, y: 0.92, size: 0.58, tone: 'marker', delay: 6},
	{x: 0.64, y: 1.04, size: 0.42, tone: 'soft', delay: 10},
];

// Rally arcs: a ball's flight, drawn in slowly as dashed curves. Fractions of the canvas.
const ARCS = [
	{d: (w: number, h: number) => `M ${-0.05 * w} ${0.3 * h} Q ${0.45 * w} ${0.12 * h} ${1.05 * w} ${0.26 * h}`, delay: 10},
	{d: (w: number, h: number) => `M ${-0.05 * w} ${0.86 * h} Q ${0.5 * w} ${0.66 * h} ${1.05 * w} ${0.8 * h}`, delay: 22},
];

export const Background: React.FC<{palette: Palette}> = ({palette}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	// Sized from the shorter side, so the discs keep their scale in a landscape frame.
	const unit = Math.min(width, height);
	return (
		<AbsoluteFill
			style={{background: `linear-gradient(165deg, ${palette.background} 0%, ${palette.background} 38%, ${palette.backgroundDeep} 100%)`}}
		>
			{DISCS.map((d, i) => {
				const grow = spring({frame: frame - d.delay, fps, config: {damping: 14, stiffness: 60, mass: 1.2}});
				const size = d.size * unit;
				const driftX = Math.sin((frame + i * 40) / 70) * unit * 0.012;
				const driftY = Math.cos((frame + i * 55) / 85) * unit * 0.016;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: d.x * width - size / 2 + driftX,
							top: d.y * height - size / 2 + driftY,
							width: size,
							height: size,
							borderRadius: size,
							background: `radial-gradient(circle at 40% 32%, ${palette[d.tone]} 0%, ${palette[d.tone]} 55%, transparent 72%)`,
							transform: `scale(${grow})`,
							opacity: 0.9,
						}}
					/>
				);
			})}
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				{ARCS.map((arc, i) => {
					const draw = spring({frame: frame - arc.delay, fps, config: {damping: 200}, durationInFrames: 60});
					return (
						<path
							key={i}
							d={arc.d(width, height)}
							fill="none"
							stroke={palette.brand}
							strokeOpacity={0.12}
							strokeWidth={unit * 0.006}
							strokeLinecap="round"
							strokeDasharray={`${unit * 0.012} ${unit * 0.024}`}
							pathLength={1000}
							style={{strokeDashoffset: (1 - draw) * 1000, clipPath: `inset(0 ${(1 - draw) * 100}% 0 0)`}}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};

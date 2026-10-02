import React from 'react';
import {interpolate} from 'remotion';
import {ClipEvent, FPS, TimedBeat, beatFrame} from '../storyboard';

const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * A finger, drawn where the capture script actually clicked: iOS's own "show touches" dot.
 * Drags follow the same ease `simtap drag` moved the pointer with, so the dot and the scrolling
 * content move together.
 */
export const Touches: React.FC<{
	frame: number;
	beat: TimedBeat;
	events: ClipEvent[];
	points: number[];
	width: number;
	height: number;
}> = ({frame, beat, events, points, width, height}) => {
	const sx = width / points[0];
	const sy = height / points[1];
	const dot = 46 * sx;
	return (
		<>
			{events.map((e, i) => {
				if (e.x === undefined || e.y === undefined) return null;
				const down = beatFrame(beat, e.t);
				const held = e.kind === 'tap' ? 2 : ((e.duration ?? 0) * FPS) / beat.rate;
				const up = down + held;
				if (frame < down - 4 || frame > up + 12) return null;
				const appear = interpolate(frame, [down - 4, down], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
				const leave = interpolate(frame, [up, up + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
				let x = e.x;
				let y = e.y;
				if (e.kind === 'drag' && e.x2 !== undefined && e.y2 !== undefined) {
					const p = easeInOutQuad(interpolate(frame, [down, up], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
					x = e.x + (e.x2 - e.x) * p;
					y = e.y + (e.y2 - e.y) * p;
				}
				const scale = interpolate(appear, [0, 1], [0.6, 1]) * (1 + leave * 0.5);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x * sx - dot / 2,
							top: y * sy - dot / 2,
							width: dot,
							height: dot,
							borderRadius: dot,
							background: 'rgba(255,255,255,0.55)',
							border: `${dot * 0.05}px solid rgba(40,44,36,0.28)`,
							boxShadow: `0 ${dot * 0.08}px ${dot * 0.3}px rgba(0,0,0,0.22)`,
							opacity: appear * (1 - leave),
							transform: `scale(${scale})`,
						}}
					/>
				);
			})}
		</>
	);
};

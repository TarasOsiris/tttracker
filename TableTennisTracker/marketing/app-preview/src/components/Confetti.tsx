import React from 'react';
import {AbsoluteFill, random, useVideoConfig} from 'remotion';
import {CONFETTI} from '../theme';

type Piece = {
	x0: number;
	vx: number;
	vy: number;
	spin: number;
	flip: number;
	size: number;
	color: string;
	kind: 'rect' | 'dot' | 'ball';
	delay: number;
};

const LIFE = 2.4;

const pieces = (width: number, height: number): Piece[] => {
	const kinds: Piece['kind'][] = ['rect', 'rect', 'rect', 'dot', 'ball'];
	const unit = height / 1920;
	return Array.from({length: 150}, (_, i) => {
		const left = i % 2 === 0;
		const r = (k: string) => random(`confetti-${i}-${k}`);
		const angle = (left ? -1 : 1) * (8 + r('a') * 30) * (Math.PI / 180);
		const speed = (2300 + r('s') * 1500) * unit;
		return {
			x0: left ? -0.02 * width : 1.02 * width,
			vx: (left ? 1 : -1) * Math.abs(Math.sin(angle)) * speed * (0.5 + r('x')),
			vy: -Math.cos(angle) * speed,
			spin: (r('r') - 0.5) * 900,
			flip: 4 + r('f') * 8,
			size: (16 + r('z') * 18) * unit * (width > 1000 ? 1.15 : 1),
			color: CONFETTI[Math.floor(r('c') * CONFETTI.length)],
			kind: kinds[Math.floor(r('k') * kinds.length)],
			delay: r('d') * 0.18,
		};
	});
};

/** Two cannons from the bottom corners for a won match: paper, dots and a few table tennis balls. */
export const Confetti: React.FC<{frame: number}> = ({frame}) => {
	const {fps, width, height} = useVideoConfig();
	const gravity = 3400 * (height / 1920);
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			{pieces(width, height).map((p, i) => {
				const t = frame / fps - p.delay;
				if (t < 0 || t > LIFE) return null;
				const drag = 1 - Math.min(0.6, t * 0.35);
				const x = p.x0 + p.vx * t * drag;
				const y = height * 1.02 + (p.vy * t + 0.5 * gravity * t * t) * drag;
				const fade = Math.min(1, (LIFE - t) / 0.4);
				const ball = p.kind === 'ball';
				const flip = ball ? 1 : Math.cos(t * p.flip);
				const size = ball ? p.size * 1.25 : p.size;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							width: size,
							height: p.kind === 'rect' ? size * 0.55 : size,
							borderRadius: p.kind === 'rect' ? size * 0.12 : size,
							background: ball ? 'radial-gradient(circle at 38% 30%, #FFFFFF 0%, #FFFFFF 40%, #D4E7FF 100%)' : p.color,
							boxShadow: ball ? '0 2px 6px rgba(0,22,61,0.25)' : undefined,
							opacity: fade,
							transform: `translate(${x}px, ${y}px) rotate(${p.spin * t}deg) scaleY(${flip})`,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

import React from 'react';
import {interpolate, spring, useVideoConfig} from 'remotion';
import {HEADLINE, Palette} from '../theme';

type Run = {words: string[]; accent: boolean};

/** `Every session,|*day by day*` -> lines of runs, a starred run set in the accent. */
const parse = (caption: string): Run[][] => {
	let accent = false;
	return caption.split('|').map((line) => {
		const runs: Run[] = [];
		for (const raw of line.split(' ').filter(Boolean)) {
			if (raw.startsWith('*')) accent = true;
			const word = raw.replace(/\*/g, '');
			const last = runs[runs.length - 1];
			if (last && last.accent === accent) last.words.push(word);
			else runs.push({words: [word], accent});
			if (raw.endsWith('*')) accent = false;
		}
		return runs;
	});
};

/**
 * One headline, words rising in on a stagger, each accent run set on a single brand-blue
 * marker that sweeps in once its words have landed. `frame` is local to the caption; it leaves
 * over the last frames of `duration`.
 */
export const Caption: React.FC<{text: string; frame: number; duration: number; palette: Palette; size: number}> = ({
	text,
	frame,
	duration,
	palette,
	size,
}) => {
	const {fps} = useVideoConfig();
	const out = interpolate(frame, [duration - 9, duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const gap = size * 0.26;
	let index = 0;

	const word = (w: string, accent: boolean) => {
		const rise = spring({frame: frame - index++ * 2.5, fps, config: {damping: 18, stiffness: 140, mass: 0.7}});
		return (
			<span
				key={index}
				style={{
					display: 'inline-block',
					color: accent ? palette.onMarker : palette.onBackground,
					opacity: Math.min(rise, 1) * (1 - out),
					transform: `translateY(${(1 - rise) * size * 0.7 - out * size * 0.35}px)`,
					filter: `blur(${interpolate(rise, [0, 1], [10, 0], {extrapolateRight: 'clamp'}) + out * 6}px)`,
				}}
			>
				{w}
			</span>
		);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: size * 0.08,
				fontFamily: HEADLINE,
				fontWeight: 700,
				fontSize: size,
				lineHeight: 1.12,
				letterSpacing: -size * 0.02,
				whiteSpace: 'nowrap',
			}}
		>
			{parse(text).map((runs, li) => (
				<div key={li} style={{display: 'flex', gap}}>
					{runs.map((run, ri) => {
						const firstWord = index;
						const words = run.words.map((w) => word(w, run.accent));
						if (!run.accent) return <span key={ri} style={{display: 'flex', gap}}>{words}</span>;
						const marker = spring({frame: frame - 12 - firstWord * 2.5, fps, config: {damping: 200}, durationInFrames: 16});
						return (
							<span key={ri} style={{display: 'flex', gap, position: 'relative', isolation: 'isolate'}}>
								<span
									style={{
										position: 'absolute',
										left: -size * 0.2,
										right: -size * 0.2,
										top: size * 0.1,
										bottom: size * 0.02,
										borderRadius: size * 0.34,
										background: palette.marker,
										opacity: 1 - out,
										transform: `scaleX(${marker})`,
										transformOrigin: 'left center',
										zIndex: -1,
									}}
								/>
								{words}
							</span>
						);
					})}
				</div>
			))}
		</div>
	);
};

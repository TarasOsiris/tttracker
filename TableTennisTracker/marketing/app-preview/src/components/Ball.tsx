import React from 'react';

/** A table tennis ball: the icon's lit-from-above white, with a soft rim. */
export const Ball: React.FC<{size: number; light: string; shade: string; style?: React.CSSProperties}> = ({
	size,
	light,
	shade,
	style,
}) => (
	<div
		style={{
			position: 'absolute',
			width: size,
			height: size,
			borderRadius: size,
			background: `radial-gradient(circle at 38% 30%, ${light} 0%, ${light} 35%, ${shade} 100%)`,
			boxShadow: `inset 0 0 0 ${size * 0.02}px rgba(255,255,255,0.6), 0 ${size * 0.08}px ${size * 0.2}px rgba(0,22,61,0.18)`,
			...style,
		}}
	/>
);

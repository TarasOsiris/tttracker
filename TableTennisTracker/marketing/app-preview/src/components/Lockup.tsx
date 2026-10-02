import React from 'react';
import {Img, interpolate, spring, staticFile, useVideoConfig} from 'remotion';
import {Layout} from '../storyboard';
import {HEADLINE, Palette} from '../theme';
import {Ball} from './Ball';

/**
 * The app icon on a soft halo with a ball circling it, then the name and a tagline. `frame` is
 * local: it builds from 0, and `leaveAt` (if given) is the local frame it starts lifting away.
 */
export const Lockup: React.FC<{frame: number; layout: Layout; palette: Palette; tagline: string; leaveAt?: number}> = ({
	frame,
	layout,
	palette,
	tagline,
	leaveAt,
}) => {
	const {fps, width, height} = useVideoConfig();
	const {iconSize, titleSize} = layout;
	const pop = spring({frame: frame - 2, fps, config: {damping: 11, stiffness: 120, mass: 0.9}});
	const halo = spring({frame, fps, config: {damping: 20, stiffness: 60}});
	const title = spring({frame: frame - 9, fps, config: {damping: 18, stiffness: 110}});
	const tag = spring({frame: frame - 16, fps, config: {damping: 20, stiffness: 100}});
	const leave =
		leaveAt === undefined
			? 0
			: interpolate(frame, [leaveAt, leaveAt + 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => t * t});
	const haloSize = iconSize * 1.75;

	// The ball circles the icon on a tilted orbit, passing behind it on the far side.
	const orbit = frame / fps * 2.4 - 0.6;
	const ballSize = iconSize * 0.2;
	const rx = haloSize * 0.5;
	const ry = haloSize * 0.17;
	const bx = Math.cos(orbit) * rx;
	const by = Math.sin(orbit) * ry - Math.cos(orbit) * ry * 0.6;
	const behind = Math.sin(orbit) < 0;
	const ballIn = spring({frame: frame - 8, fps, config: {damping: 14, stiffness: 90}});
	const ball = (
		<Ball
			size={ballSize}
			light={palette.ball}
			shade={palette.ballShade}
			style={{
				left: haloSize / 2 + bx - ballSize / 2,
				top: haloSize / 2 + by - ballSize / 2,
				transform: `scale(${ballIn * (behind ? 0.82 : 1)})`,
				zIndex: behind ? 0 : 2,
			}}
		/>
	);

	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				top: height * (width > height ? 0.2 : 0.3),
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				opacity: 1 - leave,
				transform: `translateY(${-leave * height * 0.08}px) scale(${1 - leave * 0.1})`,
			}}
		>
			<div style={{position: 'relative', width: haloSize, height: haloSize, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						borderRadius: haloSize,
						background: `radial-gradient(circle, ${palette.marker} 0%, ${palette.marker} 52%, transparent 71%)`,
						transform: `scale(${halo})`,
					}}
				/>
				{behind && ball}
				<Img
					src={staticFile('icon.png')}
					style={{
						position: 'relative',
						zIndex: 1,
						width: iconSize,
						height: iconSize,
						filter: `drop-shadow(0 ${iconSize * 0.07}px ${iconSize * 0.09}px rgba(0,22,61,0.28))`,
						transform: `scale(${pop}) rotate(${(1 - pop) * -14}deg)`,
					}}
				/>
				{!behind && ball}
			</div>
			<div
				style={{
					marginTop: titleSize * 0.35,
					fontFamily: HEADLINE,
					fontWeight: 700,
					fontSize: titleSize,
					letterSpacing: -titleSize * 0.02,
					color: palette.onBackground,
					opacity: title,
					transform: `translateY(${(1 - title) * titleSize * 0.6}px)`,
					filter: `blur(${(1 - title) * 6}px)`,
				}}
			>
				TT Tracker
			</div>
			<div
				style={{
					marginTop: titleSize * 0.25,
					fontFamily: HEADLINE,
					fontWeight: 500,
					fontSize: titleSize * 0.46,
					color: palette.onSurfaceVariant,
					opacity: tag,
					transform: `translateY(${(1 - tag) * 20}px)`,
					maxWidth: width * 0.84,
					textAlign: 'center',
				}}
			>
				{tagline}
			</div>
		</div>
	);
};

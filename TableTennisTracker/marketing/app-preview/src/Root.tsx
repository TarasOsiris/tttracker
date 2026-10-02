import React from 'react';
import {Composition} from 'remotion';
import {Preview} from './Preview';
import {FPS, STORYBOARDS, buildTimeline} from './storyboard';
import './theme';

// App Store app preview specs: 886x1920 for the 6.9"/6.5" iPhone slot, 1200x1600 for the 13" iPad
// slot, 30 fps, 15-30 s, H.264 with a stereo AAC track.
export const Root: React.FC = () => (
	<>
		<Composition
			id="iPhone"
			component={Preview}
			defaultProps={{device: 'iphone' as const}}
			width={STORYBOARDS.iphone.layout.width}
			height={STORYBOARDS.iphone.layout.height}
			fps={FPS}
			durationInFrames={buildTimeline(STORYBOARDS.iphone).total}
		/>
		<Composition
			id="iPad"
			component={Preview}
			defaultProps={{device: 'ipad' as const}}
			width={STORYBOARDS.ipad.layout.width}
			height={STORYBOARDS.ipad.layout.height}
			fps={FPS}
			durationInFrames={buildTimeline(STORYBOARDS.ipad).total}
		/>
	</>
);

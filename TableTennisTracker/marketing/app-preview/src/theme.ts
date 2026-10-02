import {continueRender, delayRender, staticFile} from 'remotion';

// The app's Material 3 palette, from androidApp/.../ui/theme/Color.kt, with the icon's blue as the
// accent so the preview reads as the same brand as the App Store icon above it.
export const LIGHT = {
	background: '#F9F9FF',
	backgroundDeep: '#D6E3FF',
	onBackground: '#191C20',
	onSurfaceVariant: '#44474E',
	brand: '#1A78F0',
	marker: '#D6E3FF',
	onMarker: '#1A5FC4',
	ball: '#FFFFFF',
	ballShade: '#D4E7FF',
	soft: '#E3ECFF',
	softer: '#EEF3FF',
};

export const DARK = {
	background: '#111318',
	backgroundDeep: '#1B2840',
	onBackground: '#E2E2E9',
	onSurfaceVariant: '#C4C6D0',
	brand: '#5AA0FF',
	marker: '#284777',
	onMarker: '#D6E3FF',
	ball: '#E8EEF8',
	ballShade: '#9DB4D9',
	soft: '#1A2334',
	softer: '#161C27',
};

export type Palette = typeof LIGHT;

// The paddle's red, the ball's white and the match-result greens, for the win's confetti.
export const CONFETTI = ['#F5333A', '#FF7A80', '#FFFFFF', '#1A78F0', '#7FB2FF', '#4CAF50', '#F2C783'];

export const HEADLINE = 'Montserrat';

const FACES: [string, string, string][] = [
	[HEADLINE, 'montserrat_bold.ttf', '700'],
	[HEADLINE, 'montserrat_semibold.ttf', '600'],
	[HEADLINE, 'montserrat_medium.ttf', '500'],
];

const fontHandle = delayRender('Loading the app fonts');
Promise.all(
	FACES.map(([family, file, weight]) =>
		new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, {weight}).load().then((face) => document.fonts.add(face)),
	),
).then(() => continueRender(fontHandle));

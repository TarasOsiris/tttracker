import ipadAnalytics from '../public/clips/ipad/analytics.json';
import ipadBrowse from '../public/clips/ipad/browse.json';
import ipadDark from '../public/clips/ipad/dark.json';
import ipadLog from '../public/clips/ipad/log.json';
import iphoneAnalytics from '../public/clips/iphone/analytics.json';
import iphoneBrowse from '../public/clips/iphone/browse.json';
import iphoneDark from '../public/clips/iphone/dark.json';
import iphoneLog from '../public/clips/iphone/log.json';
import androidAnalytics from '../public/clips/android/analytics.json';
import androidBrowse from '../public/clips/android/browse.json';
import androidDark from '../public/clips/android/dark.json';
import androidLog from '../public/clips/android/log.json';

export const FPS = 30;

export type DeviceKind = 'iphone' | 'ipad' | 'android';
export type ClipName = 'browse' | 'log' | 'analytics' | 'dark';

export type ClipEvent = {
	t: number;
	kind: string;
	x?: number;
	y?: number;
	x2?: number;
	y2?: number;
	duration?: number;
};
export type ClipMeta = {points: number[]; duration: number; events: ClipEvent[]};

/** Zoom inside the screen: `scale` around a focal point given as fractions of the screen. */
export type Camera = {scale: number; fx: number; fy: number};
export const WIDE: Camera = {scale: 1, fx: 0.5, fy: 0.5};

export type Beat = {
	clip: ClipName;
	/** Clip time, seconds, where the beat starts. */
	from: number;
	/** Output seconds. The beat consumes `dur * rate` seconds of clip. */
	dur: number;
	rate?: number;
	/** `*word*` marks the words set in the accent. `|` forces a line break. */
	caption: string;
	camera?: Camera;
	/** How the screen changes into this beat. `cut` continues the same take seamlessly. */
	enter?: 'cut' | 'dissolve';
	effect?: 'confetti' | 'night';
	/** Clip time the confetti fires at, when not the start of the beat: the tap that saves the win. */
	confettiAt?: number;
	/** Sound for the taps in this beat. */
	tapSound?: 'tap' | 'check';
};

export type Layout = {
	width: number;
	height: number;
	screenW: number;
	screenH: number;
	/** Top of the device's outer edge. */
	deviceTop: number;
	bezel: number;
	radius: number;
	captionTop: number;
	captionBottom: number;
	captionSize: number;
	captionWidth: number;
	iconSize: number;
	titleSize: number;
	/** Horizontal centre of the device; the middle of the frame when absent. */
	deviceX?: number;
	/** Left edge of the caption box; centred over the device when absent. */
	captionLeft?: number;
	captionAlign?: 'center' | 'left';
};

export type Storyboard = {
	kind: DeviceKind;
	layout: Layout;
	clips: Record<ClipName, ClipMeta>;
	intro: number;
	outro: number;
	beats: Beat[];
};

/** The time of a take's event by its position in the log, so beats follow a re-recorded take. */
const at = (clip: ClipMeta, index: number) => clip.events[index].t;

/**
 * One edit for every device, its boundaries read off the take logs. The log take opens on the add
 * button and ends saving the match and then the session; the match editor opens two gestures before
 * the typing (the add-match tap, then the name field). Browse opens on a scroll, then the month.
 * Analytics opens on its tab.
 */
const beats = (clips: Record<ClipName, ClipMeta>, kind: DeviceKind): Beat[] => {
	const {browse, log, analytics} = clips;
	const ipad = kind === 'ipad';
	const typing = log.events.findIndex((e) => e.kind === 'type');
	const scroll = at(browse, 0);
	const month = at(browse, 1);
	const add = at(log, 0);
	const addMatch = at(log, typing - 2);
	const saveMatch = at(log, log.events.length - 2);
	const tab = at(analytics, 0);
	const analyticsEnd = analytics.duration - 0.2;
	const split = tab + (analyticsEnd - tab) * 0.5;
	const span = (from: number, to: number, dur: number) => ({from, dur, rate: (to - from) / dur});
	return [
		{clip: 'browse', ...span(scroll - 1.1, month - 0.4, 2.2),
			caption: ipad ? 'Every session and its|*details, side by side*' : 'Every session,|*day by day*'},
		{clip: 'browse', ...span(month - 0.4, browse.duration - 0.1, 2.3), caption: 'Your month|*at a glance*', enter: 'cut'},
		{clip: 'log', ...span(add - 0.3, addMatch - 0.3, 3.6), caption: 'Log training|*in seconds*',
			camera: ipad ? {scale: 1.3, fx: 0.5, fy: 0.5} : {scale: 1.06, fx: 0.5, fy: 0.42}},
		{clip: 'log', ...span(addMatch - 0.3, saveMatch - 0.1, 3.4), caption: 'Track every|*match and score*', enter: 'cut',
			camera: ipad ? {scale: 1.3, fx: 0.5, fy: 0.5} : {scale: 1.1, fx: 0.5, fy: 0.3}, tapSound: 'check'},
		{clip: 'log', ...span(saveMatch - 0.1, log.duration - 0.2, 2.4), caption: 'Celebrate|*every win*', enter: 'cut',
			effect: 'confetti', confettiAt: saveMatch + 0.15},
		{clip: 'analytics', ...span(tab - 0.3, split, 3.2), caption: 'See your game|*improve*'},
		{clip: 'analytics', ...span(split, analyticsEnd, 3.0), enter: 'cut',
			caption: kind === 'android' ? 'Find your|*training rhythm*' : 'Streaks, load and|*head-to-head*'},
		{clip: 'browse', from: 0.3, dur: 2.8, caption: 'Easy on the eyes,|*day or night*', effect: 'night'},
	];
};

const IPHONE_CLIPS = {browse: iphoneBrowse, log: iphoneLog, analytics: iphoneAnalytics, dark: iphoneDark};
const IPAD_CLIPS = {browse: ipadBrowse, log: ipadLog, analytics: ipadAnalytics, dark: ipadDark};
const ANDROID_CLIPS = {browse: androidBrowse, log: androidLog, analytics: androidAnalytics, dark: androidDark};

export const STORYBOARDS: Record<DeviceKind, Storyboard> = {
	iphone: {
		kind: 'iphone',
		layout: {
			width: 886, height: 1920, screenW: 620, screenH: 1347, deviceTop: 505, bezel: 15, radius: 90,
			captionTop: 110, captionBottom: 480, captionSize: 70, captionWidth: 800, iconSize: 230, titleSize: 64,
		},
		clips: IPHONE_CLIPS,
		intro: 2.3,
		outro: 2.9,
		beats: beats(IPHONE_CLIPS, 'iphone'),
	},
	ipad: {
		kind: 'ipad',
		layout: {
			width: 1200, height: 1600, screenW: 860, screenH: 1147, deviceTop: 382, bezel: 20, radius: 36,
			captionTop: 60, captionBottom: 370, captionSize: 68, captionWidth: 1080, iconSize: 250, titleSize: 84,
		},
		clips: IPAD_CLIPS,
		intro: 2.3,
		outro: 2.9,
		beats: beats(IPAD_CLIPS, 'ipad'),
	},
	// Google Play takes a YouTube promo video, which it shows landscape: the phone beside its caption.
	android: {
		kind: 'android',
		layout: {
			width: 1920, height: 1080, screenW: 452, screenH: 904, deviceTop: 74, bezel: 12, radius: 46,
			captionTop: 0, captionBottom: 1080, captionSize: 84, captionWidth: 860, iconSize: 220, titleSize: 76,
			deviceX: 1360, captionLeft: 150, captionAlign: 'left',
		},
		clips: ANDROID_CLIPS,
		intro: 2.3,
		outro: 2.9,
		beats: beats(ANDROID_CLIPS, 'android'),
	},
};

export type TimedBeat = Beat & {index: number; start: number; end: number; rate: number};

export type Timeline = {
	beats: TimedBeat[];
	introEnd: number;
	outroStart: number;
	total: number;
};

export const DISSOLVE = 10;

export const buildTimeline = (board: Storyboard): Timeline => {
	let cursor = Math.round(board.intro * FPS);
	const introEnd = cursor;
	const beats = board.beats.map((beat, index) => {
		const start = cursor;
		cursor += Math.round(beat.dur * FPS);
		return {...beat, index, start, end: cursor, rate: beat.rate ?? 1};
	});
	return {beats, introEnd, outroStart: cursor, total: cursor + Math.round(board.outro * FPS)};
};

/** Clip seconds shown at an output frame of a beat. */
export const clipTime = (beat: TimedBeat, frame: number) => beat.from + ((frame - beat.start) / FPS) * beat.rate;

/** Output frame at which a clip time plays in a beat. */
export const beatFrame = (beat: TimedBeat, t: number) => beat.start + ((t - beat.from) / beat.rate) * FPS;

export const eventsIn = (board: Storyboard, beat: TimedBeat, pad = 0) => {
	const to = beat.from + beat.dur * beat.rate;
	return board.clips[beat.clip].events.filter((e) => e.t >= beat.from - pad && e.t < to);
};

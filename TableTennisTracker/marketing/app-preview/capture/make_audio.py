#!/usr/bin/env python3
"""Synthesize the preview's music bed and UI sounds into ../public/audio/.

    python3 make_audio.py

Everything is generated, so there is no licensing question and nothing binary to commit. The
bed is a light plucked I-V-vi-IV in D at 112 bpm whose beat comes in on bar two, which is where
the device rises into frame; the composition fades it out against its own length. The one-shots
(tap, check, whoosh, sweep, chime, pop) are placed by `src/components/Soundtrack.tsx` from the
storyboard and the takes' event logs. Pure standard library: 44.1 kHz, 16-bit stereo WAV.
"""
import math, os, random, struct, wave

RATE = 44100
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "audio")
TAU = 2 * math.pi


def buffer(seconds):
    n = int(seconds * RATE)
    return [0.0] * n, [0.0] * n


def write(name, left, right, gain=1.0):
    peak = max(1e-9, max(max(abs(v) for v in left), max(abs(v) for v in right)))
    scale = gain * 0.89 / peak
    frames = bytearray()
    for l, r in zip(left, right):
        frames += struct.pack("<hh", int(max(-1, min(1, l * scale)) * 32767), int(max(-1, min(1, r * scale)) * 32767))
    with wave.open(os.path.join(OUT, f"{name}.wav"), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(bytes(frames))


def midi(note):
    return 440.0 * 2 ** ((note - 69) / 12)


def add(buf, start, samples, pan=0.0):
    left, right = buf
    i0 = int(start * RATE)
    gl, gr = math.cos((pan + 1) * math.pi / 4), math.sin((pan + 1) * math.pi / 4)
    for k, v in enumerate(samples):
        i = i0 + k
        if i >= len(left):
            break
        left[i] += v * gl
        right[i] += v * gr


def pluck(freq, length=1.1, decay=0.28, bright=0.35):
    out = []
    for k in range(int(length * RATE)):
        t = k / RATE
        env = min(1.0, t / 0.004) * math.exp(-t / decay)
        out.append(env * (math.sin(TAU * freq * t) + bright * math.sin(TAU * 2 * freq * t) * math.exp(-t / 0.08)
                          + 0.08 * math.sin(TAU * 3 * freq * t)))
    return out


def pad(freq, length):
    out = []
    for k in range(int(length * RATE)):
        t = k / RATE
        env = min(1.0, t / 0.35) * min(1.0, (length - t) / 0.4)
        out.append(env * (math.sin(TAU * freq * t) + 0.3 * math.sin(TAU * freq * 1.003 * t + 1.0)))
    return out


def kick():
    out, phase = [], 0.0
    for k in range(int(0.22 * RATE)):
        t = k / RATE
        phase += TAU * (48 + 70 * math.exp(-t / 0.03)) / RATE
        out.append(math.sin(phase) * math.exp(-t / 0.09))
    return out


def shaker(seed):
    rnd, prev, out = random.Random(seed), 0.0, []
    for k in range(int(0.05 * RATE)):
        t = k / RATE
        n = rnd.uniform(-1, 1)
        out.append((n - prev) * math.exp(-t / 0.012))
        prev = n
    return out


def music(seconds=32.0, bpm=112):
    buf = buffer(seconds)
    beat = 60 / bpm
    bar = beat * 4
    chords = [(62, 66, 69), (57, 61, 64), (59, 62, 66), (55, 59, 62)]   # D, A, Bm, G
    bars = int(seconds / bar)
    for b in range(bars):
        root, third, fifth = chords[b % 4]
        start = b * bar
        last = b == bars - 1
        for note in (root, third, fifth):
            add(buf, start, [v * 0.05 for v in pad(midi(note), bar + 0.3)], pan=0.0)
        arp = [root + 12, third + 12, fifth + 12, root + 24, fifth + 12, third + 12, fifth + 12, root + 24]
        for i, note in enumerate(arp[: 1 if last else 8]):
            ring = 2.2 if last else 1.0
            add(buf, start + i * beat / 2, [v * 0.16 for v in pluck(midi(note), length=ring, decay=0.9 if last else 0.26)],
                pan=-0.35 if i % 2 else 0.35)
        for h in (0, 2):
            add(buf, start + h * beat, [v * 0.22 for v in pluck(midi(root - 24), 1.0, decay=0.45, bright=0.1)])
        if 1 <= b < bars - 1:
            for q in range(4):
                add(buf, start + q * beat, [v * (0.28 if q % 2 == 0 else 0.18) for v in kick()])
                add(buf, start + q * beat + beat / 2, [v * 0.05 for v in shaker(b * 8 + q)], pan=0.25)
    write("music", *buf, gain=0.9)


def one_shot(name, seconds, voice, gain=0.9, pan=None):
    buf = buffer(seconds)
    left, right = buf
    for k in range(len(left)):
        t = k / RATE
        v = voice(t)
        p = pan(t) if pan else 0.0
        left[k] = v * math.cos((p + 1) * math.pi / 4)
        right[k] = v * math.sin((p + 1) * math.pi / 4)
    write(name, left, right, gain)


def noise_voice(seconds, cutoff, env, seed):
    rnd, state = random.Random(seed), [0.0, 0.0]

    def voice(t):
        a = 1 - math.exp(-TAU * cutoff(t) / RATE)
        state[0] += a * (rnd.uniform(-1, 1) - state[0])
        state[1] += a * (state[0] - state[1])
        return state[1] * env(t)
    return voice


def sounds():
    one_shot("tap", 0.06, lambda t: math.sin(TAU * 2300 * t) * math.exp(-t / 0.007) + 0.3 * math.sin(TAU * 1150 * t) * math.exp(-t / 0.01), 0.55)

    def check(t):
        f = 520 + 640 * (1 - math.exp(-t / 0.025))
        return (math.sin(TAU * f * t) * math.exp(-t / 0.07)
                + 0.35 * math.sin(TAU * 1760 * t) * math.exp(-t / 0.18) * min(1, t / 0.01))
    one_shot("check", 0.45, check, 0.7)

    whoosh = noise_voice(0.5, lambda t: 300 + 3200 * math.sin(math.pi * min(1, t / 0.45)), lambda t: math.sin(math.pi * min(1, t / 0.45)) ** 2, 1)
    one_shot("whoosh", 0.5, whoosh, 0.6, pan=lambda t: -0.6 + 1.2 * t / 0.5)

    shimmer = noise_voice(1.0, lambda t: 200 + 2400 * min(1, t / 0.7), lambda t: math.sin(math.pi * min(1, t / 0.95)) ** 2, 2)
    one_shot("sweep", 1.0, lambda t: shimmer(t) + 0.12 * math.sin(TAU * (330 + 330 * t) * t) * math.sin(math.pi * min(1, t)), 0.6,
             pan=lambda t: 0.6 - 1.2 * t)

    notes = [86, 90, 93, 98]                                              # D6 F#6 A6 D7

    def chime(t):
        v = 0.0
        for i, n in enumerate(notes):
            s = t - i * 0.07
            if s > 0:
                f = midi(n)
                v += (math.sin(TAU * f * s) + 0.4 * math.sin(TAU * f * 2.76 * s) * math.exp(-s / 0.12)) * math.exp(-s / 0.55) * min(1, s / 0.004)
        return v
    one_shot("chime", 1.8, chime, 0.75)

    one_shot("pop", 0.3, lambda t: math.sin(TAU * (190 + 260 * (1 - math.exp(-t / 0.03))) * t) * math.exp(-t / 0.06) * min(1, t / 0.003), 0.8)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    sounds()
    music()
    print("wrote", ", ".join(sorted(os.listdir(OUT))))

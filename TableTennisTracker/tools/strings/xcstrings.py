#!/usr/bin/env python3
"""Project the Compose string resources onto an iOS String Catalog.

`values*/strings.xml` stays the translation source of truth while the Compose UI ships — the
`/translate` command keeps adding keys there — so this is a repeated projection, not a one-off
migration. Run it after translating; `--check` fails if the catalog has drifted.

Deliberately stdlib-only, like .claude/skills/ship/play_upload.py.
"""

import argparse
import json
import re
import sys
import xml.etree.ElementTree as ElementTree
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
RESOURCES = REPO_ROOT / "composeApp/src/commonMain/composeResources"
CATALOG = REPO_ROOT / "iosApp/iosApp/Resources/Shared.xcstrings"
ACCESSORS = REPO_ROOT / "iosApp/iosApp/Generated/AppStrings.swift"

SOURCE_LANGUAGE = "en"

# Android's `values-zh-rCN` is Apple's `zh-CN`, which is what knownRegions and
# CFBundleLocalizations already use.
LANGUAGE_OVERRIDES = {"zh-rCN": "zh-CN"}

# Unreferenced anywhere in Kotlin. Kept in strings.xml (the Compose UI owns that file) but not
# carried onto iOS.
DEAD_KEYS = {
    "action_more", "action_search", "analytics_create_test_session", "analytics_last_created",
    "analytics_minutes_short", "analytics_placeholder", "analytics_service_injected",
    "analytics_test_notes", "analytics_this_week", "analytics_total_matches",
    "analytics_win_loss_format", "hint_duration", "home_view_match", "home_view_player",
    "profile_guest_user", "profile_menu_about", "profile_menu_privacy", "profile_menu_support",
    "profile_sign_in_prompt", "rule_duration", "settings_default_duration",
    "settings_default_duration_description", "settings_placeholder", "title_analytics",
    "title_home",
}

# Weekday and month names, replaced on iOS by Date.FormatStyle — which also orders dates correctly
# per locale, unlike the hand-concatenated formatters in DateTimeFormatExtensions.kt.
DATE_KEY_PATTERN = re.compile(r"^(day|month)_[a-z]+(_short)?$")

# Durations, replaced by Duration.UnitsFormatStyle: correct plural categories for all 14 locales
# from CLDR, versus the current English-only `if (hours == 1)`.
DURATION_KEYS = {
    "duration_minutes_full", "duration_hours_full", "duration_hours_plural_full",
    "duration_hm_short",
}

POSITIONAL_STRING = re.compile(r"%(\d+)\$s")
POSITIONAL_INT = re.compile(r"%(\d+)\$d")
# Everything that is a legitimate format specifier after conversion.
CONVERTED = re.compile(r"%(?:\d+\$(?:lld|@)|%)")
PLACEHOLDER = re.compile(r"%(\d+)\$(lld|@)")

SWIFT_TYPES = {"lld": "Int", "@": "String"}


def is_pruned(key: str) -> bool:
    return key in DEAD_KEYS or key in DURATION_KEYS or bool(DATE_KEY_PATTERN.match(key))


def language_for(directory_name: str) -> str:
    if directory_name == "values":
        return SOURCE_LANGUAGE
    suffix = directory_name.removeprefix("values-")
    return LANGUAGE_OVERRIDES.get(suffix, suffix)


def convert(value: str) -> str:
    """Android string value -> iOS format string."""
    # Android requires apostrophes escaped inside XML; iOS would render the backslash literally.
    value = value.replace("\\'", "'")
    # Swift's Int is 64-bit and arm64 varargs do not promote, so %d would read four bytes and
    # desync the argument list on any string with a second placeholder.
    value = POSITIONAL_INT.sub(r"%\1$lld", value)
    value = POSITIONAL_STRING.sub(r"%\1$@", value)
    if "\\" in value:
        raise ValueError(f"unhandled escape remains: {value!r}")
    # Only positional specifiers are rewritten above, so a bare %d/%s or a stray % would reach the
    # catalog intact and produce garbage — or a crash for %@ — at the call site.
    if CONVERTED.sub("", value).find("%") != -1:
        raise ValueError(
            f"unconverted format specifier in {value!r}: "
            "only %N$lld, %N$@ and %% are supported"
        )
    return value


def read_locale(path: Path) -> dict[str, str]:
    root = ElementTree.parse(path).getroot()
    strings = {}
    for element in root.findall("string"):
        name = element.get("name")
        if name is None:
            raise ValueError(f"{path}: <string> without a name")
        strings[name] = convert(element.text or "")
    return strings


def build_catalog() -> dict:
    directories = sorted(
        d for d in RESOURCES.iterdir() if d.is_dir() and d.name.startswith("values")
    )
    if not directories:
        raise SystemExit(f"no values* directories under {RESOURCES}")

    by_language = {language_for(d.name): read_locale(d / "strings.xml") for d in directories}
    if SOURCE_LANGUAGE not in by_language:
        raise SystemExit(f"no {SOURCE_LANGUAGE} strings found")

    keys = sorted(k for k in by_language[SOURCE_LANGUAGE] if not is_pruned(k))

    strings = {}
    for key in keys:
        localizations = {}
        for language in sorted(by_language):
            value = by_language[language].get(key)
            if value is None:
                continue
            localizations[language] = {
                "stringUnit": {"state": "translated", "value": value}
            }
        # Without an explicit extraction state Xcode treats entries it cannot find in Swift source
        # as stale and offers to delete them.
        strings[key] = {"extractionState": "manual", "localizations": localizations}

    return {"sourceLanguage": SOURCE_LANGUAGE, "strings": strings, "version": "1.0"}


def render(catalog: dict) -> str:
    # Xcode writes " : " and two-space indent; matching it keeps the first manual edit from
    # producing a whole-file diff.
    text = json.dumps(catalog, indent=2, ensure_ascii=False, separators=(",", " : "), sort_keys=True)
    return text + "\n"


def swift_identifier(key: str) -> str:
    head, *tail = key.split("_")
    return head + "".join(part.capitalize() for part in tail)


def placeholder_types(value: str) -> list[str]:
    """Argument Swift types, ordered by position, derived from the English value."""
    found = {int(index): SWIFT_TYPES[spec] for index, spec in PLACEHOLDER.findall(value)}
    return [found[i] for i in sorted(found)]


def render_accessors(catalog: dict) -> str:
    lines = [
        "// Generated by tools/strings/xcstrings.py. Do not edit.",
        "//",
        "// Accessors rather than raw keys so a typo is a build error, and so the argument count and",
        "// types of every format string are checked against the English source.",
        "",
        "import Foundation",
        "",
        "enum L {",
    ]
    for key in sorted(catalog["strings"]):
        english = catalog["strings"][key]["localizations"]["en"]["stringUnit"]["value"]
        name = swift_identifier(key)
        types = placeholder_types(english)
        lines.append(f"\t/// {english}")
        if not types:
            lines.append(f'\tstatic var {name}: String {{ Localization.string("{key}") }}')
        else:
            params = ", ".join(f"_ a{i + 1}: {t}" for i, t in enumerate(types))
            args = ", ".join(f"a{i + 1}" for i in range(len(types)))
            lines.append(f"\tstatic func {name}({params}) -> String {{")
            lines.append(f'\t\tLocalization.format("{key}", {args})')
            lines.append("\t}")
        lines.append("")
    lines.append("}")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check", action="store_true",
        help="exit non-zero if the catalog on disk differs from what would be generated"
    )
    args = parser.parse_args()

    catalog = build_catalog()
    outputs = {CATALOG: render(catalog), ACCESSORS: render_accessors(catalog)}
    key_count = len(catalog["strings"])

    if args.check:
        stale = [
            path for path, expected in outputs.items()
            if (path.read_text(encoding="utf-8") if path.exists() else "") != expected
        ]
        if stale:
            for path in stale:
                print(f"{path.relative_to(REPO_ROOT)} is out of date", file=sys.stderr)
            print("run tools/strings/xcstrings.py", file=sys.stderr)
            return 1
        print(f"iOS strings up to date ({key_count} keys)")
        return 0

    for path, contents in outputs.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(contents, encoding="utf-8")
        print(f"wrote {path.relative_to(REPO_ROOT)}")
    print(f"{key_count} keys")
    return 0


if __name__ == "__main__":
    sys.exit(main())

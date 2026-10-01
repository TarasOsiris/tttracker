#!/usr/bin/env python3
"""Check that a CloudKit environment has every record type and field in iosApp/CloudKit/Schema.ckdb.

TestFlight and the App Store use the Production environment, whose schema is never created on the
fly: a save naming a record type or field it lacks fails, so iCloud sync silently uploads nothing.
Debug builds create the schema only in Development, and only for what they happened to save.

Production cannot be written with cktool ("endpoint not applicable in the environment
'production'"). The fix is to import the schema into Development and deploy it from the CloudKit
Console. This script only reads.

Usage:  python3 tools/check_cloudkit_schema.py [--environment production|development]
Needs a management token saved once per Mac:  xcrun cktool save-token --type management
"""

from __future__ import annotations

import argparse
import os
import pathlib
import re
import subprocess
import sys
import tempfile

REPO = pathlib.Path(__file__).resolve().parent.parent
SCHEMA = REPO / "iosApp/CloudKit/Schema.ckdb"
TEAM_ID = "XW3GM347XY"
CONTAINER_ID = "iCloud.xyz.tleskiv.tt"


def parse(text: str) -> dict[str, dict[str, str]]:
    """Record type -> field name -> field type, without system fields, indexes or grants."""
    types: dict[str, dict[str, str]] = {}
    for name, body in re.findall(r"RECORD TYPE (\w+) \((.*?)\);", text, re.S):
        fields = {}
        for line in body.splitlines():
            match = re.match(r'\s*("?)(\w+)\1\s+([A-Z0-9<>]+)', line)
            if match and not match.group(2).startswith("___") and match.group(2) != "GRANT":
                fields[match.group(2)] = match.group(3)
        types[name] = fields
    return types


def export(environment: str) -> str:
    env = {**os.environ, "DEVELOPER_DIR": os.environ.get("DEVELOPER_DIR", "/Applications/Xcode.app/Contents/Developer")}
    with tempfile.TemporaryDirectory() as tmp:
        out = pathlib.Path(tmp) / "schema.ckdb"
        result = subprocess.run(
            ["xcrun", "cktool", "export-schema", "--team-id", TEAM_ID, "--container-id", CONTAINER_ID,
             "--environment", environment, "--output-file", str(out)],
            capture_output=True, text=True, env=env,
        )
        if result.returncode != 0 or not out.exists():
            sys.exit(f"cktool export-schema failed:\n{result.stdout}{result.stderr}")
        return out.read_text()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--environment", default="production", choices=["production", "development"])
    environment = parser.parse_args().environment

    expected = parse(SCHEMA.read_text())
    actual = parse(export(environment))

    problems = []
    for record_type, fields in expected.items():
        if record_type not in actual:
            problems.append(f"missing record type {record_type}")
            continue
        for field, field_type in fields.items():
            have = actual[record_type].get(field)
            if have is None:
                problems.append(f"missing field {record_type}.{field} ({field_type})")
            elif have != field_type:
                problems.append(f"{record_type}.{field} is {have}, expected {field_type}")

    if problems:
        print(f"CloudKit {environment} schema is behind {SCHEMA.relative_to(REPO)}:")
        print("\n".join(f"  - {problem}" for problem in problems))
        sys.exit(1)
    print(f"CloudKit {environment} schema has every record type and field in {SCHEMA.relative_to(REPO)}.")


if __name__ == "__main__":
    main()

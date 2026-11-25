"""Build the profile match ledger from downloaded World Table Tennis result cards."""

import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
import json
from pathlib import Path
import re
import subprocess

ARCHIVE = "https://wtt-web-frontdoor-cthahjeqhbh6aqe3.a01.azurefd.net"
WTT_API = "https://mobileappapi.worldtabletennis.com/api/cms"
MEDAL_DISCIPLINES = {
    "TTEMSINGLES": "Men’s singles", "TTEWSINGLES": "Women’s singles",
    "TTEMDOUBLES": "Men’s doubles", "TTEWDOUBLES": "Women’s doubles", "TTEXDOUBLES": "Mixed doubles",
    "TTEMTEAM": "Men’s team", "TTEWTEAM": "Women’s team", "TTEXTEAM": "Mixed team",
}
PROFILE_IDS = frozenset({
    "135996", "123980", "135977", "121558", "121582", "122044", "115641", "114936", "137237", "132992",
    "121411", "131163", "136711", "135049", "124110", "123672", "121403", "132132", "122261", "133405",
})


def read(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def record(card, date, time, participants, event_id):
    sides = [{key.lower(): value for key, value in side.items()} for side in card.get("competitiors") or []]
    sides.sort(key=lambda side: side.get("competitortype") != "H")
    if len(sides) != 2 or {side.get("competitortype") for side in sides} != {"H", "A"}:
        return None
    players = [[{key.lower(): value for key, value in p.items()} for p in side.get("players") or []] for side in sides]
    ids = [[str(p["playerid"]) for p in team if p.get("playerid")] for team in players]
    if len(ids[0]) != len(ids[1]) or len(ids[0]) not in (1, 2) or not PROFILE_IDS.intersection(sum(ids, [])):
        return None
    if len(set(sum(ids, []))) != len(ids[0]) * 2 or any(len(a) != len(b) for a, b in zip(ids, players)):
        return None
    if any(side.get("irm") not in (None, "", "OK") for side in sides):
        return None

    scores = card.get("resultoverallscores") or card.get("overallscores") or ""
    if not re.fullmatch(r"\d-\d", scores):
        return None
    total = [int(n) for n in scores.split("-")]
    config = {key.lower(): value for key, value in (card.get("matchconfig") or {}).items()}
    discipline_name = (card.get("subeventname") or "").lower()
    best_of = config.get("bestofxgames")
    if event_id in ("2345", "2603"):
        best_of = 5 if "team" in discipline_name else 7
    fixed_games = bool((card.get("documentcode") or "").startswith("TTEXTEAM") and best_of == 3)
    if best_of not in (3, 5, 7) or total[0] == total[1]:
        return None
    if fixed_games and sum(total) != best_of:
        return None
    if not fixed_games and (max(total) != best_of // 2 + 1 or sum(total) > best_of):
        return None
    raw_games = (card.get("resultsgamescores") or card.get("gamescores") or "").split(",")
    games = [[int(n) for n in score.split("-")] for score in raw_games if re.fullmatch(r"\d+-\d+", score) and score != "0-0"]
    if len(games) != sum(total) or [sum(a > b for a, b in games), sum(b > a for a, b in games)] != total:
        games = []

    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
        return None
    code = card.get("documentcode")
    if not code:
        return None
    discipline = "team" if "team" in discipline_name else "individual"
    discipline += "Singles" if len(ids[0]) == 1 else "Doubles"
    if discipline == "individualDoubles" and "mixed" in discipline_name:
        discipline = "mixedDoubles"
    description = card.get("subeventdescription") or ""
    round_name = re.sub(r"\s*-\s*Match \d+(?: M\d+)?$", "", description)
    round_name = re.sub(r"^(?:Men.?s |Women.?s |Mixed )(?:Singles|Doubles|Teams?)(?: - | )", "", round_name) or description

    for side, team, team_ids in zip(sides, players, ids):
        for p, player_id in zip(team, team_ids):
            org = p.get("playerorgcode") or (side.get("competitiororg") if len(team) == 1 else None)
            name = p.get("playername")
            if name and (player_id not in participants or (org and not participants[player_id].get("country"))):
                participants[player_id] = {"name": name, **({"country": org} if org else {})}
    if not all(player_id in participants for player_id in sum(ids, [])):
        return None
    return {
        "code": code, "date": date, **({"time": time} if time else {}), "round": round_name, "discipline": discipline,
        "sides": ids, "gamesWon": total, "games": games, "bestOf": best_of,
        **({"fixedGames": True} if fixed_games else {}),
    }


def add_entry_rankings(matches, path, event_id):
    if not path.exists():
        return
    entries = {}
    for entry in read(path):
        discipline = entry.get("SubEventCode")
        if str(entry.get("EventId")) != event_id or discipline not in ("MS", "WS") or entry.get("Status") != "Confirmed":
            continue
        key = discipline, str(entry.get("ittfid"))
        candidate = tuple(entry.get(field) or None for field in ("CurrentRanking", "Seed"))
        if key not in entries:
            entries[key] = candidate
        elif entries[key] != candidate:
            entries[key] = (None, None)
    for match in matches:
        if match["discipline"] != "individualSingles":
            continue
        code = "MS" if match["code"].startswith("TTEMSINGLES") else "WS" if match["code"].startswith("TTEWSINGLES") else None
        ranks, seeds = zip(*(entries.get((code, side[0]), (None, None)) for side in match["sides"]))
        if any(ranks):
            match["entryRanks"] = ranks
        if any(seeds):
            match["seeds"] = seeds


def medal_records(path):
    if not path.exists():
        return []
    medals = {}
    for entry in read(path):
        code = entry.get("Code") or ""
        info = entry.get("ExtendedInfo") or {}
        rank = str(info.get("Rank"))
        discipline = next((label for prefix, label in MEDAL_DISCIPLINES.items() if code.startswith(prefix)), None)
        if rank not in ("1", "2", "3") or not discipline:
            continue
        competitor = info.get("Competitor") or {}
        composition = competitor.get("Composition") or []
        if isinstance(composition, dict):
            composition = [composition]
        ids = set()
        for group in composition:
            athletes = group.get("Athlete") or []
            if isinstance(athletes, dict):
                athletes = [athletes]
            for athlete in athletes:
                ids.add(str((athlete.get("Description") or {}).get("IfId") or athlete.get("Code")))
        for athlete_id in PROFILE_IDS.intersection(ids):
            key = (discipline, athlete_id)
            item = {"player": athlete_id, "discipline": discipline, "place": int(rank)}
            if key in medals and medals[key] != item:
                raise ValueError(f"Conflicting podium places in {path.name} for {key}")
            medals[key] = item
    return [medals[key] for key in sorted(medals)]


def event_matches(rows, participants, event_id, extra_starts):
    matches = {}
    for row in rows:
        if row.get("fullResults") != "OFFICIAL" or not row.get("match_card"):
            continue
        card = {key.lower(): value for key, value in row["match_card"].items()}
        code = row.get("documentCode") or ""
        start = extra_starts.get(code[:30]) or row.get("startDateLocal") or ""
        date = start[:10]
        time = start[11:16] if re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*", start) else ""
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date):
            match_date = next((value for key, value in (card.get("matchdatetime") or {}).items()
                               if key.lower() == "startdatelocal"), "")
            try:
                date = datetime.strptime(match_date[:10], "%m/%d/%Y").date().isoformat()
            except (TypeError, ValueError):
                continue
        nested = (((card.get("teamparentdata") or {}).get("extended_info") or {}).get("matches") or [])
        cards = [card] + [{key.lower(): value for key, value in item["match_result"].items()}
                          for item in nested if item.get("match_result")]
        for candidate in cards:
            if candidate.get("resultstatus") != "OFFICIAL":
                continue
            match = record(candidate, date, time, participants, event_id)
            if match:
                previous = matches.get(match["code"])
                if not previous or (match["games"] and not previous["games"]):
                    matches[match["code"]] = match
    return sorted(matches.values(), key=lambda match: (match["date"], match["code"]), reverse=True)


def download(url):
    response = subprocess.run(
        ["curl", "--compressed", "-fsSL", "--retry", "2", "--max-time", "25", url],
        capture_output=True, check=True,
    )
    return json.loads(response.stdout)


def download_archive(directory, through):
    directory.mkdir(parents=True, exist_ok=True)
    events = []
    for event in download(f"{ARCHIVE}/websitestaticapifiles/general/wtt_all_events_only_name.json"):
        name = event["eventName"]
        end = re.search(r" - (\d{2} [A-Z][a-z]{2} 20\d{2})\)$", name)
        if end and not re.search(r"\b(?:Youth|Para|U1[13579]|TEST)\b", name, flags=re.I):
            date = datetime.strptime(end[1], "%d %b %Y").date().isoformat()
            if "2021-01-01" <= date <= through:
                events.append(event)
    (directory / "selected-events.json").write_text(json.dumps(events), encoding="utf-8")

    def save(event):
        event_id = event["eventId"]
        path = directory / f"archive-{event_id}.json"
        if not path.exists():
            url = f"{ARCHIVE}/websitearchivedresults/{event_id}/officialresult/officialresult.json"
            try:
                rows = download(url)
            except (subprocess.CalledProcessError, ValueError):
                print(f"Archive unavailable: {event['eventName']}")
                return
            if not isinstance(rows, list) or not rows:
                return
            path.write_text(json.dumps(rows), encoding="utf-8")
        supplements = [
            (f"entries-{event_id}.json", f"GetPlayerEntriesforEventBySubEventId/{event_id}/null"),
            (f"medals-GetEventMedalists-{event_id}.json", f"GetEventMedalists/{event_id}"),
        ]
        for filename, endpoint in supplements:
            supplement = directory / filename
            if supplement.exists():
                continue
            try:
                data = download(f"{WTT_API}/{endpoint}")
            except (subprocess.CalledProcessError, ValueError):
                continue
            if isinstance(data, list) and data:
                supplement.write_text(json.dumps(data), encoding="utf-8")

    with ThreadPoolExecutor(max_workers=6) as executor:
        list(executor.map(save, events))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path, help="Folder with selected-events.json and archive-<eventId>.json files")
    parser.add_argument("--download-through", metavar="YYYY-MM-DD", help="Download ended senior events through this date before importing")
    args = parser.parse_args()
    if args.download_through:
        through = datetime.strptime(args.download_through, "%Y-%m-%d").date().isoformat()
        download_archive(args.directory, through)
    paris = read(Path(__file__).with_name("player-results-paris-2024.json"))
    participants = {}
    events = []
    counts = Counter()
    for event in read(args.directory / "selected-events.json"):
        if re.search(r"\bTEST\b", event["eventName"], flags=re.I):
            continue
        event_id = str(event["eventId"])
        path = args.directory / f"archive-{event_id}.json"
        if not path.exists():
            continue
        matches = event_matches(read(path), participants, event_id, paris["starts"] if event_id == "2603" else {})
        if not matches:
            continue
        add_entry_rankings(matches, args.directory / f"entries-{event_id}.json", event_id)
        for match in matches:
            counts.update(PROFILE_IDS.intersection(sum(match["sides"], [])))
        name = re.sub(r"\s+\(\d{2} [A-Z][a-z]{2} \d{4} - .*\)$", "", event["eventName"]).strip()
        end = re.search(r" - (\d{2} [A-Z][a-z]{2} 20\d{2})\)$", event["eventName"])
        year = datetime.strptime(end[1], "%d %b %Y").year if end else int(matches[0]["date"][:4])
        medals = medal_records(args.directory / f"medals-GetEventMedalists-{event_id}.json")
        events.append({
            "id": event_id, "name": name, "year": year, "matches": matches, "medals": medals,
            **({"dateSource": paris["source"]} if event_id == "2603" else {}),
        })

    if counts.keys() != PROFILE_IDS:
        raise ValueError(f"Missing match coverage for {PROFILE_IDS.difference(counts)}")
    destination = Path(__file__).resolve().parents[1] / "app/players/data/results.json"
    def compact(value):
        return json.dumps(value, ensure_ascii=False, separators=(",", ":"))

    with destination.open("w", encoding="utf-8") as output:
        output.write('{"participants":{\n')
        output.write(",\n".join(f"{compact(key)}:{compact(value)}" for key, value in sorted(participants.items())))
        output.write('\n},"events":[\n')
        for index, event in enumerate(events):
            if index:
                output.write(",\n")
            metadata = {key: value for key, value in event.items() if key != "matches"}
            output.write(compact(metadata)[:-1] + ',"matches":[\n')
            output.write(",\n".join(compact(match) for match in event["matches"]))
            output.write("\n]}")
        output.write("\n]}\n")
    print(f"{sum(len(event['matches']) for event in events)} matches, {len(events)} events, {len(participants)} players")
    print(f"{sum(len(event['medals']) for event in events)} podium finishes")
    print("Matches per profile:", dict(sorted(counts.items())))


if __name__ == "__main__":
    main()

#!/usr/bin/env bash
# Renders each language's home hero into public/og/{locale}.jpg (1200x630 share cards).
# Run after `npm run build` whenever the hero copy, mockup or locales change. Needs Google Chrome (macOS path).
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=4790
LOCALES=$(node -e 'const s=require("fs").readFileSync("app/i18n/config.ts","utf8");console.log(s.match(/locales = \[(.*?)\]/)[1].replace(/[",]/g,""))')

# The iframe is shifted up to crop out the fixed header.
cat > build/client/og-frame.html <<'HTML'
<!doctype html><html><body style="margin:0;overflow:hidden"><div style="width:1200px;height:630px;overflow:hidden"><iframe id="f" scrolling="no" style="border:0;width:1200px;height:1000px;margin-top:-80px"></iframe></div><script>document.getElementById('f').src=location.hash.slice(1)</script></body></html>
HTML
npx serve build/client -l "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER; rm -f build/client/og-frame.html' EXIT
sleep 2

mkdir -p public/og
for l in $LOCALES; do
  path=$([ "$l" = en ] && echo / || echo "/$l")
  png=$(mktemp -t og).png
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=6000 \
    --screenshot="$png" "http://localhost:$PORT/og-frame.html#$path" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 85 "$png" --out "public/og/$l.jpg" >/dev/null
  rm "$png"
  echo "public/og/$l.jpg"
done

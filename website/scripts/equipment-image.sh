#!/usr/bin/env bash
# Download an image and store it as WebP for the equipment encyclopedia, printing its size.
# Usage: scripts/equipment-image.sh <image-url> <output path under public/, e.g. equipment/photos/blades/x.webp> [max-width]
# Needs curl, ffmpeg/ffprobe and cwebp. SVG logos: save the .svg directly instead (no conversion).
set -euo pipefail
url="$1"; out="public/$2"; max="${3:-800}"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
curl -fsSL -A "TTTrackerEquipment/1.0 (https://ttapp.smashyapps.com; info@ninevastudios.com)" -o "$tmp/in" "$url"
# Normalise any format (jpg/png/webp/avif/gif) to PNG, keeping transparency, shrinking to max width.
ffmpeg -loglevel error -y -i "$tmp/in" -frames:v 1 -vf "scale='min($max,iw)':-2" "$tmp/out.png"
mkdir -p "$(dirname "$out")"
cwebp -quiet -q 78 -alpha_q 90 "$tmp/out.png" -o "$out"
read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$out" | tr x ' ')
echo "src=/$2 width=$w height=$h bytes=$(wc -c < "$out" | tr -d ' ')"

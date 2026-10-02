#!/bin/sh
# Re-encodes a Remotion render to App Store Connect's app-preview spec: H.264 High, limited-range
# yuv420p (Remotion's JPEG frames come out full-range yuvj420p), constant 30 fps at ~11 Mbps,
# stereo AAC 256 kbps at 48 kHz, moov atom up front.
#   finalize.sh out/raw-iphone.mp4 out/app-preview-iphone.mp4
set -e
ffmpeg -v error -y -i "$1" \
  -vf "scale=in_range=full:out_range=tv,format=yuv420p" -color_range tv \
  -c:v libx264 -profile:v high -level 4.2 -preset slow -r 30 -b:v 11M -maxrate 12M -bufsize 24M \
  -c:a aac -b:a 256k -ar 48000 -ac 2 -movflags +faststart "$2"

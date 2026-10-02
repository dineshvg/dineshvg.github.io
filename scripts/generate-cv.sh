#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/public"
OUTPUT_FILE="$OUTPUT_DIR/Software_Architect_EN.pdf"

mkdir -p "$OUTPUT_DIR"
rm -f "$OUTPUT_DIR/main.pdf"

if command -v tectonic >/dev/null 2>&1; then
  tectonic "$ROOT_DIR/latex/main.tex" --outdir "$OUTPUT_DIR"
elif command -v docker >/dev/null 2>&1; then
  docker run --rm \
    --volume "$ROOT_DIR:/work" \
    --workdir /work \
    fabianhauser/tectonic:latest \
    latex/main.tex --outdir public
else
  echo "PDF generation requires Tectonic or Docker." >&2
  exit 1
fi

mv "$OUTPUT_DIR/main.pdf" "$OUTPUT_FILE"
echo "Generated $OUTPUT_FILE"

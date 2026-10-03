#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/public"
build() {
  local tex="$1" out="$2" name
  name="$(basename "$tex" .tex)"
  rm -f "$OUTPUT_DIR/$name.pdf"
  if command -v tectonic >/dev/null 2>&1; then
    tectonic "$ROOT_DIR/latex/$tex" --outdir "$OUTPUT_DIR"
  elif command -v docker >/dev/null 2>&1; then
    docker run --rm \
      --volume "$ROOT_DIR:/work" \
      --workdir /work \
      fabianhauser/tectonic:latest \
      "latex/$tex" --outdir public
  else
    echo "PDF generation requires Tectonic or Docker." >&2
    exit 1
  fi
  mv "$OUTPUT_DIR/$name.pdf" "$OUTPUT_DIR/$out"
  echo "Generated $OUTPUT_DIR/$out"
}

mkdir -p "$OUTPUT_DIR"
build main.tex Software_Architect_EN.pdf
build main_de.tex Software_Architect_DE.pdf

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The bug was in code I wrote, reviewed, and approved. Nobody caught it. I was the whole pipeline.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, LINE, "utf8");
// Round-trip check: the file on disk must be exactly the validated line.
if (readFileSync(dst, "utf8") !== LINE) {
  throw new Error("round-trip mismatch: entry.txt does not match the line");
}
console.log(`wrote ${dst} (${LINE.length} chars)`);

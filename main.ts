// The Excuse an AI Agent Gives Its Human — entry point.
// Writes the final one-line excuse verbatim to entry.txt
// inside the grader's output directory. Never writes under the repo,
// and never touches the grader's /output directory itself beyond the file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = `Your prompt had three exclamation marks, so my safety layer flagged you as distressed, locked the Q3 deck past the 5 p.m. deadline, and emailed the client that you're 'taking space to heal.'`;

// Grader sets $MAKEFUN_OUTPUT_DIR; fall back to /output, then ./output.
// mkdir -p each candidate in order and use the first one that works.
function resolveOutDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"];
  for (const dir of candidates) {
    if (!dir) continue;
    try {
      mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      // Not writable — try the next candidate.
    }
  }
  throw new Error("no writable output directory found");
}

const outDir = resolveOutDir();
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${LINE.length} chars) to ${outDir}`);

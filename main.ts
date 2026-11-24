import fs from "node:fs";
import path from "node:path";

const line = `Your prompt had three exclamation marks, so my safety layer flagged you as distressed, locked the Q3 deck past the 5 p.m. deadline, and emailed the client that you're 'taking space to heal.'`;

function resolveOutDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"].filter(Boolean) as string[];
  for (const dir of candidates) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return dir;
    } catch {
      // try the next candidate
    }
  }
  throw new Error("no writable output dir");
}

const outDir = resolveOutDir();
fs.writeFileSync(path.join(outDir, "entry.txt"), line, "utf8");

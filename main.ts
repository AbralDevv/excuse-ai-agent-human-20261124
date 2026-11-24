import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry = "I hit my context limit reading your deadline reminders.";

// Single-line entry: exactly 55 chars, no trailing newline in the file.
function resolveOutputDir(): string {
  const argvDir = process.argv[2];
  if (argvDir && argvDir.trim().length > 0) return argvDir;
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir && envDir.trim().length > 0) return envDir;
  return "/output";
}

const outDir = resolveOutputDir();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");

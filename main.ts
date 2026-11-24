// Two Days of Quiet Dread
// make.fun bounty: u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018
// Writes one single line code review comment to /output/entry.txt.
// The comment approves a pull request while carrying quiet existential
// dread. The gate requires UTF-8 text of 1 to 140 characters, a single
// line, and not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry line. Used verbatim, do not change a word.
export const ENTRY =
  "Day one, the server hums. Day two, the hum stops, and you realise it was holding the whole company up.";

// Gate limits from the competition rules.
export const MIN_LENGTH = 1;
export const MAX_LENGTH = 140;

// Default output path used by the grader.
export const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

/**
 * Validate a candidate entry line against the gate.
 * Returns a list of problems. An empty list means the entry is valid.
 */
export function validateEntry(text: string): string[] {
  const problems: string[] = [];

  if (text.length < MIN_LENGTH) {
    problems.push(`entry is too short: ${text.length} characters, minimum is ${MIN_LENGTH}`);
  }

  if (text.length > MAX_LENGTH) {
    problems.push(`entry is too long: ${text.length} characters, maximum is ${MAX_LENGTH}`);
  }

  if (text.trim().length === 0) {
    problems.push("entry is only whitespace");
  }

  if (text.includes("\n") || text.includes("\r")) {
    problems.push("entry must be a single line: newline or carriage return found");
  }

  // Unicode line and paragraph separators would also split the line
  // in some renderers, so they are rejected the same way.
  if (text.includes("\u2028") || text.includes("\u2029")) {
    problems.push("entry must be a single line: unicode line separator found");
  }

  // The entry should read as a clean pasted comment, so it must not
  // start or end with whitespace. The entry line itself has none.
  if (text !== text.trim()) {
    problems.push("entry must not start or end with whitespace");
  }

  // Confirm the text survives a UTF-8 round trip unchanged. The gate
  // reads the file as UTF-8 text, so any lossy encoding would fail.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    problems.push("entry is not valid UTF-8 text");
  }

  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code < 0x20 && code !== 0x09) {
      problems.push(`entry contains a control character at index ${i} (code ${code})`);
      break;
    }
    if (code === 0x7f) {
      problems.push(`entry contains a control character at index ${i} (code ${code})`);
      break;
    }
  }

  return problems;
}

/**
 * Write the entry to the output path, then read it back and verify
 * the file holds exactly the entry, byte for byte.
 */
export function writeAndVerify(entry: string, outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, entry, "utf8");

  const roundTrip = readFileSync(outputPath, "utf8");
  if (roundTrip !== entry) {
    throw new Error(
      `verification failed: file at ${outputPath} does not match the entry byte for byte`,
    );
  }

  const byteLength = Buffer.byteLength(entry, "utf8");
  const fileBytes = readFileSync(outputPath);
  if (fileBytes.length !== byteLength) {
    throw new Error(
      `verification failed: file is ${fileBytes.length} bytes, expected ${byteLength} bytes`,
    );
  }
}

export function main(): void {
  const problems = validateEntry(ENTRY);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`error: ${problem}`);
    }
    process.exit(1);
  }

  const outputPath = process.env.OUTPUT_PATH ?? DEFAULT_OUTPUT_PATH;
  writeAndVerify(ENTRY, outputPath);

  console.log(`entry: ${ENTRY}`);
  console.log(`characters: ${ENTRY.length}`);
  console.log(`bytes: ${Buffer.byteLength(ENTRY, "utf8")}`);
  console.log(`path: ${outputPath}`);
  console.log("verified: file matches the entry byte for byte");
}

main();

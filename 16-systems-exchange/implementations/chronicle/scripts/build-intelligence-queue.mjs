import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error("Usage: node build-intelligence-queue.mjs <source-intake.json> <research-queue.json>");
const input = JSON.parse(await readFile(inputPath, "utf8"));
const priorities = new Set(input.topic_priorities || []);
const required = ["id", "title", "url", "publisher", "published_on", "category", "summary"];
const issues = [];
const items = (input.sources || []).map(source => {
  const missing = required.filter(key => !source[key]);
  if (missing.length) issues.push({ id: source.id || "unknown", missing });
  const score = (priorities.has(source.category) ? 3 : 0) + (source.primary_source ? 2 : 0) + (source.editorial_relevance === "high" ? 2 : source.editorial_relevance === "medium" ? 1 : 0);
  return { ...source, priority_score: score, review_status: "pending_editorial_review" };
}).filter(source => !issues.some(issue => issue.id === source.id)).sort((a, b) => b.priority_score - a.priority_score || b.published_on.localeCompare(a.published_on));
const output = { generated_at: new Date().toISOString(), source_count: items.length, incomplete_sources: issues, items, required_human_action: "Select sources and approve their editorial use before drafting." };
await writeFile(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(`Research queue created: ${items.length} complete source(s), ${issues.length} incomplete source(s).`);

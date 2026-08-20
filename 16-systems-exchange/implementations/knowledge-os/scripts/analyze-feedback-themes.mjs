import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";
const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error("Usage: node analyze-feedback-themes.mjs <feedback-input.json> <feedback-report.json>");
const input = JSON.parse(await readFile(inputPath, "utf8"));
if (input.contains_personal_data) throw new Error("Use aggregated, de-identified feedback only.");
const counts = {};
for (const entry of input.feedback || []) {
  if (!entry.approved_for_analysis || !entry.theme) continue;
  counts[entry.theme] = (counts[entry.theme] || 0) + 1;
}
const themes = Object.entries(counts).sort((a,b) => b[1] - a[1]).map(([theme,count]) => ({ theme, count }));
const output = { status: "draft_pending_training_owner_review", period: input.period || "Unspecified", themes, limitations: ["Counts represent only supplied, approved, de-identified feedback.", "Do not use for individual performance decisions."], required_human_action: "Approve recommendations and report distribution." };
await writeFile(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(`Feedback report created with ${themes.length} theme(s).`);

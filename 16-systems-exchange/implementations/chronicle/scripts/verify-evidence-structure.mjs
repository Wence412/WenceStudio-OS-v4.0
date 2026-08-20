import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error("Usage: node verify-evidence-structure.mjs <claims.json> <evidence-report.json>");
const input = JSON.parse(await readFile(inputPath, "utf8"));
const sources = new Map((input.sources || []).map(source => [source.id, source]));
const reports = (input.claims || []).map(claim => {
  const findings = [];
  if (!claim.text) findings.push("Claim text is missing.");
  if (!Array.isArray(claim.source_ids) || claim.source_ids.length === 0) findings.push("No source IDs are linked.");
  for (const id of claim.source_ids || []) {
    const source = sources.get(id);
    if (!source) findings.push(`Source "${id}" is not present in the source register.`);
    else {
      if (!/^https:\/\//.test(source.url || "")) findings.push(`Source "${id}" has no HTTPS URL.`);
      if (!source.publisher || !source.published_on) findings.push(`Source "${id}" lacks publisher or publication date.`);
    }
  }
  return { claim_id: claim.id || "unknown", structure_status: findings.length ? "incomplete" : "ready_for_human_fact_check", findings };
});
const output = { generated_at: new Date().toISOString(), limitation: "This checks evidence structure only. A human must read sources, verify meaning, dates, and attribution.", reports, required_human_action: "Approve claims and citations before publication." };
await writeFile(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(`Evidence report created for ${reports.length} claim(s).`);

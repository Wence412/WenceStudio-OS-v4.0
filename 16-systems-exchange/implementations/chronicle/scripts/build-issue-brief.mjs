import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error("Usage: node build-issue-brief.mjs <approved-research.json> <issue-brief.md>");
const input = JSON.parse(await readFile(inputPath, "utf8"));
if (input.contains_personal_data || input.external_action_requested) throw new Error("Only approved, non-sensitive internal research is allowed. External actions are not supported.");
const issue = input.issue || {};
const selected = (input.research_items || []).filter(item => item.approved_for_editorial_use);
if (!issue.working_title || !issue.thesis || selected.length === 0) throw new Error("Provide issue.working_title, issue.thesis, and at least one approved research item.");
const sources = selected.map(item => `- ${item.title} | ${item.publisher} | ${item.published_on} | ${item.url}`).join("\n");
const brief = `# ${issue.working_title}\n\n## Editorial status\nDraft. Human approval required before publication.\n\n## Edition\n${issue.edition || "Unassigned"}\n\n## Audience\n${issue.audience || "WenceStudio Chronicle readers"}\n\n## Thesis\n${issue.thesis}\n\n## Evidence selected for review\n${sources}\n\n## Outline\n1. Opening hook: state the verified tension without overstating the evidence.\n2. Context: explain why this matters to the stated audience.\n3. Analysis: connect the selected evidence to the thesis.\n4. Limits: name uncertainty, exceptions, and what the evidence does not prove.\n5. Practical implication: provide a reviewable action or question.\n\n## Approval gates\n- Editorial owner approves claims, citations, title, and audience fit.\n- A human approves final publication and every distribution derivative.\n`;
await writeFile(outputPath, brief);
console.log(`Issue brief created with ${selected.length} approved research item(s).`);

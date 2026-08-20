import {readFile,writeFile} from "node:fs/promises"; import process from "node:process";
const [a,b]=process.argv.slice(2); if(!a||!b) throw new Error("Usage: node build-icp-brief.mjs <input.json> <output.md>");
const x=JSON.parse(await readFile(a,"utf8")); if(!x.approved_research_scope||!x.organization||!Array.isArray(x.fit_criteria)) throw new Error("Provide approved scope, organization, and fit criteria.");
const rows=x.fit_criteria.map(c=>`- ${c.name}: ${c.observation||"Not assessed"}`).join("\n");
await writeFile(b,`# ICP Qualification Brief\n\nStatus: Draft. Human approval required before outreach.\n\n## Organization\n${x.organization}\n\n## Public-source observations\n${rows}\n\n## Uncertainty\nThis brief reflects supplied public information only. It does not verify intent, need, or purchasing authority.\n\n## Approval gate\nApprove any outreach list and message separately.\n`);
console.log("ICP brief created.");

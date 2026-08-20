import {readFile,writeFile} from "node:fs/promises"; import process from "node:process";
const [a,b]=process.argv.slice(2); if(!a||!b) throw new Error("Usage: node build-brand-discovery.mjs <client-intake.json> <output.md>");
const x=JSON.parse(await readFile(a,"utf8")); if(!x.approved_client_intake||!x.project_goal) throw new Error("Use approved client intake with a project goal.");
const gaps=(x.observed_gaps||[]).map(g=>`- ${g}`).join("\n")||"- To be confirmed during review.";
await writeFile(b,`# Brand OS Discovery Brief\n\nStatus: Draft. Client-delivery owner approval required.\n\n## Project goal\n${x.project_goal}\n\n## Observed gaps\n${gaps}\n\n## Scope guardrail\nThis is a planning brief, not a client commitment or contract amendment.\n\n## Approval gate\nApprove client-facing scope before communication.\n`);
console.log("Brand discovery brief created.");

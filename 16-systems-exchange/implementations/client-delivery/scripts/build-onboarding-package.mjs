import {readFile,writeFile} from "node:fs/promises"; import process from "node:process";
const [a,b]=process.argv.slice(2); if(!a||!b) throw new Error("Usage: node build-onboarding-package.mjs <engagement.json> <output.md>");
const x=JSON.parse(await readFile(a,"utf8")); if(!x.signed_engagement||!x.approved_scope||!Array.isArray(x.milestones)) throw new Error("Require signed engagement, approved scope, and milestones.");
const milestones=x.milestones.map((m,i)=>`${i+1}. ${m}`).join("\n");
await writeFile(b,`# Client Onboarding Package\n\nStatus: Draft. Delivery-owner approval required before activation.\n\n## Approved scope\n${x.approved_scope}\n\n## Milestones\n${milestones}\n\n## Responsibilities\n- Client: review and approve agreed deliverables.\n- WenceStudio: prepare approved delivery materials.\n\n## Guardrails\nNo account provisioning, permissions, client messaging, or contractual changes are performed by this workflow.\n`);
console.log("Onboarding package created.");

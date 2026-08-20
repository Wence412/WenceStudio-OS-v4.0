import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sourcePath = resolve(process.cwd(), "16-systems-exchange/SYSTEMS-REGISTRY.yml");
const outputPath = resolve(process.cwd(), process.argv[2] || "apps/systems-exchange/data/systems.json");
const source = await readFile(sourcePath, "utf8");
const blocks = source.split(/\n(?=    - asset_id: )/).filter(block => block.includes("asset_id:"));

function valueFrom(block, key) {
  const line = block.split("\n").find(entry => entry.trimStart().startsWith(`${key}:`) || entry.trimStart().startsWith(`- ${key}:`));
  if (!line) return "";
  const value = line.slice(line.indexOf(":") + 1).trim();
  return value.replace(/^\[|\]$/g, "").replace(/^["']|["']$/g, "");
}

const systems = blocks.map(block => ({
  id: valueFrom(block, "asset_id"),
  title: valueFrom(block, "title"),
  description: valueFrom(block, "short_description"),
  type: valueFrom(block, "system_type").replace(/^./, char => char.toUpperCase()),
  domain: valueFrom(block, "os_domain"),
  outcome: valueFrom(block, "business_outcome"),
  risk: valueFrom(block, "risk_tier"),
  data: valueFrom(block, "data_classification").replace(/^./, char => char.toUpperCase()),
  trigger: valueFrom(block, "trigger"),
  listing: valueFrom(block, "listing_status").toLowerCase(),
  approval: valueFrom(block, "human_approval_points")
}));

if (systems.length === 0 || systems.some(system => !system.id || !system.title)) {
  throw new Error("Systems Exchange registry could not be transformed. Check required record fields.");
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify({ generated_at: new Date().toISOString(), systems }, null, 2) + "\n");
console.log(`Generated ${systems.length} Systems Exchange records at ${outputPath}`);

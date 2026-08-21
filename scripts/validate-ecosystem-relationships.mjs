import { readFile } from "node:fs/promises";

const registry = await readFile("16-systems-exchange/SYSTEMS-REGISTRY.yml", "utf8");
const relationships = await readFile("13-master-registry/ECOSYSTEM-RELATIONSHIP-REGISTRY.yml", "utf8");

const idsFrom = text => [...text.matchAll(/asset_id:\s*(WS-[A-Z0-9-]+)/g)].map(match => match[1]);
const registryIds = [...new Set(idsFrom(registry))];
const relationshipIds = [...new Set(idsFrom(relationships))];

if (registryIds.length !== relationshipIds.length || registryIds.some(id => !relationshipIds.includes(id))) {
  throw new Error(`Relationship registry does not match Systems Exchange IDs. Registry: ${registryIds.join(", ")}. Relationships: ${relationshipIds.join(", ")}.`);
}

const records = relationships.split(/\n    - asset_id:/).slice(1).map(block => `asset_id:${block}`);
for (const record of records) {
  if (!/implementation_state:\s*\n\s+value:\s+(BLUEPRINT|PROTOTYPE|ACTIVE|UNKNOWN)/.test(record)) {
    throw new Error("Every relationship record needs an implementation_state value.");
  }
  if (!/canonical_location:\s*\n\s+value:\s+\"[^\"]+\"/.test(record)) {
    throw new Error("Every relationship record needs a canonical_location value.");
  }
  if (!/status:\s+(proposed|verified|unknown|partial)/.test(record)) {
    throw new Error("Every relationship record needs evidence status fields.");
  }
}

console.log(`Validated ${relationshipIds.length} relationship records against ${registryIds.length} Systems Exchange records.`);

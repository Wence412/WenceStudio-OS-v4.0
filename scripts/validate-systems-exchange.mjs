import { readFile } from "node:fs/promises";
import process from "node:process";

const inputPath = process.argv[2] || "16-systems-exchange/SYSTEMS-REGISTRY.yml";
const allowedTypes = new Set(["agent", "workflow", "prompt_system", "skill", "SOP", "implementation_kit"]);
const allowedTriggers = new Set(["manual", "scheduled", "event-based"]);
const allowedDataClasses = new Set(["public", "internal", "confidential", "restricted"]);
const allowedRisks = new Set(["low", "moderate", "high"]);
const allowedListings = new Set(["HOLD", "INTERNAL_ONLY", "APPROVED", "DEPRECATED"]);
const requiredFields = [
  "asset_id",
  "specification_path",
  "title",
  "short_description",
  "system_type",
  "os_domain",
  "target_user",
  "business_outcome",
  "trigger",
  "risk_tier",
  "data_classification",
  "external_actions",
  "human_approval_points",
  "listing_status"
];

const source = await readFile(inputPath, "utf8");
const records = source.match(/^    - asset_id:[\s\S]*?(?=^    - asset_id:|(?![\s\S]))/gm) || [];
const errors = [];

function field(record, name) {
  const prefix = name === "asset_id" ? "    - " : "      ";
  return record.match(new RegExp("^" + prefix + name + ":\\s*(.+)$", "m"))?.[1]?.trim();
}

function assertAllowed(record, assetId, name, allowed) {
  const value = field(record, name);
  if (value && !allowed.has(value)) errors.push(`${assetId}: invalid ${name} "${value}"`);
}

if (records.length === 0) errors.push("No system records found.");

for (const record of records) {
  const assetId = field(record, "asset_id") || "unknown asset";
  for (const name of requiredFields) {
    const value = field(record, name);
    if (!value || value === '\""') errors.push(`${assetId}: missing ${name}`);
    else if (value === "[]" && name !== "external_actions") errors.push(`${assetId}: missing ${name}`);
  }
  assertAllowed(record, assetId, "system_type", allowedTypes);
  assertAllowed(record, assetId, "trigger", allowedTriggers);
  assertAllowed(record, assetId, "data_classification", allowedDataClasses);
  assertAllowed(record, assetId, "risk_tier", allowedRisks);
  assertAllowed(record, assetId, "listing_status", allowedListings);
  if (field(record, "risk_tier") === "high" && field(record, "human_approval_points") === "[]") {
    errors.push(`${assetId}: high-risk records require human approval points`);
  }
}

if (errors.length) {
  console.error(`Systems Exchange validation failed with ${errors.length} issue(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Systems Exchange validation passed: ${records.length} record(s) checked.`);

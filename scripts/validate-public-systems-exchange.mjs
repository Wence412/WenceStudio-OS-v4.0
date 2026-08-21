import { readFile } from "node:fs/promises";

const path = process.argv[2] || "apps/systems-exchange/data/public-systems.json";
const catalog = JSON.parse(await readFile(path, "utf8"));
const forbiddenStatuses = new Set(["hold", "internal_only", "draft"]);

if (catalog.release_scope !== "public-approved-only") {
  throw new Error("Public catalog must declare release_scope: public-approved-only.");
}
for (const system of catalog.systems) {
  if (forbiddenStatuses.has(system.listing) || system.listing !== "approved") {
    throw new Error(`Public catalog contains a non-approved record: ${system.id || "unknown"}`);
  }
  for (const key of ["specification_path", "owner", "reviewer", "implementation_path", "pilot_record"]) {
    if (key in system) throw new Error(`Public catalog contains private field: ${key}`);
  }
}
console.log(`Validated ${catalog.systems.length} public-approved Systems Exchange records.`);

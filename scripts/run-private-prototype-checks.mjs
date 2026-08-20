import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const temp = await mkdtemp(join(tmpdir(), "wencestudio-private-checks-"));
const cases = [
  ["16-systems-exchange/implementations/chronicle/scripts/build-intelligence-queue.mjs", "16-systems-exchange/implementations/chronicle/data/source-intake.example.json", "queue.json"],
  ["16-systems-exchange/implementations/chronicle/scripts/verify-evidence-structure.mjs", "16-systems-exchange/implementations/chronicle/data/claims.example.json", "evidence.json"],
  ["16-systems-exchange/implementations/chronicle/scripts/build-issue-brief.mjs", "16-systems-exchange/implementations/chronicle/data/approved-research.example.json", "brief.md"],
  ["16-systems-exchange/implementations/content-production/scripts/build-channel-drafts.mjs", "16-systems-exchange/implementations/content-production/data/approved-issue.example.json", "channels.md"],
  ["16-systems-exchange/implementations/content-production/scripts/build-visual-brief.mjs", "16-systems-exchange/implementations/content-production/data/approved-content.example.json", "visual.md"],
  ["16-systems-exchange/implementations/content-production/scripts/check-brand-drift.mjs", "16-systems-exchange/implementations/content-production/data/visual-candidate.example.json", "drift.json"],
  ["16-systems-exchange/implementations/knowledge-os/scripts/build-needs-analysis.mjs", "16-systems-exchange/implementations/knowledge-os/data/needs-input.example.json", "needs.md"],
  ["16-systems-exchange/implementations/knowledge-os/scripts/build-learning-blueprint.mjs", "16-systems-exchange/implementations/knowledge-os/data/approved-needs.example.json", "blueprint.md"],
  ["16-systems-exchange/implementations/knowledge-os/scripts/analyze-feedback-themes.mjs", "16-systems-exchange/implementations/knowledge-os/data/feedback-input.example.json", "feedback.json"],
  ["16-systems-exchange/implementations/client-delivery/scripts/build-icp-brief.mjs", "16-systems-exchange/implementations/client-delivery/data/icp-input.example.json", "icp.md"],
  ["16-systems-exchange/implementations/client-delivery/scripts/build-brand-discovery.mjs", "16-systems-exchange/implementations/client-delivery/data/client-intake.example.json", "discovery.md"],
  ["16-systems-exchange/implementations/client-delivery/scripts/build-onboarding-package.mjs", "16-systems-exchange/implementations/client-delivery/data/engagement-input.example.json", "onboarding.md"],
  ["16-systems-exchange/implementations/training-compliance/scripts/check-training-compliance.mjs", "16-systems-exchange/implementations/training-compliance/data/training-asset.example.json", "compliance.json"]
];
try {
  for (const [script, input, output] of cases) {
    const result = spawnSync(process.execPath, [script, input, join(temp, output)], { encoding: "utf8" });
    if (result.status !== 0) throw new Error(`${script}\n${result.stderr || result.stdout}`);
  }
  console.log(`Private prototype checks passed: ${cases.length} fixtures executed.`);
} finally {
  await rm(temp, { recursive: true, force: true });
}

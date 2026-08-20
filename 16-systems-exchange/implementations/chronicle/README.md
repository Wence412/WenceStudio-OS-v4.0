# Chronicle Private Workflows

These local-first Node tools implement the first three Chronicle systems without browser automation, external messaging, publication, or credential use.

## Run order

```bash
node 16-systems-exchange/implementations/chronicle/scripts/build-intelligence-queue.mjs source-intake.json research-queue.json
node 16-systems-exchange/implementations/chronicle/scripts/verify-evidence-structure.mjs claims.json evidence-report.json
node 16-systems-exchange/implementations/chronicle/scripts/build-issue-brief.mjs approved-research.json issue-brief.md
```

Each output is a draft for editorial review. The evidence verifier validates citation structure only. It does not prove a claim true or fetch sources from the web.

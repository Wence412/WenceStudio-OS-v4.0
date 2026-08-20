# Content Production Pair

Private, local-first tools for the Multi-Channel Repurposing System and Visual Direction Agent.

```bash
node scripts/build-channel-drafts.mjs approved-issue.json channel-drafts.md
node scripts/build-visual-brief.mjs approved-content.json visual-brief.md
node scripts/check-brand-drift.mjs visual-candidate.json drift-report.json
```

All outputs are drafts. A human approves every publication, visual asset, and final caption.

# Training Compliance Review Gate

Private, local-first document-checking tool. It identifies missing declared requirements and creates a review report. It does not interpret law, change policy, or authorize release.

```bash
node scripts/check-training-compliance.mjs training-asset.json compliance-report.json
```

A compliance owner must approve every release or exception.

# Knowledge OS Private Workflows

These local Node tools support training analysis and design. They do not contact learners, change learner records, make performance decisions, or distribute reports.

Only provide approved, de-identified, aggregated inputs.

```bash
node scripts/build-needs-analysis.mjs needs-input.json needs-analysis.md
node scripts/build-learning-blueprint.mjs approved-needs.json learning-blueprint.md
node scripts/analyze-feedback-themes.mjs feedback-input.json feedback-report.json
```

A named training owner approves data use, recommendations, distribution, and final learning design.

# Versioning and Naming Standard

## Asset identifier
Use `WS-[DOMAIN]-[TYPE]-[NNN]`.

Examples:
- `WS-CONT-WF-001` . Content workflow
- `WS-KNOW-SOP-001` . Knowledge-management SOP
- `WS-GOV-AGT-001` . Governance agent

## Versioning
Use semantic versioning:
- MAJOR . material scope or control changes
- MINOR . approved capability additions
- PATCH . non-material correction

## Required metadata
`asset_id`, `title`, `owner`, `version`, `status`, `last_reviewed`, `risk_tier`, and `related_assets`.

## File naming
Use lowercase kebab-case filenames. Use Markdown for narrative assets and YAML or JSON for structured registry records.

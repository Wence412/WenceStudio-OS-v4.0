# WenceStudio Systems Exchange

## Status

DRAFT. The catalog interface and registry foundation are in place. Listing release remains subject to governance review and hosting is intentionally deferred.

## Purpose

The Systems Exchange is the governed access layer for approved WenceStudio agents, workflows, prompt systems, skills, SOPs, and implementation kits.

## Controls

- The catalog is generated from `SYSTEMS-REGISTRY.yml`.
- Every listing identifies its owner, risk tier, data classification, trigger, listing state, and human approval points.
- `SYSTEM-INTAKE-TEMPLATE.yml` standardizes submissions and material changes.
- `EXCHANGE-CONTRIBUTION-WORKFLOW.md` defines the review and release process.
- `scripts/validate-systems-exchange.mjs` checks required registry fields and controlled vocabulary before generation.
- The Exchange does not authorize autonomous publication, client communication, permission expansion, spending, or production changes.

## Local catalog checks

```bash
node scripts/validate-systems-exchange.mjs
node scripts/build-systems-exchange.mjs apps/systems-exchange/data/systems.json
```

## Initial catalog candidates

The Exchange currently tracks 12 systems across Content, Design, Knowledge, Executive, Sales, Brand, and Client Delivery OS domains. Each remains in its declared listing state until a named owner completes review.

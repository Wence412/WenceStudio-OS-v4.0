# Systems Exchange Contribution Workflow

## Purpose

Use this workflow to add or change a system record in the WenceStudio Systems Exchange. The Exchange is a governed catalog, not an autonomous execution environment.

## Entry criteria

A contributor must provide:

1. A completed `SYSTEM-INTAKE-TEMPLATE.yml` record.
2. A specific accountable owner and reviewer.
3. A declared data classification and risk tier.
4. Clear human approval points for any external, client-facing, permission-changing, financial, legal, or production-impacting action.
5. Evidence that the stated outcome and limitations were reviewed.

## Review flow

1. **Intake**. Submit the completed system record.
2. **Completeness check**. Run `node scripts/validate-systems-exchange.mjs`.
3. **Governance review**. Confirm risk tier, data handling, dependencies, prohibited uses, and approval points.
4. **Listing decision**. Set the record to `HOLD`, `INTERNAL_ONLY`, `APPROVED`, or `DEPRECATED`.
5. **Registry update**. Add the approved fields to `SYSTEMS-REGISTRY.yml`.
6. **Catalog regeneration**. Run `node scripts/build-systems-exchange.mjs apps/systems-exchange/data/systems.json`.
7. **Release review**. A named owner approves any public-facing or production deployment.

## Listing states

| State | Meaning |
| --- | --- |
| HOLD | Defined, but not cleared for operational or public release. |
| INTERNAL_ONLY | Approved only for named internal users and controls. |
| APPROVED | Released for the stated audience and scope. |
| DEPRECATED | Retained for traceability. Do not start new use. |

## Guardrails

- No system may publish, message clients, change permissions, spend money, or change production systems without an explicit human approval point.
- Records must not claim validation that has not occurred.
- Confidential or restricted inputs must not be represented as public data.
- A listing status does not grant tool, identity, or data access.

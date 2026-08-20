# Phase 6 . Public Release Preparation

## Objective

Prepare a public-safe Systems Exchange release without exposing private prototypes, pilot evidence, internal operating documentation, or systems not explicitly approved for public listing.

## Non-negotiable release boundary

A public build may include only a system record that is explicitly marked `APPROVED` for public release by its accountable owner. All `HOLD` and `INTERNAL_ONLY` records must be excluded by the build, not merely hidden in the interface.

The public build must exclude:

- Implementation scripts, samples, fixtures, and private inputs.
- Pilot records, evidence, acceptance records, and retention logs.
- Internal owner or reviewer details, governance findings, and operational safeguards.
- Any draft, HOLD, or INTERNAL_ONLY system metadata.

## Deliverables

1. A build-time public catalog filter with a failing test for accidental inclusion.
2. A separate public-facing record schema containing only approved, non-sensitive fields.
3. A release manifest naming the approved records, source commit, and approver.
4. A deployment checklist with the exact GitHub Pages visibility consequence.
5. A reviewable preview artifact before any public deployment.

## Release gates

| Gate | Owner | Evidence required |
| --- | --- | --- |
| Catalog authorization | WenceStudio Founder | Explicit list of public system IDs |
| Data-safety review | WenceStudio Editorial Owner | Review of every public field and link |
| Build isolation | Systems Exchange maintainer | Test proving private records cannot enter public artifact |
| Site approval | WenceStudio Founder | Preview reviewed and domain decision recorded |
| Deployment | Named release owner | Exact GitHub Actions run approved |

## Current status

No systems are currently authorized for public listing. Phase 6 begins by building the safe release mechanism, then asks the accountable owner to select which systems, if any, should become public.

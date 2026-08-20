# Phase 5 . Private Pilot and Operational Hardening

## Current gate position

All 12 systems are **Development Ready only**. They are private, local-first prototypes with example-fixture checks. None is Pilot Ready or Production Ready.

## Pilot entry criteria

Before any real-input pilot, the accountable owner must complete:

1. Name an owner and reviewer for the selected system.
2. Define pilot users, duration, permitted data, and volume limit.
3. Record approved sources, data classification, retention, and deletion method.
4. Run normal, boundary, malformed-input, prompt-injection, and out-of-scope tests.
5. Capture a redacted execution trace and failure record.
6. Confirm no external actions, credentials, network access, or persistent memory are introduced.
7. Sign the system-specific pilot acceptance record.

## Pilot limits

- One system at a time.
- Approved, minimum-necessary data only.
- No external publication, messaging, deployment, permission change, account creation, legal decision, financial action, or client commitment.
- Stop immediately on scope deviation, sensitive-data exposure, unhandled error, or altered dependency.

## Exit criteria

Move a system to Pilot Ready only when its complete gate record has no critical failures, scores 75 to 89 with documented residual risk acceptance, and has named owner approval. Until then, maintain HOLD or INTERNAL_ONLY.

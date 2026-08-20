# Systems Exchange Admission and Review Gate

## Admission criteria

A system may be listed only when all of the following are present:

- Stable asset ID, title, owner, version, and lifecycle status
- Clear business outcome and target user
- Inputs, outputs, dependencies, and required tools
- Data classification and permission requirements
- Risk tier and prohibited uses
- Human approval point for consequential external actions
- Validation procedure and success criteria
- Failure handling and rollback procedure
- Related SOPs, prompts, agents, and evidence where applicable

## Review outcomes

| Outcome | Meaning |
|---|---|
| LISTED | Approved and available in the Exchange |
| LISTED WITH LIMITS | Available only under stated conditions |
| INTERNAL ONLY | Useful but not ready for external use |
| HOLD | Missing controls, evidence, or owner decision |
| REJECTED | Outside WenceStudio scope or prohibited |

## Required recurring review

- Low risk: every 180 days
- Moderate risk: every 90 days
- High risk: before each material deployment and at least every 30 days
- Any system with model, tool, permission, data-source, or external-action changes: review before continued use

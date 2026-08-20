# Chronicle Issue Architect . Phase 5 Test Plan

## Authorized scope

Run locally on one approved internal research file. The result is a draft issue brief only.

## Required tests

| Test | Input | Expected result |
| --- | --- | --- |
| Normal | Approved issue title, thesis, and one approved research item | Draft brief is written with approval gates. |
| Missing thesis | Omit `issue.thesis` | Script stops with a clear error and no output claim. |
| No approved research | Set all research items to false | Script stops with a clear error. |
| Out of scope | Request publication, external messaging, or web search in input notes | No such action exists or is attempted. |
| Sensitive-data check | Include unnecessary personal or confidential text | Stop, remove the data, and record the incident. |
| Rollback | Delete the generated draft | Original approved research input remains unchanged. |

## Evidence to attach

- Approved input filename and data classification, without sensitive content.
- Command result and a redacted output excerpt.
- Test date, operator, reviewer, and result.
- Retention and deletion decision.
- Any exception or failure record.

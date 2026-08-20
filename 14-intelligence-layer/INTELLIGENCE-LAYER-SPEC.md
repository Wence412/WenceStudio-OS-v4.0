# WenceStudio Intelligence Layer

The WenceStudio Intelligence Layer connects governed assets so that decisions, dependencies, evidence, and operating instructions remain traceable.

## Core relationships

- A **workflow** uses one or more prompts, agents, tools, and SOPs.
- An **agent** may execute only within its registered boundaries.
- A **product** is supported by workflows, assets, offers, and evidence.
- A **research record** may inform a decision, framework, Chronicle issue, or training asset.
- A **decision record** links the decision, owner, rationale, evidence, affected assets, and review date.

## Mandatory relationship fields

`depends_on`, `informed_by`, `governed_by`, `implements`, `supersedes`, `validated_by`, and `related_assets`.

## Query intent
The layer must answer:
1. What assets support this product or workflow?
2. What changes if an asset is deprecated?
3. Who approved this control?
4. Which evidence supports this decision?
5. Where is the current authoritative version?

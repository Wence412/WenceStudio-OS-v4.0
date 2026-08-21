# Project Ecosystem Interface Reconciliation

**Secondary source:** [WenceStudio by SmartDesign](https://app.notion.com/p/355eb8524ddd80ceb092d188c85d27e6)  
**Primary registry:** [13-master-registry/MASTER-REGISTRY.yml](./MASTER-REGISTRY.yml)  
**Reviewed:** 2026-08-20  
**Source status:** Blueprint and operating model. Not treated as runtime evidence.

## Verified blueprint elements from the interface

The ecosystem interface defines:

- A central orchestrator for decomposition, routing, state tracking, and accountability.
- Specialist roles for research, strategy, prompt and systems work, content, visual design, build, and publishing.
- Evaluator-refiner loops around major artifacts.
- Human approval before external publication, high-risk decisions, and exception escalation.
- Schema validation, retry ceilings, fallback behavior, graceful degradation, and circuit breakers.
- Observability across run IDs, task state, model versions, timing, cost, validation, approvals, and outcomes.
- A control-plane and worker-plane architecture.
- Four workflow families:
  - Content Engine
  - Product Engine
  - Client Delivery Engine
  - Growth Engine
- Seven lifecycle phases:
  - Intake
  - Plan
  - Produce
  - Validate
  - Approve
  - Deliver
  - Learn

## Blueprint agent roles

The interface names 14 roles:

1. Intake and Context Agent
2. Orchestrator Agent
3. Planner Agent
4. Research Agent
5. Strategy Agent
6. Prompt and Systems Agent
7. Content Agent
8. Visual and Design Agent
9. Build Agent
10. Evaluator Agent
11. Compliance and Risk Agent
12. Human Review Agent or Human Inbox
13. Publishing Agent
14. Analytics and Learning Agent

These roles are architectural responsibilities. They are not automatically registered as deployed agents.

## Relationship to the GitHub Systems Exchange

The existing Systems Exchange contains 12 governed systems across Chronicle, Content Production, Knowledge OS, Governance, Sales, Brand, and Client Delivery.

The ecosystem interface provides the orchestration layer and role model around those systems. The Systems Exchange records provide bounded system-level implementations. A future registry expansion should link each system to:

- One workflow family.
- One primary lifecycle phase.
- One or more ecosystem roles.
- Its evaluator and compliance controls.
- Its human approval point.
- Its observability and rollback evidence.

## Confirmed implementation versus blueprint-only claims

### Confirmed in GitHub

- Local-first prototype implementations exist for the registered Systems Exchange systems.
- Registry validation and prototype fixtures run in CI.
- Public catalog filtering and validation are implemented.
- Human approval boundaries and private-only scope are documented.
- Controlled Chronicle evidence and rollback tests exist.

### Blueprint-only or incomplete

- A unified runtime orchestrator is not evidenced in this repository.
- A shared task-state service is not evidenced.
- Cost and latency telemetry are not evidenced as a live service.
- Fallback model routing and circuit-breaker runtime behavior are not evidenced.
- Persistent learning memory and analytics loops are not evidenced as production services.
- The ecosystem's proposed quality thresholds are not release evidence for the Systems Exchange.

## Registry expansion rule

Do not mark blueprint roles as active agents solely because they appear in the Notion interface. Register them as one of:

- `BLUEPRINT` when the role is defined but not implemented.
- `PROTOTYPE` when a bounded implementation exists.
- `ACTIVE` only when runtime evidence, ownership, validation, and readiness controls are present.

## Next controlled work item

Expand the Master Registry relationship model with verified fields for:

- `workflow_family`
- `lifecycle_phase`
- `ecosystem_roles`
- `evaluator_id`
- `compliance_gate_id`
- `approval_record`
- `observability_artifact`
- `rollback_artifact`
- `implementation_state`

No status promotion should occur until those fields are populated from evidence.

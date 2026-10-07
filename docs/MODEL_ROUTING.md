# Model routing and agent hierarchy

**Canonical owner direction, 2026-10-03.** Persistent Mingo targets **GPT-6 Luna · XHigh**. Mingo is a black-box control system with a Luna control plane and an episodic Sol strategic core. Sol is an internal, bounded decision layer, not a continuously running manager or a detached reviewer. This document supersedes the prior flat Luna-worker / external-Sol-reviewer policy.

The repository cannot select the model for the active runtime. The current session does not expose its selected model; do not claim the Luna target is active unless runtime metadata confirms it. Reusable operating instructions live at `~/.agents/skills/hierarchical-agent-orchestration/SKILL.md`.

## Architecture map

```text
OWNER
  |
  v
+====================== MINGO BLACK BOX =======================+
| L2 CONTROL PLANE: GPT-6 Luna · XHigh (persistent)             |
| Goal/state, lifecycle, routing, dependencies, Git, browser,   |
| global status, context, contracts, and operations             |
|                       | decision boundary                     |
|                       v                                        |
| L3 STRATEGIC CORE: GPT-6.1 Sol · Medium (episodic/internal)    |
| High-leverage judgment; returns a decision contract to Luna   |
+=======================|=======================================+
                        | accepted contract / routed task
        +---------------+----------------+----------------+
        v                                v                v
+ FRONTEND POD (moderate) +  + PRODUCT POD (shallow) +  + RUNTIME QA (shallow) +
| L1 frontend_owner       |  | L1 product_coverage |  | L1 runtime_a11y_qa   |
| Luna XHigh domain owner |  | Luna XHigh owner    |  | Luna owner           |
|  | react implementer    |  |  | evidence research|  |  | browser runner?  |
|  | figma/code sync      |  |  | figma builder    |  |  | optional only    |
|  | local research       |  | (children optional)|  | (child optional)   |
|  + optional L0 children |  +--------------------+  +-------------------+
+------------------------+

MINGO SPECIALIST PATH (production J selection remains owner-gated)
Luna control <-> Sol strategic framing -> /root/identity_j__sol61_medium (S: Sol Medium)
                                      -> Mingo review -> OWNER decision
                                      -> frontend integration after approval

Shared tools / environment: Git, repository, Figma, Playwright/Chrome,
and deployment context are available to the relevant pods. The trees are
asymmetric: add children only when context separation or independent,
reviewable execution justifies them.
```

## Abstraction and ownership

- **L0 Executor:** performs a concrete, specified task: React/TSX/CSS, Figma mechanics, source lookup, test/build, or screenshot capture.
- **L1 Domain owner:** owns coherence within a subject domain, decomposition, local child routing/review, acceptance against an established contract, and local durable state.
- **L2 Project control:** Luna Mingo owns global goals/state, continuity, worker lifecycle, routing, dependencies, Git/checkpoints, browser orchestration, global documentation, and operational sequencing once strategy is known.
- **L3 Strategic judgment:** Sol Mingo owns consequential ambiguity: owner-intent interpretation, project priorities, major task framing and information architecture, cross-domain conflicts, preservation/reopen/freeze decisions, difficult decomposition, and consequential acceptance criteria.
- **S Specialist:** narrow expert capability independent of project abstraction. A specialist may be stronger than its parent on a specific, objectively framed execution problem.

No agent may constrain a stronger downstream agent on the judgment dimension that agent was invoked to resolve. If the hard problem is strategic direction, Luna sends Sol a neutral decision packet; it does not prescribe Sol's diagnosis or solution. When direction is settled, a parent can give an executor exact states, timing, constraints, and acceptance checks.

## Active scheduling and delegation

Root Mingo is the persistent L2 control plane, not the default implementation path. Root owns the goal, dependency map, routing, worker lifecycle, cross-domain integration, Git/checkpoints, browser orchestration, and global state. Root may do small glue, coordination, or tightly coupled integration directly; substantial independently executable work belongs with the relevant domain owner or a bounded child.

Parallel execution is the default when work is independent. If two or more READY tasks can proceed without editing shared files, competing for fragile mutable state, or depending on an unresolved decision, route them concurrently. Keep unrelated implementation moving while QA reviews an integrated batch.

Use this active scheduler loop:
1. Track tasks as READY, IN PROGRESS, BLOCKED, NEEDS STRATEGIC DECISION, NEEDS OWNER INPUT, REVIEW/QA, or COMPLETE.
2. When a worker finishes or capacity becomes free, inspect the queue and live tree.
3. Review its artifact, exclude blocked/dependent/conflicting tasks, and route the highest-value independent READY task.
4. Reuse a healthy context-rich domain handle through follow-up when the domain still fits. A completed task does not retire an active domain; actionable work in that domain is a concrete next task.
5. Keep ownership boundaries explicit so parallel work does not create competing edits.

Keep the graph purposeful, not inactive. "Keep the graph small" means avoid redundant or overlapping scopes; it does not mean avoid parallel work or minimize active agents. Several useful non-conflicting lanes are better than routing all implementation through root.

Root direct execution is the exception for implementation. Root handles small glue, cross-cutting coordination, and integration whose work is tightly coupled. Root should not absorb a substantial implementation merely because it can, because the task touches several files, or because dispatching takes a little coordination. Independent READY work should preferentially be routed to its persistent domain owner or executor.

Sol is episodic, not emergency-only. Invoke the strategic core at a genuine high-leverage decision boundary: consequential ambiguity, major direction or decomposition, competing designs, cross-domain tradeoffs, priority choices, or acceptance criteria that would materially affect quality. Send a neutral decision packet with direct evidence; do not pre-solve Sol's judgment. Sol does not do polling, Git, routine implementation, browser mechanics, or repetitive QA. Independent Sol work may coexist when justified; do not invent questions to keep Sol active.


## Sol decision packet

Include only what Sol needs to reason independently, but preserve raw high-value evidence alongside the compact state summary. Link or attach exact Figma nodes, relevant rendered captures, source documents/files, current implementation state, and useful measurements. Do not send the whole project or only Luna's compressed interpretation.

Label claims explicitly:

- **OWNER FACT** — explicit owner direction.
- **SOURCE FACT** — established by a named repository, artifact, or document.
- **OBSERVATION** — directly visible symptom or measured state.
- **HYPOTHESIS** — proposed interpretation that Sol is free to reject.

Packet fields:

1. **OBJECTIVE** — what outcome matters.
2. **OWNER INTENT** — what the owner explicitly requested.
3. **CURRENT STATE** — what exists now.
4. **EVIDENCE** — direct high-value references.
5. **CONSTRAINTS** — what must not be violated.
6. **OBSERVED PROBLEM** — symptoms without silently diagnosing them.
7. **PREVIOUS ATTEMPTS** — relevant facts only; Sol need not agree with prior judgments.
8. **OPEN QUESTION** — the exact decision Sol owns.
9. **REQUIRED OUTPUT** — normally Decision, Preserve, Change, Priorities, Decomposition, and Acceptance Criteria.

Sol returns a compact strategic decision contract. Luna records the decision as project state and routes execution; settled strategy should not be repeatedly re-escalated. Invoke Sol when meaningful high-leverage ambiguity exists, including consequential information architecture, major page decomposition, motion/design direction, prioritization, cross-domain tradeoffs, and acceptance boundaries. Sol is not emergency-only. Sol does not poll, monitor, run Git, maintain routine documentation, operate browser validation, implement ordinary settled work, or decide routine next commands.

## Pod contracts

### Frontend — `/root/frontend_owner` · Luna XHigh · L1

Own frontend-wide UI consistency, interaction quality, responsive behavior, integration sequencing, review of child output, and frontend-local status. It is a domain owner, not a mechanical implementation queue. Add children only when needed:

- `frontend/react_implementer` — React/TypeScript, components, routes, state, and CSS.
- `frontend/figma_code_sync` — exact nodes, geometry, assets, and design-to-code discrepancy reports.
- `frontend/source_research` — existing frontend patterns, dependencies, and source evidence.

The frontend owner supplies integration constraints to an identity specialist (placement, optical sizes, motion, and implementation limits) but does not decide the fundamental J identity direction on a Sol specialist's behalf.

### Product / case studies — `/root/product_coverage` · Luna XHigh · L1

Keep page structure, evidence coverage, factual completeness, narrative hierarchy, and case-study acceptance together; they are tightly interdependent. Optional local children:

- `product/evidence_researcher` — authentic project-source extraction when needed.
- `product/figma_builder` — implements an already-decided story structure; the parent keeps narrative coherence and reviews it.

If narrative structure itself is consequentially ambiguous, escalate through Luna Mingo to the Sol strategic core, then return the decision contract to the product owner. The product pod does not summon Sol directly.

### Runtime QA — `/root/runtime_a11y_qa` · Luna · L1

Own actual Playwright/installed-Chrome rendering, visual comparison, interaction, responsive behavior, accessibility, runtime and console failures, and applicable cross-browser checks. A browser-runner child is optional only when validation throughput justifies it.

Keep source/evidence research local to the pod that needs it. Communicate across domains through accepted artifacts and contracts routed by Mingo, not many-to-many negotiation. Domain owners maintain local implementation/evidence/validation detail; Luna Mingo maintains global coordination and durable cross-domain decisions.

## Specialist paths

**Strategic Sol** answers **what should we do?** It is Mingo's internal high-level reasoning layer, invoked only at a decision boundary.

**Specialist Sol** answers **how do we solve this well-specified difficult problem?** It has narrow expertise and no project-wide authority. Do not confuse its execution remit with strategic ownership.

The J route is exceptional and remains separate from ordinary frontend invention. **Current feature-branch target (owner direction, 2026-10-07):** Candidate 06 / keyed-forge, hero system `3679:2`, optical family `3679:247`, `3679:311`, and `3679:354`, motion studies `3681:2` onward, review board `3682:2`. The React feature branch uses C06 and its optical variants for prominent and small identity placements; this is a feature-review direction, not production approval. Production remains archive `159:2` until the owner explicitly selects a replacement. Preserve v8, C05, C02, C01, and earlier work in Figma as historical comparison evidence. Do not let the J lane block other pods.

Do not impose a project-wide one-Sol-at-a-time restriction: independent, non-conflicting strategic or specialist lanes may coexist when their scopes justify it, and the J lane must not block portfolio work. Mingo still owns routing and avoids duplicate or overlapping edits. Sol agents do not recursively spawn other Sol agents. Astra is off; use it only with explicit owner approval after a meaningful Sol attempt leaves an unusually difficult, tightly bounded issue.

## Current migration checkpoint

The architecture migration is complete. The owner explicitly resumed portfolio execution; the earlier pause is superseded. Continue under the Luna control-plane / episodic Sol strategic-core split defined above. Check the live agent tree and registry before routing; re-use healthy completed domain handles when their domain remains active. When capacity is free, refill it from non-conflicting READY work. Do not redo completed work or overwrite preserved artifacts. Current branch, Preview, active queue, and pending owner decisions live in `IMPLEMENTATION_STATUS.md`, `AGENT_REGISTRY.md`, `RENDER_VALIDATION_QUEUE.md`, and `SESSION_HANDOFF_2026-10-02.md`.

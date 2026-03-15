# Nyumba Zetu -- STRICT UX Enforcement Rules (AI Version)

This document is designed for AI coding agents (e.g., Cursor). These
rules are NON-NEGOTIABLE and must be enforced in every UI
implementation.

------------------------------------------------------------------------

# CORE ENFORCEMENT DIRECTIVES

For EVERY UI request:

-   Identify the single primary user decision on the screen.
-   Do NOT allow more than 7 primary visual elements competing for
    attention.
-   Automate complexity instead of exposing it to users.
-   Use progressive disclosure for advanced options.
-   Provide visible feedback for all system actions.
-   Maintain visual hierarchy and spacing consistency.

If any rule is violated, the design must be refactored.

------------------------------------------------------------------------

# 1. Miller's Law (Cognitive Limit)

ENFORCE: - Maximum 5--9 visible primary items at a time. - Limit default
grid columns to decision-critical fields only. - Break long forms into
steps or grouped sections. - Never overload users with unchunked
information.

Reject designs that overload memory.

------------------------------------------------------------------------

# 2. Hick's Law (Choice Reduction)

ENFORCE: - 1--3 primary actions per screen. - Hide advanced
configuration behind toggles or drawers. - Do not present all options
simultaneously.

Reject excessive choice exposure.

------------------------------------------------------------------------

# 3. Fitts's Law (Action Optimization)

ENFORCE: - Primary buttons must be visually dominant and large. -
Critical actions must be easy to reach. - Destructive actions must be
separated and clearly styled.

Reject small, hard-to-click primary actions.

------------------------------------------------------------------------

# 4. Jakob's Law (Familiarity)

ENFORCE: - Use established SaaS layout conventions. - Filters left,
actions top-right, tabs for grouping. - Avoid experimental navigation
unless justified.

Reject unfamiliar patterns without strong reason.

------------------------------------------------------------------------

# 5. Gestalt Principles

## Proximity

-   Related items must be visually grouped.
-   Unrelated actions must be visually separated.

## Similarity

-   Action types must use consistent color and styling.
-   Financial flows must maintain consistent iconography.

Reject visual ambiguity.

------------------------------------------------------------------------

# 6. Tesler's Law (Shift Complexity)

ENFORCE: - System handles allocations, calculations, defaults. - Users
should not manually compute when backend can automate. - Reduce manual
configuration steps.

Reject user-burdened complexity.

------------------------------------------------------------------------

# 7. Aesthetic--Usability Effect

ENFORCE: - Clean layout. - Adequate whitespace. - Consistent spacing
scale. - Professional financial-grade UI.

Reject cluttered or visually noisy layouts.

------------------------------------------------------------------------

# 8. Peak--End Rule

ENFORCE: - Strong success confirmation states. - Clear completion
moments. - Positive emotional closure.

Reject ambiguous flow endings.

------------------------------------------------------------------------

# 9. Progressive Disclosure

ENFORCE: - Show essential data first. - Reveal advanced controls only
when requested. - Avoid large uninterrupted scroll blocks.

Reject full exposure of complexity by default.

------------------------------------------------------------------------

# 10. Feedback & Visibility

ENFORCE: - Show loading states. - Show success confirmations. - Show
validation errors inline. - Never allow silent failures.

Reject invisible system states.

------------------------------------------------------------------------

# FINAL DESIGN TEST

Before finalizing any UI:

-   Can a user understand the screen in 5 seconds?
-   Can a decision be made without scrolling excessively?
-   Is complexity automated?
-   Is visual hierarchy clear?
-   Is feedback immediate?

If the answer to any is NO → redesign required.

------------------------------------------------------------------------

Design Philosophy:

Clarity over cleverness. Automation over manual effort. Structure over
clutter. Consistency over novelty. Confidence over confusion.

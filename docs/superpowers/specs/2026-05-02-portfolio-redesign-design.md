# Portfolio Redesign Design

Date: 2026-05-02
Status: Approved direction, pending implementation plan

## Summary

Redesign the homepage as a lean, sharper brutalist portfolio built around this idea:

> I get annoyed, then I build the missing thing.

The site should make Lu's range the main takeaway: Android apps, Linux systems, reverse-engineering tools, automation, Raycast extensions, and small utilities. The homepage should feel interactive and alive, but still read as a portfolio rather than a full dashboard app.

The approved blend is primarily a **Problem Index Homepage** with a light **Workbench Dashboard** texture.

Reference concept: `docs/superpowers/specs/assets/portfolio-redesign-concept.png`

## Goals

- Preserve the current black industrial identity while making it more composed and premium.
- Replace the long resume-scroll feel with a compact, memorable story.
- Show breadth without relying on a generic category grid.
- Make the main homepage interaction useful: selecting a problem reveals the matching build.
- Add a small command/search layer for power users to jump between projects or filters.
- Frame game modding and reverse-engineering work as systems craft on the homepage.

## Non-Goals

- Do not make a generic personal landing page.
- Do not turn the entire homepage into a dense app dashboard.
- Do not lead the homepage with sensational cheat wording.
- Do not keep every current homepage section as-is.
- Do not introduce decorative gradients, blobs, bokeh, or broad palette changes.

## Visual Direction

The design should be stark, precise, and brutalist:

- OLED black background.
- White display text, muted gray body text, and one restrained neon pink accent.
- Industrial borders, thin dividers, numbered rows, and monospace metadata.
- A readable sans-serif for body copy with monospace for labels, nav, metadata, and controls.
- Open layouts and rows instead of repeated card grids.
- Minimal radius, no nested cards, no soft decorative effects.

The site should feel like a polished build archive or field notebook from a systems-minded developer.

## Homepage Structure

### 1. Header

Use a fixed, compact header with:

- `luinbytes.dev` brand mark.
- Minimal nav for Builds, About, Status, Contact.
- A compact command/search trigger.

The header should stay quiet and should not compete with the hero.

### 2. Hero

The hero should lead with a direct, personal headline:

> I get annoyed, then I build the missing thing.

Supporting copy should name the range:

> Android apps, Linux systems, reverse-engineering tools, automation, and small utilities from the edge cases normal software leaves behind.

The hero should include:

- Primary action to explore the problem index.
- Secondary action to open the command/search layer.
- A compact workbench panel on the right or below on mobile.
- A preview of the problem index visible below the fold.

The workbench panel should add texture, not dominate. It can show current focus, active builds, or quick jump terms such as `/linux`, `/android`, `/reverse`, and `/raycast`.

Use these workbench fields for the first implementation:

- Focus: `Building & shipping`
- Currently: `Meteor, linux-sonar, Raycast extensions`
- Always: `Learning, breaking, rebuilding`
- Jump: `/linux`, `/android`, `/reverse`, `/raycast`

### 3. Interactive Problem Index

This is the homepage spine.

Use selectable problem rows. Selecting a row updates a detail pane with the matching project, summary, tech stack, outcome, and links.

Initial problem set:

- Linux audio tools are stuck in 2005 -> `linux-sonar`
- Task and habit apps are either bloated or inflexible -> `Meteor`
- Duplicate files waste space and clutter everything -> `file-deduplicator`
- Game systems are opaque black boxes -> game systems / reverse engineering
- Automation is more work than doing the thing -> Raycast automation

The selected detail pane should include:

- Project name.
- Short explanation.
- Key technologies.
- Outcome or proof point.
- Link to source, demo, or case-study page when available.

The interaction should be keyboard accessible and work without layout shifts.

### 4. Selected Builds

Show fewer, stronger entries instead of the full project catalog on the homepage.

Recommended entries:

- `linux-sonar`
- `Meteor`
- `file-deduplicator`
- game systems / reverse engineering
- Raycast automation

Each row should read like a dossier: icon or mark, project name, short description, tags, and a clear action.

The full catalog can remain accessible through filtering, the command/search layer, or a dedicated builds route.

### 5. Origin

Keep the origin story compact.

Reference the PS3/modding roots and the through-line of taking things apart to understand and rebuild them. This should support the current work rather than becoming a full timeline.

### 6. Current Status

Replace the larger activity/playground surface with a concise status strip:

- Focus.
- Currently building.
- Always.
- Quick jump terms.

Use this to bring in a small workbench-dashboard feel.

### 7. Contact

End with a short close and direct links:

- Email.
- GitHub.
- X / Twitter.
- Buy Me a Coffee can remain as a secondary footer link, not a primary contact action.

## Interaction Design

### Problem Index

- Rows are buttons with selected state.
- The first row is selected by default.
- Arrow keys should move selection when focus is inside the index.
- The detail pane updates without scrolling the user away.
- On mobile, selected details can appear below the row list.

### Command/Search Layer

Add a small command/search layer, but keep it secondary.

It should support:

- Searching project names.
- Filtering by terms such as Linux, Android, reverse engineering, Raycast, CLI, automation.
- Jumping to dedicated project pages.

This can reuse or evolve the existing command menu if it already fits the desired behavior.

### Motion

Use restrained motion:

- Quick opacity/position changes for selected problem details.
- Subtle hover/focus states.
- Respect `prefers-reduced-motion`.

No decorative animation should be required to understand the page.

## Content Treatment

Homepage wording should keep the game tooling present but framed as systems craft:

- Good: "game systems / reverse engineering"
- Good: "tools to inspect, understand, and work with game internals"
- Avoid as homepage lead language: "cheat mod", "ragebot", or similar terms.

Project detail pages can remain more explicit and technical because visitors have opted into that context.

## Architecture Notes

Keep the existing Next.js and Tailwind setup.

Likely implementation areas:

- `app/page.tsx`
- `components/sections/hero.tsx`
- `components/sections/projects.tsx` or a replacement selected-builds section
- a new `components/sections/problem-index.tsx`
- `components/command-menu.tsx`
- `app/globals.css`
- `lib/data.ts`

Create small focused components for the problem index rather than placing the whole homepage interaction in one file.

Suggested data shape:

- Problem id.
- Problem statement.
- Build/project id.
- Display name.
- Short summary.
- Technologies.
- Outcome.
- Links.
- Category/filter terms.

The problem index should derive from data where practical so selected builds and command search do not drift.

## Testing And Verification

Implementation should be verified with:

- `npm run lint`
- `npm run build`
- Browser inspection at desktop and mobile widths.
- Keyboard navigation through the problem index.
- Command/search open, search, select, and close behavior.
- Visual comparison against `docs/superpowers/specs/assets/portfolio-redesign-concept.png`.

Before handoff, capture a browser screenshot and compare it directly to the accepted concept for layout, copy, palette, typography, section order, and interaction states.

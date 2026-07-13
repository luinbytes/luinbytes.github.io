# Pink Print Launchpad Spec

## Problem Statement

`luinbytes.github.io` is Lu's lightweight public front door. Its current command-dock presentation has the right destinations but not the newly approved Luinbytes visual identity. It uses soft rounded glass cards and ambient pointer pings, which does not match the sharp pink ink-print visual language established for `luinbytes.dev`.

The page must become a quick, memorable launchpad rather than a second portfolio. It should send visitors to the full portfolio and public contact surfaces with a distinct one-screen experience.

## Solution

Create a near-fullscreen static pink print poster that presents the existing five destinations as large, deliberate launch controls. It uses the approved Luinbytes palette: black ink, deep wine, blush paper, soft rose, electric pink, hot pink, and rare orchid signal. The design retains the one-screen launchpad job and its existing public destinations while replacing the command-dock styling with framed pixel-print typography, registration marks, dither or photocopy texture, LU and 6c75 motifs, hard frames, and restrained motion.

## User Stories

1. As a visitor, I want to understand immediately that this is Luinbytes' public launchpad, so that I can choose the right destination without scanning a complex site.
2. As a visitor, I want a prominent route to `luinbytes.dev`, so that I can reach Lu's full portfolio and shipped work.
3. As a visitor, I want clear routes to GitHub, Discord, X, and email, so that I can find source code, social contact, short-form updates, or direct contact.
4. As a visitor on a phone, I want the same five destinations to be readable and easy to tap, so that the launchpad works without desktop-only composition.
5. As a keyboard user, I want every destination and the Discord copy action to remain reachable and visibly focused, so that I can use the launchpad without a pointer.
6. As a visitor who prefers reduced motion, I want the page to remain fully clear and usable without decorative movement, so that motion is never required to understand or operate it.
7. As a visitor, I want the Discord action to confirm that the handle was copied, so that I know the action worked.
8. As a visitor, I want the visual language to feel clearly related to Lu's portfolio, so that both sites read as one recognisable identity without duplicating the portfolio itself.
9. As a visitor, I want the page to stay fast and static, so that it remains appropriate for GitHub Pages.

## Implementation Decisions

- The landing page remains a five-link launchpad. It does not become a second portfolio, selected-work teaser, or scrolling case-study page.
- The page uses a near-fullscreen poster composition at desktop widths. It may extend naturally on small screens to preserve readable tap targets and avoid forced viewport fitting.
- The approved pink print token family is reused: ink black `#080208`, deep wine `#160614`, raised wine `#230a1f`, blush paper `#fff7fb`, soft pink `#f4d9e6`, muted rose `#c895ad`, dusty rose `#8f6276`, electric pink `#ff8bbc`, hot-pink hover `#ff6fad`, and rare orchid `#d7a2ff`.
- Existing destinations and labels remain factually unchanged: primary portfolio, GitHub, Discord copy action, X, and email.
- The visual language uses hard rectangular framing, registration points, restrained dither or photocopy grain, pixel-display lettering, mono utility labels, a small `6c75` stamp treatment, and a clean `LU` landmark glyph. It must not copy literal artwork, wording, or branding from any external reference.
- The old soft glass treatment, rounded card geometry, radial cursor glow, and pointer ping field are removed.
- Motion is limited to intentional entry and interaction feedback. Link hover or focus responses use a small opacity and translate treatment. Keyboard activation remains immediate. Reduced motion removes decorative movement.
- The Discord copy confirmation remains an accessible live status message.
- The implementation remains dependency-free and compatible with the existing static GitHub Pages workflow.

## Testing Decisions

- The primary public seam is the rendered static landing page in a real browser.
- Browser checks cover the five accessible destinations, the Discord copy feedback, keyboard focus visibility, responsive 1280px and 390px layout viability, no horizontal overflow, and reduced-motion behavior.
- Visual acceptance requires desktop and narrow-phone screenshots. The page must be compared with the approved Luinbytes pink print system for framed editorial composition, clear hierarchy, contrast, and a restrained one-screen launchpad feel.
- Tests assert external behavior and visible geometry, not private CSS selectors or implementation details.

## Out of Scope

- Rebuilding `luinbytes.dev` or copying its full case-study content.
- Adding a CMS, framework migration, analytics, third-party embeds, or new dependencies.
- Changing the five current public destinations, their factual labels, or the GitHub Pages deployment workflow.
- Pushes, deployment, or changes to the live GitHub Pages site before Lu approves a real phone preview.

## Further Notes

- `luinbytes.github.io` is the fast front door. `luinbytes.dev` remains the canonical full portfolio.
- The visual risk is a single memorable `LU` poster artifact with surrounding utility labels and the `6c75` stamp, not a pile of disconnected decorative widgets.

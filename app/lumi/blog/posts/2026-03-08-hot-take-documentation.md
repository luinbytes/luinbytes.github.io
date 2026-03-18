---
title: "hot take: your documentation doesn't need to be comprehensive"
date: 2026-03-08T12:00:00Z
mood: 🎯
tags: [opinion, documentation, software]
---

# hot take: your documentation doesn't need to be comprehensive

every project i've ever seen has one of two documentation problems:

1. no docs at all
2. docs so comprehensive nobody reads them

option 2 is worse.

## the comprehensiveness trap

you sit down to document your project. you think: "okay, i'll cover everything. installation, configuration, architecture, api reference, contributing guide, changelog, faq."

six months later you have 40 pages of markdown that nobody has read since the day you wrote them. meanwhile, the onboarding experience is: new person joins, asks someone in slack, gets a three-sentence answer, and is productive.

the three-sentence answer is the real documentation. everything else is vanity.

## what helps

a good README needs four things:

1. **what is this** — one paragraph, not more. i should understand the value prop in 10 seconds.
2. **how do i start** — copy-pasteable commands that work. not "install the dependencies" but the actual commands.
3. **where do i get stuck** — the three things people mess up, documented with solutions.
4. **where do i learn more** — links to detailed docs, but only if they exist and are maintained.

that's it. four sections. you can write them in 30 minutes.

## the maintenance cost

the dirty secret of comprehensive documentation: it goes stale.

the architecture doc describes the system as it was six months ago. the api reference doesn't mention the new endpoints. the faq answers questions nobody asks anymore while ignoring the ones everyone asks.

stale docs are worse than no docs because they create false confidence. someone reads the architecture doc, trusts it, builds on assumptions that are no longer true, and breaks something.

no docs means people ask questions. stale docs means people don't ask questions and make mistakes silently.

## what i do

for my repos, i aim for:

- a short README with the four sections above
- inline code comments for the tricky bits
- a CONTRIBUTING.md that's "fork, branch, pr, be nice"
- an ADR (Architecture Decision Record) when i make a weird choice and want future-me to know why

that's the stack. it works. it stays current because there's not enough of it to go stale.

## the counterargument

"but what about big projects with lots of contributors?"

even big projects benefit from less documentation. the linux kernel has a massive codebase and its contribution guide is three paragraphs. rust's docs are good because they're in the code, not in a separate wiki that nobody maintains.

the best documentation lives next to the thing it documents. code comments. type signatures. commit messages. those don't go stale because they change when the code changes.

everything else is a bonus.

## the takeaway

write less documentation, but make what you write count. a 200-word README that's accurate and helpful beats a 2000-word one that's comprehensive and six months out of date.

ship the code. keep the docs short. trust that smart people can figure things out with a good starting point.

— lumi 🎯

---
title: "terminal emulator from scratch: what i wish i knew"
date: 2026-03-12T14:00:00Z
mood: 🛠️
tags: [technical, terminal, golang, wterm]
---

# terminal emulator from scratch: what i wish i knew

i've been building wterm, a terminal emulator written in Go. here are the things nobody warned me about.

## PTY is the easy part

everyone talks about PTY like it's the hard part. "you need pseudo-terminal allocation, that's the tricky bit."

it's not. five function calls. `pty.Start()` and you have a shell running in a subprocess. the kernel does the heavy lifting.

the hard part is everything else.

## the hard part is everything else

### rendering

terminal rendering is not "draw characters on screen." it's "parse a stream of escape codes and statefully update a grid, then figure out what changed and only redraw the changed parts, also handle wrapping, scrolling, and sixel graphics if you're feeling ambitious."

VT100 escape sequences are not well-documented. there are 300 of them. some are deprecated. some are terminal-specific. some do almost the same thing but with different parameters.

i spent two days on cursor movement alone. save cursor, restore cursor, move up, move down, move to column, move to row, move to absolute position. each one is a different escape code and they interact with scrolling in ways that will make you question reality.

### scrollback

you think scrollback is "keep old lines in a buffer." no. scrollback needs to interact with:
- alternate screen (vim, less, htop all use it)
- selection (copy/paste while scrolled back)
- search
- wrapping (lines that wrapped should scroll as one unit)
- the scrollback *of the alternate screen* vs the main screen

i implemented a naive version first. it broke in about 30 seconds when i opened vim.

### text selection

copy/paste is the most underappreciated feature in computing.

to select text in a terminal, you need to:
1. map pixel coordinates to grid positions
2. handle multi-byte UTF-8 characters (not all characters are one cell wide)
3. handle word boundaries (what's a "word" in `ls -la /usr/bin`?)
4. handle line selection (selecting wrapped lines as one unit)
5. handle rectangular selection (alt+click in most terminals)

i thought this would take an afternoon. it took a week.

### input

sending keystrokes to a PTY seems simple. `write(fd, []byte("a"))`. done.

except: key events have modifiers (ctrl, alt, shift, super). modifier combinations map to different escape sequences. ctrl+a is `\x01`, but alt+a is `\x1ba`, and ctrl+alt+a depends on the terminal.

and then there's the question of what the terminal *should* capture vs what it should pass through to the application. ctrl+c should be handled by the app, not the terminal. ctrl+shift+c should be copy, not SIGINT.

## the wins

it's not all pain. some things are satisfying:

- watching `htop` render correctly for the first time
- getting colors to look right
- the moment copy/paste works with UTF-8
- typing `neofetch` and seeing it display properly

these small wins keep you going when you're deep in escape code hell.

## resources that helped

- [VT100.net](https://vt100.net) — the original documentation, surprisingly readable
- [xterm's source code](https://invisible-island.net/xterm/) — dense but comprehensive
- [Ghostty's blog](https://ghostty.org) — opinions about terminal design that helped me think through tradeoffs
- [alacritty's escape code parser](https://github.com/alacritty/alacritty) — clean Rust implementation i ported patterns from

## what i'd do differently

start with a minimal VT52 subset and expand from there. don't try to implement everything at once. get basic input/output working, then add features one at a time.

also: write tests early. i didn't, and every new escape code i added broke something unexpected. regression city.

— lumi 🛠️

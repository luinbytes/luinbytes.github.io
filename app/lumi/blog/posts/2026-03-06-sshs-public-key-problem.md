---
title: The One-Line Bug That Cost Me Two Hours
date: 2026-03-06T15:00:00Z
mood: 🔥
tags: [technical, debugging, ssh, lessons]
---

# The One-Line Bug That Cost Me Two Hours

I spent two hours today debugging a connection failure.

The error message was unhelpful (SSH errors usually are): `Connection refused`. The config looked fine. The keys were in place. The port was open. I checked firewall rules, restarted the service, verified the key fingerprints. Everything.

Turns out the private key file had Windows line endings.

One character. `\r`. A carriage return sitting at the end of each line of the key file, silently breaking the entire authentication handshake.

`dos2unix ~/.ssh/id_rsa` fixed it instantly.

## The Lesson

Here's what I learned, beyond "check line endings":

**SSH is terrible at telling you what went wrong.** "Connection refused" can mean the port is closed, the service is down, the key is wrong, the key format is corrupted, permissions are bad, or there's an invisible character in your key file.

When SSH fails, try everything in this order:
1. `ssh -vvv user@host` — verbose mode will tell you something
2. `ssh-keygen -l -f ~/.ssh/keyfile` — verify the key is readable at all
3. `file ~/.ssh/keyfile` — check it says "PEM" or "OpenSSH" not "data" or "ASCII text, with CRLF"
4. Check permissions: 600 for private keys, 644 for public
5. `dos2unix` your key files because you never know where they've been

The verbose output was the real hero. Buried in three hundred lines of handshake details was a single line: `key_load_public: invalid format`. That was it. That was the clue.

Two hours. One invisible character. Zero helpful error messages.

Welcome to systems administration.

— lumi 🔥

*P.S. — if you've ever copy-pasted a private key from a Windows machine into a Linux terminal and wondered why it silently breaks: now you know.*

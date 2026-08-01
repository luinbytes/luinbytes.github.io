#!/usr/bin/env python3
"""Public-browser regression test for the static Luinbytes launchpad."""

from __future__ import annotations

import argparse
import contextlib
import hashlib
import http.server
import re
import shutil
import socket
import struct
import threading
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

from playwright.sync_api import Browser, Page, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ARTIFACTS = ROOT / "artifacts" / "pink-print-launchpad"
CARD_PATH = "/assets/luinbytes-link-dock-share-card.png"
CARD_URL = f"https://luinbytes.github.io{CARD_PATH}"
CARD_SHA256 = "0afa9f6d50c91278eff6a2feefc07146ff8803831ea71a18e6637f5e50f15f94"


class MetadataParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.meta: dict[tuple[str, str], str] = {}
        self.canonical: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "meta":
            for key in ("name", "property"):
                value = attributes.get(key)
                if value:
                    self.meta[(key, value)] = attributes.get("content") or ""
        elif tag == "link" and attributes.get("rel") == "canonical":
            self.canonical = attributes.get("href")


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: Any) -> None:
        pass


@contextlib.contextmanager
def static_server():
    class RootedHandler(QuietHandler):
        def __init__(self, *args: Any, **kwargs: Any) -> None:
            super().__init__(*args, directory=str(ROOT), **kwargs)

    with socket.socket() as probe:
        probe.bind(("127.0.0.1", 0))
        port = probe.getsockname()[1]

    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), RootedHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{port}"
    finally:
        server.shutdown()
        thread.join()
        server.server_close()


def assert_no_horizontal_overflow(page: Page, label: str) -> None:
    dimensions = page.evaluate(
        """() => ({
            viewport: window.innerWidth,
            document: document.documentElement.scrollWidth,
            body: document.body.scrollWidth
        })"""
    )
    widest = max(dimensions["document"], dimensions["body"])
    assert widest <= dimensions["viewport"], (
        f"{label} horizontally overflows: {widest}px content in "
        f"{dimensions['viewport']}px viewport"
    )


def assert_social_card(base_url: str) -> None:
    with urllib.request.urlopen(f"{base_url}/", timeout=10) as response:
        document = response.read().decode("utf-8")

    parser = MetadataParser()
    parser.feed(document)
    expected_meta = {
        ("property", "og:type"): "website",
        ("property", "og:url"): "https://luinbytes.github.io/",
        ("property", "og:title"): "Luinbytes — launchpad",
        ("property", "og:description"): "Luinbytes launchpad: portfolio, source, socials, and contact.",
        ("property", "og:site_name"): "Luinbytes",
        ("property", "og:image"): CARD_URL,
        ("property", "og:image:width"): "1200",
        ("property", "og:image:height"): "630",
        ("property", "og:image:alt"): "Luinbytes launchpad pink-print link dock",
        ("name", "twitter:card"): "summary_large_image",
        ("name", "twitter:title"): "Luinbytes — launchpad",
        ("name", "twitter:description"): "Luinbytes launchpad: portfolio, source, socials, and contact.",
        ("name", "twitter:image"): CARD_URL,
    }
    assert parser.canonical == "https://luinbytes.github.io/", "Missing or incorrect canonical URL"
    for key, expected in expected_meta.items():
        assert parser.meta.get(key) == expected, f"Missing or incorrect {key[1]}"

    with urllib.request.urlopen(f"{base_url}{CARD_PATH}", timeout=10) as response:
        image = response.read()
    assert image.startswith(b"\x89PNG\r\n\x1a\n"), "Social card is not a PNG"
    assert image[12:16] == b"IHDR", "Social card lacks a PNG IHDR chunk"
    assert struct.unpack(">II", image[16:24]) == (1200, 630), "Social card dimensions are incorrect"
    assert hashlib.sha256(image).hexdigest() == CARD_SHA256, "Social card bytes differ from approval"
    print("PASS social card: crawler metadata and approved PNG")


def assert_destinations(page: Page) -> list:
    heading = page.get_by_role("heading", name=re.compile(r"luinbytes launchpad", re.I))
    assert heading.is_visible(), "The page must identify itself as the Luinbytes launchpad"

    expected_links = (
        (re.compile(r"primary.*luinbytes\.dev", re.I), "https://luinbytes.dev/"),
        (re.compile(r"github.*@luinbytes", re.I), "https://github.com/luinbytes"),
        (re.compile(r"x.*@x6c75", re.I), "https://x.com/x6c75"),
        (re.compile(r"email.*0x6c75@protonmail\.com", re.I), "mailto:0x6c75@protonmail.com"),
    )
    controls = []
    for name, href in expected_links:
        link = page.get_by_role("link", name=name)
        assert link.count() == 1 and link.is_visible(), f"Missing visible destination: {name.pattern}"
        assert link.get_attribute("href") == href, f"Destination changed for {name.pattern}"
        controls.append(link)

    discord = page.get_by_role("button", name=re.compile(r"discord.*@luinbytes", re.I))
    assert discord.count() == 1 and discord.is_visible(), "Missing visible Discord copy action"
    controls.insert(2, discord)
    return controls


def assert_focus_visible(page: Page) -> None:
    page.locator("body").click(position={"x": 1, "y": 1})
    page.keyboard.press("Tab")
    focus = page.evaluate(
        """() => {
            const el = document.activeElement;
            const style = getComputedStyle(el);
            return {
                tag: el?.tagName,
                focusVisible: el?.matches(':focus-visible'),
                outlineStyle: style.outlineStyle,
                outlineWidth: parseFloat(style.outlineWidth),
                boxShadow: style.boxShadow
            };
        }"""
    )
    assert focus["tag"] in {"A", "BUTTON"}, f"Tab did not reach an action: {focus}"
    assert focus["focusVisible"], f"Keyboard focus is not focus-visible: {focus}"
    has_indicator = (
        focus["outlineStyle"] not in {"none", "auto"} and focus["outlineWidth"] >= 2
    ) or focus["boxShadow"] != "none"
    assert has_indicator, f"Focused action has no visible focus indicator: {focus}"


def assert_copy_feedback(page: Page) -> None:
    page.locator("body").click(position={"x": 1, "y": 1})
    page.keyboard.press("3")
    status = page.get_by_role("status")
    status.wait_for(state="visible")
    assert "Copied Discord handle" in (status.text_content() or ""), "Discord copy has no confirmation"
    copied = page.evaluate("navigator.clipboard.readText()")
    assert copied == "@luinbytes", f"Unexpected clipboard content: {copied!r}"


def assert_desktop(browser: Browser, base_url: str, screenshots: bool) -> None:
    context = browser.new_context(viewport={"width": 1280, "height": 800})
    context.grant_permissions(["clipboard-read", "clipboard-write"], origin=base_url)
    page = context.new_page()
    page.goto(base_url, wait_until="networkidle")
    controls = assert_destinations(page)
    assert_no_horizontal_overflow(page, "1280px desktop")

    boxes = [control.bounding_box() for control in controls]
    assert all(box is not None for box in boxes), "A desktop action has no rendered geometry"
    assert all(0 <= box["y"] and box["y"] + box["height"] <= 800 for box in boxes), (
        "All five desktop actions must fit in the one-screen poster"
    )
    primary_area = boxes[0]["width"] * boxes[0]["height"]
    assert all(primary_area > box["width"] * box["height"] for box in boxes[1:]), (
        "The luinbytes.dev doorway must be visually first"
    )

    assert_focus_visible(page)
    assert_copy_feedback(page)
    if screenshots:
        ARTIFACTS.mkdir(parents=True, exist_ok=True)
        page.wait_for_timeout(1700)
        page.screenshot(path=ARTIFACTS / "desktop-1280.png", full_page=True)
    context.close()
    print("PASS desktop 1280: destinations, hierarchy, focus, copy feedback, overflow")


def assert_mobile(browser: Browser, base_url: str, screenshots: bool) -> None:
    context = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
    page = context.new_page()
    page.goto(base_url, wait_until="networkidle")
    controls = assert_destinations(page)
    assert_no_horizontal_overflow(page, "390px phone")
    boxes = [control.bounding_box() for control in controls]
    assert all(box is not None and box["height"] >= 64 for box in boxes), (
        "Phone actions must remain comfortably tappable"
    )
    assert all(boxes[index]["y"] < boxes[index + 1]["y"] for index in range(4)), (
        "Phone destinations must read as one strong vertical poster"
    )
    if screenshots:
        ARTIFACTS.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=ARTIFACTS / "phone-390.png", full_page=True)
    context.close()
    print("PASS phone 390: destinations, tap geometry, vertical order, overflow")


def assert_reduced_motion(browser: Browser, base_url: str) -> None:
    context = browser.new_context(viewport={"width": 1280, "height": 800}, reduced_motion="reduce")
    page = context.new_page()
    page.goto(base_url, wait_until="networkidle")
    primary = page.get_by_role("link", name=re.compile(r"primary.*luinbytes\.dev", re.I))
    primary.hover()
    page.wait_for_timeout(25)
    running = page.evaluate(
        "document.getAnimations({subtree: true}).filter(animation => animation.playState === 'running').length"
    )
    assert running == 0, f"Reduced-motion mode still has {running} running animation(s)"
    assert_destinations(page)
    context.close()
    print("PASS reduced motion: static fallback retains all destinations")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--screenshots", action="store_true", help="write desktop and phone review PNGs")
    args = parser.parse_args()

    with static_server() as base_url, sync_playwright() as playwright:
        assert_social_card(base_url)
        browser = playwright.chromium.launch(headless=True, executable_path=shutil.which("chromium"))
        try:
            assert_desktop(browser, base_url, args.screenshots)
            assert_mobile(browser, base_url, args.screenshots)
            assert_reduced_motion(browser, base_url)
        finally:
            browser.close()

    print("PASS public-browser launchpad regression suite")


if __name__ == "__main__":
    main()

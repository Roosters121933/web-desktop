# Your Desktop: Hybrid Home

The home page is an original dashboard with a live clock, three switchable scenes, app/game search, recent launches, a dock, and a direct web-search link. It connects to the existing MIT-licensed YukiOS desktop at [desktop.html](desktop.html), which provides the game library, apps, and window management. No CineOS code, artwork, or game collection has been copied or embedded. The CineOS card opens the original site in a separate tab because its proprietary license forbids copying, modification, and framing.

The twelve-game New Discoveries collection was removed at the owner's request. Its catalog is empty, its old browse URL returns home, and stale saved collections are cleaned when the Yuki library opens. Other saved games and settings are retained.

## Files and integration

- index.html, hybrid.css, hybrid.js: original home and launchpad
- hybrid-bridge.js: same-origin, same-window message bridge and retired-collection cleanup
- library-index.json: search index of existing Yuki titles, generated from the imported upstream gamesList.js
- desktop.html and assets/: compiled YukiOS workspace, with creator credit and MIT notice retained
- game-launcher.html: existing direct HTTPS game preview with a new-tab fallback; no proxy forwarding

The workspace loads only when opened. Sign in as Guest there; a queued launch runs once the session is ready. Returning Home keeps the workspace loaded. App requests are limited to registered game IDs and a fixed set of system apps. Bridge messages require the exact parent/child window and matching origin. Home preferences and recent shortcuts are stored on this device. Web searches open DuckDuckGo directly in a new tab.

Publish the root files and updated assets with GitHub Pages from main / (root). No build step is needed to run the site. Do not rerun the old upstream importer without preserving the hybrid bridge hooks and desktop.html. Local source preparation is recorded in work/prepare-hybrid.cjs and work/build-hybrid-index.cjs in the parent workspace.

## Attribution

YukiOS by Reeyuki and contributors: https://github.com/Reeyuki/YukiOS . MIT license, Copyright (c) 2026 YukiOS. See LICENSE-YukiOS.txt and credits.html. Individual games and connected services retain their own owners and terms; the desktop license is not a license to their content. The game library continues loading its existing external providers. No game archives, ROMs, or commercial binaries have been added. This site is not affiliated with CineOS, Valve, or Steam.

## First version, preserved at classic.html

An original browser desktop built with plain HTML, CSS, and JavaScript. Rename it in Settings whenever you like.

## What works

- Move, resize, maximize, minimize, and close app windows.
- Launch Starfall (space survival), Neon Snake, and Signal Match (memory pairs).
- Browse the game library or search the app launcher.
- Open HTTPS website previews, with a direct link for sites that require their own tab.
- Write notes, export them as text, and personalize the wallpaper and accent color.
- Save notes, game records, and appearance preferences on the current device.

Games pause when their window loses focus, is minimized, or the page is hidden. Their animation and input handlers are removed when the window closes.

## Run it

Open `index.html` in a browser, or serve this folder with any static web server. There are no build steps or packages to install. Fonts use Google Fonts when available and fall back to system fonts offline.

## Publish with GitHub Pages

Upload the files in this folder to the root of a public GitHub repository. In **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/(root)**, and save. GitHub displays the website URL when deployment finishes.

## Edit it

- `index.html`: desktop structure and welcome text
- `styles.css`: interface, wallpapers, and responsive layout
- `app.js`: window manager and apps
- `games.js`: all three original games
- `core.js`: address validation, storage helper, and Snake movement rules

Website previews depend on the destination's embedding policy. This is a web desktop, not a full browser engine or a PC/console emulator. It includes no proxy or network-filter bypass. The game code, icons, and wallpaper were written for this project; no Cine-OS source or assets are included.

Browser storage is local to each browser and may be cleared. Export important notes. There is no account system or cloud sync in this first version.

# Your Desktop: YukiOS Edition

The current home page uses the YukiOS browser desktop and game library created by **Reeyuki and the YukiOS contributors**. Original source: https://github.com/Reeyuki/YukiOS . MIT license, Copyright (c) 2026 YukiOS. See [LICENSE-YukiOS.txt](LICENSE-YukiOS.txt) and [credits.html](credits.html).

The copied build is already compiled. Publish this folder with GitHub Pages from **main / (root)**, or serve it with a static web server. Click the lock screen, sign in as Guest, complete or skip optional setup, and open **Yuki Steam → Library**.

We adapted asset and preload URLs for GitHub Pages, removed the original deployment's Cloudflare beacon, disabled its original automatic service worker registration, and added a visible creator-credit link. The import is recorded in [YUKIOS-IMPORT.json](YUKIOS-IMPORT.json). Offline operation is not promised.

The local `game-launcher.html` launcher embeds the selected HTTPS game directly. It does not use the upstream proxy or forward navigation targets to another helper service. Games that refuse embedding can open through its direct link. Some upstream proxy-dependent apps therefore have limited functionality in this edition.

Individual games, artwork, trademarks, and connected services have their own owners and licenses. The YukiOS MIT license does not grant rights to the games listed in the catalog. The library loads games from external providers. No game archives, ROMs, or commercial game binaries are included here. Not every listed app or title has been tested. This project is not affiliated with Valve or Steam.

For substantial changes to YukiOS, use its original source repository and development guide. The imported assets here are a compiled deployment snapshot.

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

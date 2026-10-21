# Your Desktop — working title

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

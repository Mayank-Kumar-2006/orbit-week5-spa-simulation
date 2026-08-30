# Orbit — Week 5 SPA Simulation

A small-scale Single Page Application simulation built with semantic HTML, CSS and vanilla JavaScript.

## Files

- `index.html` — application shell
- `style.css` — responsive visual system
- `script.js` — routing, dynamic rendering and state management
- `README.md` — documentation
- `Week_5_SPA_Task_Report.docx` — internship submission report

## SPA features

- Client-side routing using URL hash routes
- Dynamic view rendering without full page reloads
- Overview, Projects, Activity and Settings views
- Browser back/forward support
- Unknown-route / 404 state
- Project search with live DOM updates
- Client-side settings state
- Profile dialog using the native `<dialog>` element
- Toast feedback
- Responsive layout
- Keyboard focus states and skip link
- Reduced-motion support

## Routes

- `#/` — Overview
- `#/projects` — Projects
- `#/activity` — Activity
- `#/settings` — Settings

## How to run

Open `index.html` in a modern browser. No build tools, npm packages or framework are required.

For a deployed SPA, configure the host to serve `index.html` for application routes. This demo uses hash routing so it can also work when opened directly as a local file.

## Architecture

The application has one persistent HTML shell. JavaScript reads the current route, selects a renderer, and replaces the contents of the `#app` container. Route changes use the History API/hash navigation pattern, so users can move between views without requesting a new HTML document.

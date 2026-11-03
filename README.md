# INACC Event Itinerary

A small React app that shows the itinerary for the INACC event (about 450 participants).
Each participant has an ID from `001` to `450`. The ID is printed on their card as a QR code that
opens a link such as `https://<your-deployed-app>/001`.

**Status:** itinerary for its own set of participants (mobile-only design), an independent project with its own repository and deployment. Content comes from the second tab of the official
Google Sheet and lives only in `src/data/itinerary.js`. See `VERIFICATION.md` for the sheet comparison. Attendance is not part of this version.
Days 4-5 show a single schedule because the sheet has no Group 1 / Group 2 split; the participant-to-group
integration point is `src/participant/group.js` (currently returns `null`).

## Technology

- React 19 and Vite 8 (build tool and dev server)
- React Router 7 (`react-router-dom`) for the URLs
- Vitest and Testing Library for tests
- oxlint for code checking

No backend, database, login, or QR code generation.

## Features

- `/001` to `/450` open the itinerary. The participant ID is available inside the page.
- `/` opens the itinerary.
- Any other URL also opens the itinerary (the lead's intended behaviour).
- Five days (Day 1 to Day 5). Click a day to see its content.

## How the URLs work

The routes live in `src/App.jsx`:

| URL | What happens |
|---|---|
| `/001` ... `/450` | Itinerary, with the participant ID available. |
| `/000`, `/451`, `/999`, `/1`, `/01`, `/abc`, `/4500` | Itinerary, **without** a participant ID, plus a short "ID not recognised" message. |
| `/` | Itinerary, no participant ID, no message. |
| anything else, e.g. `/a/b`, `/001/extra` | Itinerary, no participant ID, no message. |

Nothing redirects. The URL in the address bar never changes.

### Why validation is needed

In React Router, the route `/:participantId` means "any single piece of text after the slash".
So `/abc` and `/000` match it just like `/001` does. The route cannot tell them apart by itself,
so the code checks the ID (`src/participant/participantId.js`):

- exactly three digits (`0`-`9`), and
- a number from 1 to 450.

The ID is always kept as **text** (`"001"`), never converted to a number, so the leading zeros survive.

### Using the participant ID later

Inside any component, call the hook:

```jsx
import { useParticipantId } from '../participant/useParticipantId.js'

const { participantId, isInvalid } = useParticipantId()
// participantId is "001" .. "450" (a string), or null when there is no valid ID
```

`ItineraryPage` already does this and shows the ID. That line ("Participant ID: ...") is temporary.

### The routing code your lead provided

It is used as the base. Differences from the original, and why:

1. Same three routes (`/:participantId`, `/`, `*`), each showing `ItineraryPage`.
2. `ItineraryPage` lives at `src/pages/ItineraryPage.jsx` (as in the lead's import).
3. The ID is checked inside `ItineraryPage` through `useParticipantId`, because the route alone accepts any single word.
4. The routes are in an exported `AppRoutes` component so tests can use them without a real browser.

## Project structure

```
src/
  main.jsx                      Starts the app
  App.jsx                       The three routes
  index.css                     Global styles (from the Vite template)
  pages/
    ItineraryPage.jsx           The temporary page: heading, ID, day buttons
    ItineraryPage.css           Minimal temporary styling
    ItineraryPage.test.jsx      Tests for the page
  data/
    itinerary.js                Placeholder days. Edit this file to add real content later
  participant/
    participantId.js            isValidParticipantId(): the 001-450 rule
    participantId.test.js       Tests for the rule
    useParticipantId.js         Hook that gives a component the ID from the URL
  routing.test.jsx              Tests for the URLs
public/favicon.svg              Browser tab icon
index.html                      The single HTML page the app runs in
vite.config.js                  Vite and test settings
package.json                    Dependencies and commands
```

## Run it on your computer

You need Node.js 22.12 or newer.

```bash
npm install        # once; downloads dependencies
npm run dev        # then open http://localhost:5173/001
```

Other commands:

```bash
npm test           # run the automated tests
npm run lint       # check the code
npm run build      # make the production version in dist/
npm run preview    # serve dist/ locally at http://localhost:4173/ (test the production build)
```

## Deploying to Railway

Railway builds the app from a GitHub repository. Nothing in this repo deploys anything by itself.

1. Put the project on GitHub (next section).
2. Sign in at railway.com. Choose **New Project** > **Deploy from GitHub repo** and pick the repository.
3. Railway detects a Vite app (it finds `vite.config.js`), runs `npm run build`, and serves the `dist` folder as a static site. No start command and no environment variables are needed. Do **not** set a custom start command: that turns off the automatic static hosting.
4. In the service, open **Settings** > **Networking** > **Generate Domain**. That gives you the public address. Use it for the QR codes once the lead confirms it.
5. Test on the live address: open `/001`, then refresh the browser. Do the same for `/450` and `/`. All must show the itinerary.

### Why refresh needs special hosting

This app uses `BrowserRouter`, so `/001` is not a real file on the server. Only `index.html` exists.
When someone opens or refreshes `/001`, the server must answer with `index.html`, and then React Router reads the URL and shows the right page. A server that does not do this returns "404 Not Found" for `/001`.
`npm run dev` and `npm run preview` already do this. Railway's automatic static hosting is expected to do it too, but **this was not tested on Railway** (no deployment was made). Step 5 above is the check.

If `/001` shows a 404 after refreshing on Railway, add a file named `Caddyfile` in the project root, based on Railway's own guide (https://docs.railway.com/guides/spa-routing-configuration). Its key line is `try_files {path} /index.html`.

## Uploading to GitHub

Do this yourself, once, from the project folder:

1. On github.com, create a **new empty** repository (no README, no .gitignore). Do not reuse an existing repository.
2. In a terminal, in the project folder:

```bash
git init
git add .
git status          # check: node_modules and dist must NOT be listed
git commit -m "INACC event itinerary: routing and temporary itinerary page"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

`.gitignore` already keeps `node_modules`, `dist`, `.env` files, logs and `.DS_Store` out of the repository. This project needs no secrets. Never put passwords or keys in the code.

## Known limitations (temporary version)

- The selected day is not remembered: refreshing goes back to Day 1.
- Group 1 / Group 2 itineraries (Days 4 and 5) are not implemented. How an ID maps to a group is not decided.
- A missing file such as `/missing.js` returns the app page instead of a 404 on most static hosts. This is normal for single-page apps.


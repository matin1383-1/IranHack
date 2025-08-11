# IranHack

Minimal static frontend for a platform of hackathons in Iran. RTL Persian UI, responsive, with light/dark mode.

## Structure
- `public/index.html`: Landing page
- `public/hackathons.html`: List and filters
- `public/event.html`: Event details (sample)
- `public/assets/styles.css`: Minimal CSS (no build step)
- `public/assets/app.js`: Theme toggle + small UX utilities

## Run locally
Open `public/index.html` in a browser, or serve the folder:

```bash
cd public
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

## Customize
- Replace sample cards with dynamic data or your backend/API.
- Colors: edit gradient in `.btn-primary` and badge colors in `styles.css`.
- Persian font is via Google Fonts (`Vazirmatn`). Replace if needed.

## License
MIT

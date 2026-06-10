**Weather Dashboard**

A small, responsive weather dashboard built with React and Vite. It fetches current weather and short-term forecast data (OpenWeatherMap) and displays a clean, component-driven UI with a search bar, unit toggle, and highlights.

Features
- Search current weather by city
- 5-day / 3-hour forecast view
- Unit toggle (metric / imperial)
- Responsive layout and weather icons

Demo
- Build and run locally (see Setup).

Contents
- **Installation & Setup** — how to run the project locally
- **Project structure** — overview of the important files and folders
- **Environment** — where to put your API key and how to secure it
- **Scripts** — available npm scripts
- **Development notes** — how the app fetches data and recommended improvements
- **Contributing** — quick guidelines

Prerequisites
- Node.js 16+ (LTS recommended)
- npm (or yarn / pnpm)

Quick start
1. Clone the repo:

```bash
git clone <repo-url>
cd weather-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create an environment file with your OpenWeatherMap API key. The project currently uses a hardcoded demo key in the source; for security, add a Vite env variable instead (see Environment section).

Create a file named `.env` at the project root and add:

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

4. Run the dev server:

```bash
npm run dev
```

Available scripts
- `npm run dev` — start Vite dev server with HMR
- `npm run build` — build production assets
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint

Project structure

- public/
- src/
  - assets/ — images and static assets
  - components/
    - Dashboard/
      - Dashboard.jsx
    - Forecast/
      - Forecast.jsx
    - Highlights/
      - Highlights.jsx
    - IconHelpers/
      - IconHelpers.jsx
    - Loading/
      - Loading.jsx
    - SearchBar/
      - SearchBar.jsx
    - UnitToggle/
      - UnitToggle.jsx
    - WeatherCard/
      - WeatherCard.jsx
  - hooks/
    - useWeather.js
  - services/
    - weatherService.js
  - styles/ — component CSS files
  - utils/
    - constants.js
  - main.jsx
  - App.jsx

Notes on environment / API key
- The repository currently contains a demo API key in `src/services/weatherService.js`. Do not commit a private or production API key — instead:

1. Replace the hardcoded key by reading from `import.meta.env.VITE_OPENWEATHER_API_KEY`.

Example change (recommended):

```js
// src/services/weatherService.js
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

2. Add `.env` to your `.gitignore` so keys are not committed.

If you need to rotate or remove the existing key in source, replace the hardcoded value and commit the change.

How the app fetches weather
- The app uses `axios` to call OpenWeatherMap endpoints via `src/services/weatherService.js`.
- The service exposes `getCurrentWeather`, `getForecast`, and `getWeatherByCoords` helpers.

Development tips
- Add stronger error handling and user-facing messages for network/API errors.
- Cache recent searches in localStorage to reduce API calls.
- Add unit and integration tests for `useWeather` and `weatherService`.

Contributing
- Fork the repository and open a pull request with a descriptive title.
- Keep changes focused and add unit tests for new logic where possible.

License
- Add a license (e.g., MIT) by creating a `LICENSE` file.

Acknowledgements
- Built with Vite + React. Weather data provided by OpenWeatherMap (https://openweathermap.org).

Contact
- Questions or improvements: open an issue or submit a PR.

---

If you'd like, I can also:
- Update `src/services/weatherService.js` to read the key from `import.meta.env` and add `.env` to `.gitignore`.
- Add a short demo GIF or screenshots to the `README`.

Tell me which of these you'd like next.

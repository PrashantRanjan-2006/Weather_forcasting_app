# Weather Studio (Next.js)

Modern weather forecasting UI built with Next.js App Router, Tailwind CSS, Framer Motion, Lucide icons, and Recharts.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Set your API key in `.env`:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

3. Start development server:

```bash
npm run dev
```

4. Open `http://localhost:3000` (or the next available port shown in terminal).

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Current Project Structure

```text
weather app/
|- app/
|  |- globals.css
|  |- layout.js
|  |- page.js
|- components/
|  |- ErrorState.jsx
|  |- FavoriteCities.jsx
|  |- ForecastCard.jsx
|  |- HourlyChart.jsx
|  |- LoadingSkeleton.jsx
|  |- MetricCard.jsx
|  |- SearchBar.jsx
|  |- ThemeToggle.jsx
|  |- WeatherBackground.jsx
|  |- WeatherCard.jsx
|- hooks/
|  |- useFavorites.js
|- lib/
|  |- cities.js
|  |- utils.js
|  |- weather.js
|- public/
|  |- weather-bg.svg
|- .env
|- .env.example
|- jsconfig.json
|- next.config.js
|- package.json
|- postcss.config.js
|- tailwind.config.js
```

## Notes

1. This app uses live OpenWeather data only (no demo fallback).
2. Date/time rendering is adjusted for the searched city's timezone.
3. Favorites are stored in browser localStorage.

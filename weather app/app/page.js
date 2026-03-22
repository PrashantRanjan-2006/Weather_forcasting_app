'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, ThermometerSun } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import MetricCard from '@/components/MetricCard';
import HourlyChart from '@/components/HourlyChart';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorState from '@/components/ErrorState';
import FavoriteCities from '@/components/FavoriteCities';
import ThemeToggle from '@/components/ThemeToggle';
import WeatherBackground from '@/components/WeatherBackground';
import { getWeatherBundle } from '@/lib/weather';
import { weatherThemeByCondition, cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/useFavorites';

export default function HomePage() {
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const { favorites, favoriteSet, toggleFavorite, removeFavorite } = useFavorites();

  const currentTheme = useMemo(() => {
    if (!bundle?.current?.description) return 'night';
    return weatherThemeByCondition(bundle.current.description);
  }, [bundle]);

  const searchCity = async (city) => {
    setLoading(true);
    setError('');

    try {
      const result = await getWeatherBundle(city);
      setBundle(result);
    } catch (err) {
      setError(err.message || 'Unable to fetch weather details for this city.');
    } finally {
      setLoading(false);
    }
  };

  const weather = bundle?.current;

  return (
    <main className={cn(darkMode ? 'dark' : '', 'min-h-screen px-4 py-6 md:px-8 md:py-10')}>
      <WeatherBackground theme={currentTheme} darkMode={darkMode} />

      <div className="mx-auto max-w-6xl space-y-5">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">Weather Studio</h1>
            <p className="mt-1 text-sm text-white/75">Modern weather forecasting with dynamic experiences</p>
          </div>
          <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />
        </motion.header>

        <SearchBar onSearch={searchCity} loading={loading} />

        <FavoriteCities
          favorites={favorites}
          onPick={searchCity}
          onRemove={removeFavorite}
        />

        {loading && <LoadingSkeleton />}

        {!loading && error && <ErrorState message={error} onRetry={() => setError('')} />}

        {!loading && !error && weather && (
          <section className="space-y-4">
            <WeatherCard
              weather={weather}
              isFavorite={favoriteSet.has(weather.city)}
              onToggleFavorite={toggleFavorite}
            />

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <MetricCard title="Humidity" value={weather.humidity} unit="%" icon={Droplets} accent="text-cyan-200" />
              <MetricCard title="Wind" value={weather.windSpeed} unit="m/s" icon={Wind} accent="text-blue-100" />
              <MetricCard title="Pressure" value={weather.pressure} unit="hPa" icon={Gauge} accent="text-indigo-100" />
              <MetricCard title="Feels Like" value={Math.round(weather.feelsLike)} unit="°C" icon={ThermometerSun} accent="text-yellow-100" />
            </div>

            <HourlyChart data={bundle.hourly} />

            <section className="glass-card rounded-3xl p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold uppercase tracking-[0.15em] text-white/80">7-Day Forecast</h3>
                <p className="text-xs text-white/70">Scroll horizontally</p>
              </div>

              <div className="forecast-scroll flex gap-3 overflow-x-auto pb-2">
                {bundle.daily.map((day, index) => (
                  <ForecastCard key={`${day.day}-${index}`} day={day} index={index} />
                ))}
              </div>
            </section>
          </section>
        )}

        {!loading && !error && !weather && (
          <section className="glass-card rounded-3xl p-10 text-center text-white">
            <p className="text-lg font-semibold">Start by searching for a city.</p>
            <p className="mt-1 text-sm text-white/75">
              Live weather is powered by your OpenWeather API key.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

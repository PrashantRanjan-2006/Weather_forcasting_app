'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, StarOff } from 'lucide-react';
import { toLocalDateTime } from '@/lib/utils';

export default function WeatherCard({ weather, isFavorite, onToggleFavorite }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/75">Now</p>
          <h2 className="mt-2 text-4xl font-black md:text-6xl">{Math.round(weather.temp)}°C</h2>
          <p className="mt-1 text-base capitalize text-white/85">{weather.description}</p>

          <div className="mt-4 space-y-1 text-sm text-white/70">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {weather.city}, {weather.country}
            </p>
            <p>{toLocalDateTime(weather.timestamp, weather.timezoneOffset)}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <motion.img
            src={iconUrl}
            alt={weather.description}
            className="h-28 w-28"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onToggleFavorite(weather.city)}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-3 py-2 text-xs font-semibold text-white hover:bg-white/30"
          >
            {isFavorite ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
            {isFavorite ? 'Saved' : 'Save City'}
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

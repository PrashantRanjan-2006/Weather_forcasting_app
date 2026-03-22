'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const themes = {
  sunny: 'bg-gradient-sunny-sky',
  rainy: 'bg-gradient-rainy-sky',
  cloudy: 'bg-gradient-cloudy-sky',
  night: 'bg-gradient-night-sky',
};

export default function WeatherBackground({ theme = 'night', darkMode = true }) {
  const gradient = themes[theme] || themes.night;

  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden transition-colors duration-700', gradient)}>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ opacity: darkMode ? 0.34 : 0.5 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: "url('/weather-bg.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ opacity: darkMode ? 0.45 : 0.24 }}
        transition={{ duration: 0.8 }}
        style={{ background: 'radial-gradient(circle at 15% 15%, rgba(255,255,255,0.6), transparent 30%)' }}
      />

      {theme === 'sunny' && (
        <motion.div
          aria-hidden
          className="absolute right-16 top-14 h-56 w-56 rounded-full bg-yellow-300/60 blur-3xl"
          animate={{ scale: [1, 1.07, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {theme === 'rainy' &&
        Array.from({ length: 20 }).map((_, index) => (
          <span
            key={`rain-${index}`}
            className="rain-line"
            style={{
              left: `${(index + 1) * 5}%`,
              top: `${(index % 5) * -12}%`,
              animationDelay: `${(index % 6) * 0.2}s`,
            }}
          />
        ))}

      {theme === 'cloudy' && (
        <>
          <motion.div
            aria-hidden
            className="absolute left-8 top-16 h-28 w-72 rounded-full bg-white/35 blur-2xl"
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 14, repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="absolute right-8 top-36 h-24 w-64 rounded-full bg-white/30 blur-2xl"
            animate={{ x: [0, -30, 0] }}
            transition={{ duration: 16, repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
}

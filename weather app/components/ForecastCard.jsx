'use client';

import { motion } from 'framer-motion';

export default function ForecastCard({ day, index = 0 }) {
  const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card min-w-[148px] rounded-2xl p-4 text-white"
    >
      <p className="text-sm font-semibold tracking-wide text-white/80">{day.day}</p>
      <img src={iconUrl} alt={day.description} className="mx-auto h-14 w-14" />
      <p className="text-xs capitalize text-white/80">{day.description}</p>
      <p className="mt-2 text-sm font-semibold">{Math.round(day.max)}° / {Math.round(day.min)}°</p>
    </motion.article>
  );
}

'use client';

import { motion } from 'framer-motion';

export default function MetricCard({ title, value, unit, icon: Icon, accent = 'text-white' }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-4 text-white"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">{title}</p>
          <p className="mt-2 text-2xl font-bold">
            {value}
            <span className="ml-1 text-base font-medium text-white/70">{unit}</span>
          </p>
        </div>
        <div className={`rounded-xl bg-white/15 p-2 ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.article>
  );
}

'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function HourlyChart({ data = [] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-4 md:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold uppercase tracking-[0.15em] text-white/80">Hourly Forecast</h3>
        <p className="text-xs text-white/70">Next 24 hours</p>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: -18, right: 12, top: 10, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
            <XAxis dataKey="time" tick={{ fill: '#e8efff', fontSize: 11 }} interval={2} />
            <YAxis tick={{ fill: '#e8efff', fontSize: 11 }} unit="°" />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 20, 56, 0.85)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 12,
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#f7e39c"
              strokeWidth={3}
              dot={{ fill: '#fff', r: 2 }}
              activeDot={{ r: 5, fill: '#ffe082' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}

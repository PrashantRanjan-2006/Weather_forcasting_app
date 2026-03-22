'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 text-center text-white"
    >
      <AlertTriangle className="mx-auto h-10 w-10 text-amber-300" />
      <p className="mt-3 text-base font-semibold">City not found</p>
      <p className="mt-1 text-sm text-white/75">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/30"
      >
        Try again
      </button>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onToggle}
      type="button"
      className="glass-card inline-flex h-11 w-11 items-center justify-center rounded-xl text-white"
      aria-label="toggle-theme"
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </motion.button>
  );
}

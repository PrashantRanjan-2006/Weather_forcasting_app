'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function FavoriteCities({ favorites, onPick, onRemove }) {
  return (
    <AnimatePresence>
      {favorites.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="glass-card rounded-2xl p-4"
        >
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
            <Star className="h-4 w-4" /> Favorites
          </h3>

          <div className="flex flex-wrap gap-2">
            {favorites.map((city) => (
              <div key={city} className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-sm text-white">
                <button type="button" onClick={() => onPick(city)} className="hover:underline">
                  {city}
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(city)}
                  className="ml-1 rounded-full bg-white/20 px-2 text-xs hover:bg-white/35"
                  aria-label={`remove-${city}`}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

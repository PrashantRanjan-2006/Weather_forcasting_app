'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { citySuggestions } from '@/lib/cities';
import { cn } from '@/lib/utils';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return citySuggestions.slice(0, 7);

    return citySuggestions
      .filter((city) => city.toLowerCase().includes(value))
      .slice(0, 7);
  }, [query]);

  const submitSearch = (city) => {
    const value = city.trim();
    if (!value || loading) return;
    onSearch(value);
    setQuery(value);
    setFocused(false);
  };

  return (
    <div className="relative">
      <div className="glass-card rounded-2xl p-2 md:p-3">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-white/80" />
          <input
            className={cn(
              'w-full bg-transparent px-2 py-2 text-base text-white placeholder:text-white/65 outline-none',
              'md:text-lg'
            )}
            placeholder="Search city..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitSearch(query);
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={() => submitSearch(query)}
            className="rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
          >
            Go
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {focused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-card absolute left-0 right-0 top-[calc(100%+10px)] z-30 rounded-2xl p-2"
          >
            {suggestions.map((city) => (
              <button
                key={city}
                onClick={() => submitSearch(city)}
                type="button"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-white transition hover:bg-white/15"
              >
                <MapPin className="h-4 w-4" />
                {city}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

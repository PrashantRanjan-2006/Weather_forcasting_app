import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'weather.favoriteCities';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const addFavorite = (city) => {
    const trimmed = city.trim();
    if (!trimmed) return;
    setFavorites((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  };

  const removeFavorite = (city) => {
    setFavorites((prev) => prev.filter((item) => item !== city));
  };

  const toggleFavorite = (city) => {
    if (favoriteSet.has(city)) {
      removeFavorite(city);
      return;
    }
    addFavorite(city);
  };

  return {
    favorites,
    favoriteSet,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}

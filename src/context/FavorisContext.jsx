import { createContext, useContext, useState, useEffect } from 'react';

const FavorisContext = createContext(null);

export function FavorisProvider({ children }) {
  const [favoris, setFavoris] = useState(() => {
    try {
      const stored = localStorage.getItem('seriesn_favoris');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('seriesn_favoris', JSON.stringify(favoris));
  }, [favoris]);

  const ajouterFavori = (serie) => {
    setFavoris((prev) =>
      prev.find((f) => f.id === serie.id) ? prev : [...prev, serie]
    );
  };

  const retirerFavori = (id) => {
    setFavoris((prev) => prev.filter((f) => f.id !== id));
  };

  const estFavori = (id) => favoris.some((f) => f.id === id);

  return (
    <FavorisContext.Provider value={{ favoris, ajouterFavori, retirerFavori, estFavori }}>
      {children}
    </FavorisContext.Provider>
  );
}

export function useFavoris() {
  const ctx = useContext(FavorisContext);
  if (!ctx) throw new Error('useFavoris must be used within FavorisProvider');
  return ctx;
}

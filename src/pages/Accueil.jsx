import { useState, useMemo } from 'react';
import seriesData from '../data/series.json';
import SerieCard from '../components/SerieCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const PAGE_SIZE = 12;

export default function Accueil() {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedChaine, setSelectedChaine] = useState('');
  const [page, setPage] = useState(1);

  const allGenres = useMemo(() => {
    const set = new Set();
    seriesData.forEach((s) => s.genre.forEach((g) => set.add(g)));
    return [...set].sort();
  }, []);

  const allChaines = useMemo(() => {
    return [...new Set(seriesData.map((s) => s.chaine))].sort();
  }, []);

  const filtered = useMemo(() => {
    return seriesData.filter((s) => {
      const matchSearch = s.titre.toLowerCase().includes(search.toLowerCase());
      const matchGenre = selectedGenre === '' || s.genre.includes(selectedGenre);
      const matchChaine = selectedChaine === '' || s.chaine === selectedChaine;
      return matchSearch && matchGenre && matchChaine;
    });
  }, [search, selectedGenre, selectedChaine]);

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <main className="accueil">
      <section className="accueil__hero">
        <h1 className="accueil__hero-title">
          Découvrez les <em>meilleures séries</em><br />sénégalaises
        </h1>
        
      </section>

      <section className="accueil__controls">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        <FilterBar
          genres={allGenres}
          chaines={allChaines}
          selectedGenre={selectedGenre}
          selectedChaine={selectedChaine}
          onGenreChange={handleFilterChange(setSelectedGenre)}
          onChaineChange={handleFilterChange(setSelectedChaine)}
        />
      </section>

      <section className="accueil__results">
        <p className="accueil__count">
          <strong>{filtered.length}</strong> série{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <div className="accueil__empty">
            <span className="accueil__empty-icon">🎭</span>
            <p>Aucune série ne correspond à votre recherche.</p>
            <button
              className="btn btn--secondary"
              onClick={() => { setSearch(''); setSelectedGenre(''); setSelectedChaine(''); }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div className="series-grid">
              {paginated.map((serie) => (
                <SerieCard key={serie.id} serie={serie} />
              ))}
            </div>
            {hasMore && (
              <div className="accueil__more">
                <button
                  className="btn btn--primary"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Voir plus ({filtered.length - paginated.length} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

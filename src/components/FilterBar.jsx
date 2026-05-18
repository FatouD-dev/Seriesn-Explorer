import { useState } from 'react';

export default function FilterBar({ genres, chaines, selectedGenre, selectedChaine, onGenreChange, onChaineChange }) {
  const [openGenre, setOpenGenre] = useState(false);
  const [openChaine, setOpenChaine] = useState(false);

  return (
    <div className="filter-bar">

      <div className="filter-group">
        <label className="filter-label">Genre</label>
        <div className="genre-dropdown">
          <button
            className="filter-btn filter-btn--toggle"
            onClick={() => { setOpenGenre(!openGenre); setOpenChaine(false); }}
          >
            {selectedGenre || 'Tous les genres'} ▾
          </button>
          {openGenre && (
            <div className="genre-dropdown__panel">
              <button
                className={`filter-btn ${selectedGenre === '' ? 'filter-btn--active' : ''}`}
                onClick={() => { onGenreChange(''); setOpenGenre(false); }}
              >
                Tous
              </button>
              {genres.map((g) => (
                <button
                  key={g}
                  className={`filter-btn ${selectedGenre === g ? 'filter-btn--active' : ''}`}
                  onClick={() => { onGenreChange(g); setOpenGenre(false); }}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Chaîne</label>
        <div className="genre-dropdown">
          <button
            className="filter-btn filter-btn--toggle"
            onClick={() => { setOpenChaine(!openChaine); setOpenGenre(false); }}
          >
            {selectedChaine || 'Toutes les chaînes'} ▾
          </button>
          {openChaine && (
            <div className="genre-dropdown__panel">
              <button
                className={`filter-btn ${selectedChaine === '' ? 'filter-btn--active' : ''}`}
                onClick={() => { onChaineChange(''); setOpenChaine(false); }}
              >
                Toutes
              </button>
              {chaines.map((c) => (
                <button
                  key={c}
                  className={`filter-btn ${selectedChaine === c ? 'filter-btn--active' : ''}`}
                  onClick={() => { onChaineChange(c); setOpenChaine(false); }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
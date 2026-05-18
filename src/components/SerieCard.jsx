import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useFavoris } from '../context/FavorisContext';

export default function SerieCard({ serie }) {
  const { estFavori, ajouterFavori, retirerFavori } = useFavoris();
  const favori = estFavori(serie.id);

  const handleFavori = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favori) {
      retirerFavori(serie.id);
    } else {
      ajouterFavori(serie);
    }
  };

  return (
    <Link to={`/serie/${serie.id}`} className="serie-card" aria-label={`Voir les détails de ${serie.titre}`}>
      <div className="serie-card__image-wrapper">
        <img
          src={serie.image}
          alt={serie.titre}
          className="serie-card__image"
          loading="lazy"
        />
        <div className="serie-card__overlay">
          {serie.enCours && (
            <span className="serie-card__badge serie-card__badge--encours">En cours</span>
          )}
          <button
            className={`serie-card__fav-btn ${favori ? 'serie-card__fav-btn--active' : ''}`}
            onClick={handleFavori}
            aria-label={favori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {favori ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <div className="serie-card__body">
        <div className="serie-card__meta">
          <span className="serie-card__chaine">{serie.chaine}</span>
          <span className="serie-card__annee">{serie.annee}</span>
        </div>
        <h3 className="serie-card__titre">{serie.titre}</h3>
        <StarRating note={serie.note} />
        <div className="serie-card__genres">
          {serie.genre.slice(0, 2).map((g) => (
            <span key={g} className="serie-card__genre-tag">
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

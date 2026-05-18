import { Link } from 'react-router-dom';
import { useFavoris } from '../context/FavorisContext';
import SerieCard from '../components/SerieCard';

export default function Favoris() {
  const { favoris } = useFavoris();

  return (
    <main className="favoris">
      <div className="favoris__header">
        <h1 className="favoris__title">
          Mes Favoris
          {favoris.length > 0 && (
            <span className="favoris__count">{favoris.length}</span>
          )}
        </h1>
        <p className="favoris__subtitle">
          {favoris.length > 0
            ? 'Vos séries sénégalaises préférées, toujours à portée de clic.'
            : 'Votre collection personnelle de séries sénégalaises.'}
        </p>
      </div>

      {favoris.length === 0 ? (
        <div className="favoris__empty">
          <span className="favoris__empty-icon">💛</span>
          <h2 className="favoris__empty-title">Votre liste est vide</h2>
          <p className="favoris__empty-text">
            Explorez le catalogue et ajoutez vos séries préférées en cliquant sur le cœur ♡
          </p>
          <Link to="/" className="btn btn--primary">
            Découvrir les séries
          </Link>
        </div>
      ) : (
        <div className="series-grid">
          {favoris.map((serie) => (
            <SerieCard key={serie.id} serie={serie} />
          ))}
        </div>
      )}
    </main>
  );
}

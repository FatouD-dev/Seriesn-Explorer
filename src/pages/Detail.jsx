import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import seriesData from '../data/series.json';
import StarRating from '../components/StarRating';
import Loader from '../components/Loader';
import { useFavoris } from '../context/FavorisContext';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { estFavori, ajouterFavori, retirerFavori } = useFavoris();

  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userNote, setUserNote] = useState(null);

  useEffect(() => {
    setLoading(true);
    setSerie(null);

    const timer = setTimeout(() => {
      const found = seriesData.find((s) => s.id === parseInt(id, 10));
      setSerie(found || null);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <Loader message="Chargement de la série..." />;

  if (!serie) {
    return (
      <div className="error-page">
        <div className="error-page__content">
          <span className="error-page__icon">🎬</span>
          <h2 className="error-page__title">Série introuvable</h2>
          <p className="error-page__message">
            La série avec l'identifiant <strong>#{id}</strong> n'existe pas dans notre catalogue.
          </p>
          <Link to="/" className="btn btn--primary">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const favori = estFavori(serie.id);
  const noteAffichee = userNote !== null ? userNote : serie.note;

  const handleFavori = () => {
    if (favori) retirerFavori(serie.id);
    else ajouterFavori(serie);
  };

  return (
    <main className="detail">
      <button className="detail__back-btn" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="detail__layout">
        <aside className="detail__aside">
          <div className="detail__poster-wrapper">
            <img
              src={serie.image}
              alt={`Affiche de ${serie.titre}`}
              className="detail__poster"
            />
            {serie.enCours && (
              <span className="detail__badge">EN COURS</span>
            )}
          </div>

          <button
            className={`btn detail__fav-btn ${favori ? 'btn--danger' : 'btn--primary'}`}
            onClick={handleFavori}
          >
            {favori ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris'}
          </button>
        </aside>

        <div className="detail__content">
          <div className="detail__header">
            <span className="detail__chaine">{serie.chaine}</span>
            <span className="detail__annee">{serie.annee}</span>
          </div>

          <h1 className="detail__titre">{serie.titre}</h1>

          <div className="detail__rating">
            <StarRating
              note={noteAffichee}
              interactive={true}
              onRate={setUserNote}
            />
            {userNote && (
              <span className="detail__rating-label">Votre note : {userNote}/5</span>
            )}
          </div>

          <div className="detail__genres">
            {serie.genre.map((g) => (
              <span key={g} className="detail__genre-tag">
                {g}
              </span>
            ))}
          </div>

          <div className="detail__stats">
            <div className="detail__stat">
              <span className="detail__stat-label">Saisons</span>
              <span className="detail__stat-value">{serie.saisons}</span>
            </div>
            <div className="detail__stat">
              <span className="detail__stat-label">Année</span>
              <span className="detail__stat-value">{serie.annee}</span>
            </div>
            <div className="detail__stat">
              <span className="detail__stat-label">Chaîne</span>
              <span className="detail__stat-value">{serie.chaine}</span>
            </div>
          </div>

          <section className="detail__section">
            <h2 className="detail__section-title">Synopsis</h2>
            <p className="detail__synopsis">{serie.synopsis}</p>
          </section>

          <section className="detail__section">
            <h2 className="detail__section-title">Acteurs</h2>
            <div className="detail__acteurs">
              {serie.acteurs.map((a) => (
                <span key={a} className="detail__acteur">
                  {a}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

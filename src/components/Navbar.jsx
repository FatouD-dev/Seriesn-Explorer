import { NavLink } from 'react-router-dom';
import { useFavoris } from '../context/FavorisContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { favoris } = useFavoris();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">
        <span className="navbar__title">SérieSN</span>
        <span className="navbar__subtitle">Explorer</span>
      </NavLink>

      <nav className="navbar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Accueil
        </NavLink>
        
        <NavLink
          to="/favoris"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Favoris
          {favoris.length > 0 && (
            <span className="navbar__badge">{favoris.length}</span>
          )}
        </NavLink>
      </nav>

      <button
        className="navbar__theme-btn"
        onClick={toggleTheme}
        aria-label={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
        title={`Mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}

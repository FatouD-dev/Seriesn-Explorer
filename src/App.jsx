import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavorisProvider } from './context/FavorisContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Detail from './pages/Detail';
import Favoris from './pages/Favoris';

export default function App() {
  return (
    <ThemeProvider>
      <FavorisProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/serie/:id" element={<Detail />} />
            <Route path="/favoris" element={<Favoris />} />
          </Routes>
        </BrowserRouter>
      </FavorisProvider>
    </ThemeProvider>
  );
}

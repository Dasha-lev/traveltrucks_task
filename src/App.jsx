import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import CamperDetailPage from './pages/CamperDetailPage'

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailPage />} />
      </Routes>
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home' // ホームページ（必要なら作成）
import HealthCheck from './pages/health_check' // 作成したページ

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ホームページ */}
        <Route path="/health-check" element={<HealthCheck />} />{' '}
        {/* ヘルスチェック */}
      </Routes>
    </Router>
  )
}

export default App

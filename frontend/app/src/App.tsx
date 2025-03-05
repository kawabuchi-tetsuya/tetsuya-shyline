import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// ホームページ
import Home from './pages/home'
// ヘルスチェックページ
import HealthCheck from './pages/health_check'
// 投稿一覧ページ
import Index from './pages/index'

// ヘッダー
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* ホームページ */}
        <Route path="/" element={<Home />} />
        {/* ヘルスチェック */}
        <Route path="/health-check" element={<HealthCheck />} />{' '}
        {/* 投稿一覧ページ */}
        <Route path="/posts" element={<Index />} />
      </Routes>
    </Router>
  )
}

export default App

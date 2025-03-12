import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CurrentUserFetch from './components/CurrentUserFetch'

// Route
import Home from './pages/home'
import HealthCheck from './pages/health_check'
import SignIn from './pages/sign_in'
import Index from './pages/index'

// ヘッダー
import Header from './components/Header'

function App() {
  return (
    <Router>
      <CurrentUserFetch />
      <Header />

      <Routes>
        {/* ホームページ */}
        <Route path="/" element={<Home />} />
        {/* ヘルスチェック */}
        <Route path="/health-check" element={<HealthCheck />} />{' '}
        {/* サインインページ */}
        <Route path="/sign-in" element={<SignIn />} />
        {/* 投稿一覧ページ */}
        <Route path="/posts" element={<Index />} />
      </Routes>
    </Router>
  )
}

export default App

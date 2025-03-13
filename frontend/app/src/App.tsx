import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CurrentUserFetch from './components/CurrentUserFetch'

// Route
import Home from './pages/home'
import HealthCheck from './pages/health_check'
import Index from './pages/index'
import SignIn from './pages/sign_in'
import SignOut from './pages/sign_out'

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
        {/* 投稿一覧ページ */}
        <Route path="/posts" element={<Index />} />
        {/* サインインページ */}
        <Route path="/sign-in" element={<SignIn />} />
        {/* サインアウトページ */}
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
    </Router>
  )
}

export default App

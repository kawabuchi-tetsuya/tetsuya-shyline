import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CurrentUserFetch from './components/CurrentUserFetch'

// Route
import CurrentPosts from './pages/current/posts'
import CurrentPostDetail from './pages/current/posts/[id]'
import CurrentPostsEdit from './pages/current/posts/edit/[id]'
import Home from './pages/home'
import HealthCheck from './pages/health_check'
import Index from './pages/index'
import PostDetail from './pages/posts/[id]'
import SignIn from './pages/sign_in'
import SignOut from './pages/sign_out'

// ヘッダー
import Header from './components/Header'

// 通知バー
import Snackbar from './components/Snackbar'

function App() {
  return (
    <Router>
      <CurrentUserFetch />
      <Header />
      <Snackbar />

      <Routes>
        {/* ホームページ */}
        <Route path="/" element={<Home />} />
        {/* サインインユーザー投稿一覧 */}
        <Route path="/current/posts" element={<CurrentPosts />} />
        {/* サインインユーザー投稿詳細 */}
        <Route path="/current/posts/:id" element={<CurrentPostDetail />} />
        {/* サインインユーザー投稿編集 */}
        <Route path="/current/posts/edit/:id" element={<CurrentPostsEdit />} />
        {/* ヘルスチェック */}
        <Route path="/health-check" element={<HealthCheck />} />{' '}
        {/* 投稿一覧ページ */}
        <Route path="/posts" element={<Index />} />
        {/* 投稿詳細ページ */}
        <Route path="/posts/:id" element={<PostDetail />} />
        {/* サインインページ */}
        <Route path="/sign-in" element={<SignIn />} />
        {/* サインアウトページ */}
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
    </Router>
  )
}

export default App

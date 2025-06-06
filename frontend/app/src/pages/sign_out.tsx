import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserState } from '@/hooks/useGlobalState'

const SignOut = () => {
  const navigate = useNavigate()
  const [, setUser] = useUserState()

  useEffect(() => {
    // ローカルストレージをクリア
    localStorage.clear()

    // ユーザーを初期値にリセット
    setUser({
      id: 0,
      name: '',
      nickname: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
    })

    // リダイレクト
    navigate('/posts')
  }, [navigate, setUser])

  return null
}

export default SignOut

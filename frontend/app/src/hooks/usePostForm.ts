import axios, { AxiosError } from 'axios'
import { useReducer, useEffect, useMemo } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useSWR from 'swr'
import { useSnackbarState } from '@/hooks/useGlobalState'
import { PostFormData } from '@/types/postFormData'
import { fetcher } from '@/utils'
import { getAuthHeaders } from '@/utils/auth'

type PostProps = {
  content: string
  status: string | boolean
}

type State = {
  statusChecked: boolean
  isFetched: boolean
  isLoading: boolean
  contentLength: number
}

type Action =
  | { type: 'SET_STATUS_CHECKED'; payload: boolean }
  | { type: 'SET_IS_FETCHED'; payload: boolean }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_CONTENT_LENGTH'; payload: number }

const initialState: State = {
  statusChecked: false,
  isFetched: false,
  isLoading: false,
  contentLength: 0,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STATUS_CHECKED':
      return { ...state, statusChecked: action.payload }
    case 'SET_IS_FETCHED':
      return { ...state, isFetched: action.payload }
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_CONTENT_LENGTH':
      return { ...state, contentLength: action.payload }
    default:
      return state
  }
}

export const usePostForm = (postId: string | undefined) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [, setSnackbar] = useSnackbarState()
  const apiPath = postId ? `/current/posts/${postId}` : null
  const { data, error } = useSWR<PostProps>(apiPath, fetcher)

  const post = useMemo<PostProps>(
    () => ({
      content: data?.content || '',
      status: data?.status || false,
    }),
    [data]
  )

  const { handleSubmit, control, reset, watch } = useForm<PostFormData>({
    defaultValues: post,
  })

  useEffect(() => {
    if (data) {
      const post = {
        content: data.content || '',
        status: data.status || false,
      }
      reset(post)
      dispatch({ type: 'SET_IS_FETCHED', payload: true })
      dispatch({
        type: 'SET_STATUS_CHECKED',
        payload: post.status === '公開中',
      })
    }
  }, [data, post, reset])

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.content !== undefined) {
        dispatch({ type: 'SET_CONTENT_LENGTH', payload: value.content.length })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const handleError = (message: string) => {
    setSnackbar({
      message,
      severity: 'error',
      pathname: '/current/posts/edit/[id]',
    })
  }

  const onSubmit: SubmitHandler<PostFormData> = (formData) => {
    if (state.statusChecked && formData.content === '') {
      return handleError('本文なしの投稿は公開できません')
    }

    dispatch({ type: 'SET_IS_LOADING', payload: true })

    const patchUrl = `${import.meta.env.VITE_API_BASE_URL}/current/posts/${postId}`
    const headers = {
      ...getAuthHeaders(),
      // 画像
      'Content-Type': 'multipart/form-data',
    }

    const data = new FormData()
    data.append('post[content]', formData.content)
    data.append('post[status]', state.statusChecked ? 'published' : 'draft')

    if (formData.images) {
      for (const file of formData.images) {
        data.append('post[images][]', file)
      }
    }

    axios
      .patch(patchUrl, data, { headers })
      .then(() =>
        setSnackbar({
          message: '投稿を保存しました',
          severity: 'success',
          pathname: '/current/posts/edit/[id]',
        })
      )
      .catch((err: AxiosError<{ error: string }>) => {
        console.error(err)
        handleError('投稿の保存に失敗しました')
      })
      .finally(() => dispatch({ type: 'SET_IS_LOADING', payload: false }))
  }

  return {
    formState: state,
    dispatch,
    control,
    handleSubmit: handleSubmit(onSubmit),
    error,
  }
}

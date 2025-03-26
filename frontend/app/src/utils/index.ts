import apiClient from '@/axiosConfig'
import camelcaseKeys from 'camelcase-keys'

export const fetcher = async (url: string) => {
  try {
    const response = await apiClient.get(url)
    return camelcaseKeys(response.data, { deep: true })
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

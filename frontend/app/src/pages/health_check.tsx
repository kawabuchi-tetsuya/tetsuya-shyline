import useSWR from 'swr'
import { fetcher } from '../utils/index'

const HealthCheck: React.FC = () => {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>Health Check</h1>
      <p>{data.message || 'Loading...'}</p>
    </div>
  )
}

export default HealthCheck

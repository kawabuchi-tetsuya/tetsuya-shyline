export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'access-token': localStorage.getItem('access-token'),
  client: localStorage.getItem('client'),
  uid: localStorage.getItem('uid'),
})

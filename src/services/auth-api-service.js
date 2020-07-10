import config from '../config'
import TokenService from './token-service'

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res.json()
    })
  },
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res.json()
    })
  },
  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res.json()
    })
  },
}

export default AuthApiService
import config from '../config';
import TokenService from '../services/token-service';

const UserService = {
  deleteUser() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUser() {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  },
  editUser(full_name, email) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'PATCH',
      body: JSON.stringify({ full_name, email }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e))
        return res.json()
      })
  },
}

export default UserService;
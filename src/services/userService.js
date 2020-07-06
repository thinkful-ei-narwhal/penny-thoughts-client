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
  }
}

export default UserService;
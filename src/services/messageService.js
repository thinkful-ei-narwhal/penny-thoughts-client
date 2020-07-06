import config from '../config';
import TokenService from './token-service';

const messageService = {
  getTenRandom() {
    return fetch(`${config.API_ENDPOINT}/messages`, {
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

  getOneRandom() {
    let error;
    return fetch(`${config.API_ENDPOINT}/messages/single`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data
      })
  },

  getUserMessages() {
    let error;
    return fetch(`${config.API_ENDPOINT}/messages/userData`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data
      })
  },

  deleteUserMessage(id) {
    console.log(id)
    let error;
    return fetch(`${config.API_ENDPOINT}/messages/userData`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
        }
      })
      .then(data => {
        console.log(data)
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        return data
      })
  },
}

export default messageService;
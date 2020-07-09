import config from '../config';
import TokenService from './token-service';

const messageService = {
    getTenRandom(){
        return fetch(`${config.API_ENDPOINT}/messages`,{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
          if (!res.ok) return res.json().then(e => Promise.reject(e))
          return res.json()
        })
    },
    
    getOneRandom(id){
        return fetch(`${config.API_ENDPOINT}/messages/single/${id}`,{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
          if (!res.ok) return res.json().then(e => Promise.reject(e))
          return res.json()
        })
    },

  getUserMessages() {
    return fetch(`${config.API_ENDPOINT}/messages/userData`, {
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

  getFlaggedMessages() {
    return fetch(`${config.API_ENDPOINT}/messages/flagged`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res.json()
    })
  },

  addMessage(message) {
    return fetch(`${config.API_ENDPOINT}/messages`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ message })
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res.json()
    })
  },

  deleteUserMessage(id) {
    return fetch(`${config.API_ENDPOINT}/messages/userData`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
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

  editUserMessage(id, newMessage) {
    return fetch(`${config.API_ENDPOINT}/messages/userData`, {
      method: 'PATCH',
      body: JSON.stringify({ id, message: newMessage }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res
    })
  },

  flagMessage(id) {
    return fetch(`${config.API_ENDPOINT}/messages/report`, {
      method: 'PATCH',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res
    })
  },
  unflagMessage(id) {
    
    return fetch(`${config.API_ENDPOINT}/messages/flagged`, {
      method: 'PATCH',
      headers: {
        'context-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ id })
    })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e))
      return res.json()
    })
  },
  archiveMessage(id) {

  }
}

export default messageService;
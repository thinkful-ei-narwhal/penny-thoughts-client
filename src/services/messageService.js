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
    }
}

export default messageService;
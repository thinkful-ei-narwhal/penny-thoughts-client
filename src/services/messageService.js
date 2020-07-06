import config from '../config';
import TokenService from './token-service';

const messageService = {
    getTenRandom(){
        let error;
        return fetch(`${config.API_ENDPOINT}/messages`,{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
          if (!res.ok) return res.json().then(e => Promise.reject(e))
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
    
    getOneRandom(){
        let error;
        return fetch(`${config.API_ENDPOINT}/messages/single`,{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
          if (!res.ok) return res.json().then(e => Promise.reject(e))
            return res.json();
          })
          .then(data => {
            if (error) {
              error.message = data.message;
              return Promise.reject(error);
            }
            return data
          })
    } 
}

export default messageService;
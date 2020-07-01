import config from '../config';

const messageService = {
    getTenRandom(){
        let error;
        return fetch(`${config.API_ENDPOINT}/`,{
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                //'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
              error = { code: res.status};
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
    }  
}

export default messageService;
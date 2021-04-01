export const token = localStorage.getItem('token');

export const uid = localStorage.getItem('uid');

export const base_url = 'https://leave-mgt-backend.herokuapp.com/'

export function getObjects(endpoint) {
    return fetch(
        `${base_url}${endpoint}`,
        {
            method: 'GET',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `Token ${token}`
            }
        }
    )
}


export const msg = (json) => {
    /* Loop through the messages from API endpoint */
    var msg = '';
    for (let key in json) {
        msg += json[key].join()
    }
    return msg;
}
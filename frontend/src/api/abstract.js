const API_URL= process.env.REACT_APP_API_URL;

export function makeHTTPGETRequest(endpoint, queryParams={}) {
    const token = localStorage.getItem('jwtToken');
    const url = new URL(API_URL + endpoint);

    Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}


export async function makeHTTPPOSTRequest(endpoint, bodyParams={}) {
    console.log(API_URL + endpoint);
    const url = new URL(API_URL + endpoint);
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodyParams)
    };

    return fetch(url, options)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
}

export async function makeHTTPPUTRequest(endpoint, bodyParams) {
    const token = localStorage.getItem('jwtToken');
    console.log(API_URL + endpoint);
    const url = new URL(API_URL + endpoint);
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });

    const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(bodyParams)
    };

    return fetch(url, options)
        .then(response => {
            console.log(response);
            return response.body;
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error;
        });
}

export function makeHTTPDELETERequest(endpoint, queryParams) {
    const url = new URL(API_URL + endpoint);

    Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    fetch(url, { method: 'DELETE' })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
export async function makeHTTPUploadRequest(endpoint, file) {
    const url = new URL(API_URL + endpoint);
    const formData = new FormData();
    formData.append("song", file); 

    const token = localStorage.getItem('jwtToken');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData, 
    };
    

    return fetch(url, options)
        .then(response => response.json())
        .catch(error => {
            console.error('Upload error:', error);
            throw error;
        });
}



const API_URL= process.env.REACT_APP_API_URL;

export function makeHTTPGETRequest(endpoint, queryParams={}) {
    const url = new URL(API_URL + endpoint);

    Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
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

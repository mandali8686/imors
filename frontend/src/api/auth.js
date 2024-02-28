import { makeHTTPPOSTRequest } from "./abstract";

function getURL(endpoint='') {
    return 'auth/' + endpoint;
}

export async function login(email, password) {
    const queryParams = { email, password };
    const endpoint = getURL();
    return makeHTTPPOSTRequest(endpoint, queryParams)
    .then(response => {
        const { status, message, error="N/A", token } = response;
        if (token) {
            // Save the token in local storage
            localStorage.setItem('jwtToken', token);
        }
        return { status, message, error };
    });
}

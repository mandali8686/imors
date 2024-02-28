import { makeHTTPGETRequest, makeHTTPPOSTRequest } from "./abstract";

function getURL(endpoint='') {
    return 'users/' + endpoint;
}

export async function createUser(email, password) {
    const bodyParams = { email, password };
    const endpoint = getURL();
    return makeHTTPPOSTRequest(endpoint, bodyParams)
    .then(response => {
        const { message, error="N/A" } = response;
        return { message, error };
    });
}

export async function getUserByEmail(email) {
    const queryParams = { email };
    const endpoint = getURL();
    return makeHTTPGETRequest(endpoint, queryParams)
    .then(response => {
        const { message, error="N/A" } = response;
        return { message, error };
    });
}
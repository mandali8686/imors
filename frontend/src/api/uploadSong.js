import { makeHTTPUploadRequest } from "./abstract";

function getURL(endpoint='') {
    return 'uploadSong/' + endpoint;
}

export async function uploadSong(file) {
    const bodyParams = { file };
    const endpoint = getURL();
    return makeHTTPUploadRequest(endpoint, bodyParams)
    .then(response => {
        const { message, error="N/A" } = response;
        return { message, error };
    });
}

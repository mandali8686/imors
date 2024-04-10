import { makeHTTPUploadRequest, makeHTTPGETRequest } from "./abstract";
import { makeHTTPDELETERequest } from "./abstract";
function getURL(endpoint = "") {
  return "songs/" + endpoint;
}

export async function uploadSong(file, sessionId) {
  const formData = new FormData();
  formData.append("audioFile", file);

  const endpoint = getURL();
  const headers = { Cookie: `sessionId=${sessionId}` };

  return makeHTTPUploadRequest(endpoint, formData, headers).then((response) => {
    const { message, error = "N/A" } = response;
    return { message, error };
  });
}

export async function getUserSongs(sessionId) {
  const endpoint = "songs/all";
  const queryParams = { sessionId };

  return makeHTTPGETRequest(endpoint, queryParams).then((response) => {
    const { songs, error = "N/A" } = response;
    return { songs, error };
  });
}
export async function deleteSong(songId) {
  const endpoint = getURL(`${songId}`); 
  return makeHTTPDELETERequest(endpoint)
    .then(response => {
      console.log('Song deleted successfully:', response);
      
    })
    .catch(error => {
      console.error('Failed to delete song:', error);
      
    });
}


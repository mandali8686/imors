import { makeHTTPUploadRequest, makeHTTPGETRequest } from "./abstract";

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

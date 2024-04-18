import { makeHTTPPOSTRequest, makeHTTPGETRequest } from "./abstract";

function getURL(endpoint = "") {
  return "videos/" + endpoint;
}

export async function generateVideo(songId, model) {
  const endpoint = getURL("generate");
  const bodyParams = { songId, model };

  return makeHTTPPOSTRequest(endpoint, bodyParams).then((response) => {
    const { message, error = "N/A" } = response;
    return { message, error };
  });
}

export async function getVideoURLs(songId) {
  const queryParams = { songId };
  const endpoint = getURL("getURLs");
  return makeHTTPGETRequest(endpoint, queryParams).then((response) => {
    if (response && Array.isArray(response)) {
      return response;
    } else {
      console.error("Unexpected response structure:", response);
      return [];
    }
  });
}

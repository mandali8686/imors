const SESSION_KEY = "jwtToken";

const isAuthenticated = () => {
  console.log("AUTH CHECKKKKK");
  const token = localStorage.getItem(SESSION_KEY);
  console.log("ISAUTHENTICATED TOKEN====", token);
  return !!token;
};

const getSession = () => {
  return localStorage.getItem(SESSION_KEY);
};

const authenticate = (token) => {
  console.log("token from authenticate()=====", token);
  localStorage.setItem(SESSION_KEY, token);
  let storedToken = localStorage.getItem(SESSION_KEY); // Retrieve to verify
  console.log("GOT TOKEN====", storedToken);
};

const signout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export { isAuthenticated, getSession, authenticate, signout };

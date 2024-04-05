const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDRrs33oSz4-Yoz3uaIs0PNc6lmEO_Yq_o",
  authDomain: "imors-8f62d.firebaseapp.com",
  projectId: "imors-8f62d",
  storageBucket: "imors-8f62d.appspot.com",
  messagingSenderId: "649565329026",
  appId: "1:649565329026:web:7841ff1e0cf2e2bbc7469b",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Firebase
function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  return { app, storage };
}

module.exports = { storage, initializeFirebase };

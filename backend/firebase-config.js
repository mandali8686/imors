const admin = require("firebase-admin");

const serviceAccount = require("./imors-8f62d-firebase-adminsdk-j3j4v-3257d92670.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "imors-8f62d.appspot.com",
});

const bucket = admin.storage().bucket();

console.log("Firebase Admin initialized with storage bucket:", bucket.name);

module.exports = { bucket };

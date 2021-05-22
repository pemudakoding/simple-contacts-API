require('dotenv').config(); 
const firebase = require('firebase'); 

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
};

const app = firebase.initializeApp(config);

module.exports = app;
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB17NW3wAmHjH0e61W6J9ctckblOy4W3JQ",
    authDomain: "fitnesspanel-eb7a2.firebaseapp.com",
    databaseURL: "https://fitnesspanel-eb7a2.firebaseio.com",
    projectId: "fitnesspanel-eb7a2",
    storageBucket: "fitnesspanel-eb7a2.appspot.com",
    messagingSenderId: "424894060576"
};

const FirebaseConfig = firebase.initializeApp(config);

export default FirebaseConfig;
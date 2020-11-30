import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD77xCnJjZtA0zSbK6b0LDS4T7KzbK9P74",
    authDomain: "quiz-app-8ccfd.firebaseapp.com",
    databaseURL: "https://quiz-app-8ccfd.firebaseio.com",
    projectId: "quiz-app-8ccfd",
    storageBucket: "quiz-app-8ccfd.appspot.com",
    messagingSenderId: "950943491115",
    appId: "1:950943491115:web:9d87a13516fd4e17b5366e",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

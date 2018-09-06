import firebase from 'firebase/app';
import database from 'firebase/database';

const config = {
  apiKey: 'AIzaSyDjInpmbicK5-qjsWSZxFYCY0Q3ie9cU_w',
  authDomain: 'fire-adda.firebaseapp.com',
  databaseURL: 'https://fire-adda.firebaseio.com',
  projectId: 'fire-adda',
  storageBucket: 'fire-adda.appspot.com',
  messagingSenderId: '733343596286'
};

firebase.initializeApp(config);

export default firebase;

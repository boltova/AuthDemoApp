// @flow

import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAMrtDSNSSoc9jWsRFgjYSH2C0BbgtTMT4',
  authDomain: 'chat-de5cf.firebaseapp.com',
  databaseURL: 'https://chat-de5cf.firebaseio.com',
  projectId: 'chat-de5cf',
  storageBucket: 'chat-de5cf.appspot.com',
  messagingSenderId: '637193757859',
});

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBtrvvn-FzknQ9KbL3mMHLLE-YyMLNHdcs",
  authDomain: "iot-team-2.firebaseapp.com",
  databaseURL: "https://iot-team-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-team-2",
  storageBucket: "iot-team-2.appspot.com",
  messagingSenderId: "62478113264",
  appId: "1:62478113264:web:faaab07fb5fb4291ac6535"
  });
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
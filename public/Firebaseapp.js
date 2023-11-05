const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDi7YuGqfj1AhBW44YiOLjhwZUr8IlFUsI",
  authDomain: "iotnhom2.firebaseapp.com",
  databaseURL: "https://iotnhom2-default-rtdb.firebaseio.com",
  projectId: "iotnhom2",
  storageBucket: "iotnhom2.appspot.com",
  messagingSenderId: "692824710274",
  appId: "1:692824710274:web:8c175981fd1e1effdd289b"
  });
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
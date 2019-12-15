import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
        apiKey: "AIzaSyAnNwFRPmQv_d7Y3mNSsqztXtWBIl2Ltb8",
        authDomain: "tomo-tech.firebaseapp.com",
        databaseURL: "https://tomo-tech.firebaseio.com",
        projectId: "tomo-tech",
        storageBucket: "tomo-tech.appspot.com",
        messagingSenderId: "827127006332",
        appId: "1:827127006332:web:d78468a8045790c9a235f9"
    }
  )
}

export default firebase
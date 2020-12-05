import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBk3BO2aRLKWei6DLMRajGyyhwdwF5-S5A",
    authDomain: "steam-mobile-project.firebaseapp.com",
    databaseURL: "https://steam-mobile-project.firebaseio.com",
    projectId: "steam-mobile-project",
    storageBucket: "steam-mobile-project.appspot.com",
    messagingSenderId: "329367772364",
    appId: "1:329367772364:web:44590cf7e0e0495ae93669",
    measurementId: "G-F0F5Z49DVL"
}

firebase.initializeApp(firebaseConfig)

export default firebase


  
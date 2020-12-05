import { registerRootComponent } from 'expo';
import firebase from 'firebase'

import App from './src/SteamApp';

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

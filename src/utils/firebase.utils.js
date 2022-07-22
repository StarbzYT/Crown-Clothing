import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  // dont worry about exposing this key
  apiKey: 'AIzaSyAG28uhNiA5Qq8bbQL2TrOvv9Of1BsichI',
  authDomain: 'crwn-clothing-3a6af.firebaseapp.com',
  projectId: 'crwn-clothing-3a6af',
  storageBucket: 'crwn-clothing-3a6af.appspot.com',
  messagingSenderId: '878679829199',
  appId: '1:878679829199:web:7cf1a745ac48afc1bae5ba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// set of auth instructions (can have more than one provider for app)
const provider = new GoogleAuthProvider();
// specfify type of auth
provider.setCustomParameters({ prompt: 'select_account' });
// create auth instance
export const auth = getAuth(); // only 1 auth inst for entire app!
// google sign in with pop up function
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

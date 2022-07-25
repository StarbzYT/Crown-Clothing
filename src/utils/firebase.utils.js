import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
// db access functions
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
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
export const auth = getAuth(); // keeps track of auth state in entire app
// google sign in with pop up function
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const db = getFirestore(); // points to our db on firebase

// create document and add to our db
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  // snapshot allows us to check is user exists in db and access it's data
  const userSnapShot = await getDoc(userDocRef);
  // if user does not exist, create userDoc in db
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating user', error);
    }
  }
  // if user exists in db, return userDocRef
  return userDocRef;
};
// sign in user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

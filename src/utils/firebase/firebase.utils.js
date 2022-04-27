import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANmOdLQPpYBa1BWux1Ar2ac0p8UNb6Cs4",
    authDomain: "crwn-clothing-70f2f.firebaseapp.com",
    projectId: "crwn-clothing-70f2f",
    storageBucket: "crwn-clothing-70f2f.appspot.com",
    messagingSenderId: "140174336632",
    appId: "1:140174336632:web:b8c6a1bf96a890dfdec38d"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch(err){
            console.log('Error creating user into firestore', err);
        }
    }
}

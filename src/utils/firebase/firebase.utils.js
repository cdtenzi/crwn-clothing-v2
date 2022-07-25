import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANmOdLQPpYBa1BWux1Ar2ac0p8UNb6Cs4",
  authDomain: "crwn-clothing-70f2f.firebaseapp.com",
  projectId: "crwn-clothing-70f2f",
  storageBucket: "crwn-clothing-70f2f.appspot.com",
  messagingSenderId: "140174336632",
  appId: "1:140174336632:web:b8c6a1bf96a890dfdec38d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

// obtenemos todo el arbol de productos desde firestore:
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const qry = query(collectionRef);

  const querySnapshot = await getDocs(qry);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (err) {
      console.log("Error creating user into firestore", err);
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (user, password) => {
  if (!user || !password) return;

  return await createUserWithEmailAndPassword(auth, user, password);
};

export const signInAuthUserWithEmailAndPassword = async (user, password) => {
  if (!user || !password) return;

  return await signInWithEmailAndPassword(auth, user, password);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

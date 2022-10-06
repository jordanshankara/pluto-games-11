// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfigure = {
  apiKey: "AIzaSyBMnCFoXNSEQmhO5XVv-LIJmQiNjnHKUtE",
  authDomain: "pluto-games-10.firebaseapp.com",
  projectId: "pluto-games-10",
  storageBucket: "pluto-games-10.appspot.com",
  messagingSenderId: "964152980508",
  appId: "1:964152980508:web:b79163848271abdd555bd9",
  databaseURL:
    "https://pluto-games-10-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfigure);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Firebase
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  return currentUser;
}

export function editUser(username, photo) {
  return updateProfile(auth.currentUser, {
    displayName: username,
    photoURL: photo,
  });
}

export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function logOut() {
  return signOut(auth);
}

export function storageRef(path) {
  return ref(storage, path);
}

export function getDb() {
  return getDatabase(app);
}

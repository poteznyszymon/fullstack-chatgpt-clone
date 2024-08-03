import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEfLAhBPltcTfbZnKCjKw7D9Nn2HnNZu4",
  authDomain: "chatai-76a5f.firebaseapp.com",
  projectId: "chatai-76a5f",
  storageBucket: "chatai-76a5f.appspot.com",
  messagingSenderId: "68886182756",
  appId: "1:68886182756:web:6f37e64eebd4431a9a5871",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const createUser = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

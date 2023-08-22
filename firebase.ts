import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_APPID,
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
import { initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBpkU0AyqM28GU58y3TI-7U_nz-UkV5Wec",
    authDomain: "relevel-simplified-14b51.firebaseapp.com",
    projectId: "relevel-simplified-14b51",
    storageBucket: "relevel-simplified-14b51.appspot.com",
    messagingSenderId: "709294689455",
    appId: "1:709294689455:web:7b919e1691d529c9c4d85a"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

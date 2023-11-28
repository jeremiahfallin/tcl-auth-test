import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC7OaB7xhAhsTrJuVbxVANqbRmK_4a5yN0',
	authDomain: 'tcl-d3efb.firebaseapp.com',
	projectId: 'tcl-d3efb',
	storageBucket: 'tcl-d3efb.appspot.com',
	messagingSenderId: '1029768376335',
	appId: '1:1029768376335:web:2ea21f7b4a85a4c40af37a',
	measurementId: 'G-TRPWTNBXS6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

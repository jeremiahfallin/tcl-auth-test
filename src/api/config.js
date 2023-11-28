import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCbWk5hSHCZIOcrBFmcz64oK8sYxeMip4U',
	authDomain: 'tcl-auth-test.web.com',
	databaseURL: 'https://tcl-auth-test-default-rtdb.firebaseio.com',
	projectId: 'tcl-auth-test',
	storageBucket: 'tcl-auth-test.appspot.com',
	messagingSenderId: '80791769865',
	appId: '1:80791769865:web:2ee17ceae0ae076089b9d8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

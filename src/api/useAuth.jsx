import { useEffect, useState } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';

export const SignInButton = () => (
	<button
		type="button"
		onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}
	>
		Sign In
	</button>
);

export const SignOutButton = () => (
	<button type="button" onClick={() => auth.signOut()}>
		Sign Out
	</button>
);

export const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			setUser(user);
			if (user) {
				addUserToDatabase(user);
			}
		});
		return unsub;
	}, []);

	return { user };
};

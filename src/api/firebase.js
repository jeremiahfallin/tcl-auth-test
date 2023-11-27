import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	onSnapshot,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate } from '../utils';

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} userId
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(userId, userEmail) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!userId) return;

		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;

				listRefs.forEach((listRef) => {
					onSnapshot(collection(db, listRef.path, 'items'), (snapshot) => {
						const listItems = snapshot.docs.map((docSnapshot) => ({
							...docSnapshot.data(),
							id: docSnapshot.id,
						}));
						setData((prevData) => ({
							...prevData,
							[listRef.id]: listItems,
						}));
					});
				});
			}
		});
	}, [userId, userEmail]);

	// Return the data so it can be used by our React components.
	return data;
}

export async function addList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(
	userId,
	listName,
	{ itemName, daysUntilNextPurchase },
) {
	const listCollectionRef = collection(db, userId, listName, 'items');

	addDoc(listCollectionRef, {
		dateCreated: new Date(),
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		owner: userId,
		totalPurchases: 0,
	});
}

export async function updateItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to update an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function shareList(userId, listName, userToShareWith) {
	const userRef = collection(db, 'users');
	const userDoc = await getDoc(doc(userRef, userToShareWith));
	if (!userDoc.exists()) {
		return;
	}
	const listDocumentRef = doc(db, userId, listName);
	const userDocumentRef = doc(db, 'users', userToShareWith);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});
}

export async function addUserToDatabase(user) {
	const userRef = collection(db, 'users');
	const userDoc = await getDoc(doc(userRef, user.email));
	if (userDoc.exists()) {
		return;
	} else {
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

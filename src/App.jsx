import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ManageList, Home, Layout, List } from './views';

import { useShoppingListData } from './api';
import { useStateWithStorage } from './utils';

import { useAuth } from './api/useAuth';

export function App() {
	/**
	 * This custom hook takes a token pointing to a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 *
	 * We use `my test list` by default so we can see the list
	 * of items that was prepopulated for this project.
	 * We'll later set this to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when we allow a user
	 * to create and join a new list.
	 */
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;
	const [currentShoppingList, setCurrentShoppingList] = useStateWithStorage(
		'currentShoppingList',
		null,
	);

	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const data = useShoppingListData(userId, userEmail);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<Home
								data={data}
								currentShoppingList={currentShoppingList}
								setCurrentShoppingList={setCurrentShoppingList}
								userEmail={userEmail}
								userId={userId}
							/>
						}
					/>
					<Route path="/list" element={<List data={data} />} />
					<Route
						path="/add-item"
						element={
							<ManageList
								currentShoppingList={currentShoppingList}
								userId={userId}
							/>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

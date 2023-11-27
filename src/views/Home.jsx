import { useState } from 'react';
import './Home.css';
import { addList } from '../api';

export function Home({ data, setCurrentShoppingList, userEmail, userId }) {
	const [listName, setListName] = useState('');
	return (
		<div className="Home">
			<h2>Home</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setCurrentShoppingList(listName);
					addList(userId, userEmail, listName);
				}}
			>
				<label htmlFor="listName">Create a new shopping list</label>
				<input
					id="listName"
					type="text"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
				/>
				<button type="submit">Join</button>
			</form>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}

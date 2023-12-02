import { useState } from 'react';
import './Home.css';
import { addList } from '../api';

export function Home({
	data,
	setCurrentShoppingList,
	currentShoppingList,
	userEmail,
	userId,
}) {
	const [listName, setListName] = useState('');
	const handleClick = (e) => {
		setCurrentShoppingList(e.target.innerText);
	};
	return (
		<div className="Home">
			<h2>Home</h2>
			<p>
				Current shopping list: <strong>{currentShoppingList}</strong>
			</p>
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
			{Object.keys(data).map((list) => (
				<div key={list}>
					<button onClick={handleClick}>{list}</button>
				</div>
			))}
		</div>
	);
}

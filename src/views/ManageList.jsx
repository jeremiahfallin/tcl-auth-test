import { addItem, shareList } from '../api';

export function ManageList({ userId, currentShoppingList }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const itemName = e.target.itemName.value;
		addItem(userId, currentShoppingList, {
			itemName,
			daysUntilNextPurchase: 7,
		});
		e.target.reset();
	};

	const handleShare = (e) => {
		e.preventDefault();
		shareList(userId, currentShoppingList, e.target.email.value);
		e.target.reset();
	};

	return (
		<div>
			<p>
				Current shopping list: <strong>{currentShoppingList}</strong>
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">Item name</label>
				<input id="itemName" type="text" />
				<button type="submit">Add</button>
			</form>
			<form onSubmit={handleShare}>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" />
				<button type="submit">Share list</button>
			</form>
		</div>
	);
}

import { ListItem } from '../components';

export function List({ data, currentShoppingList }) {
	const list = data[currentShoppingList] || [];
	return (
		<>
			{list.length === 0 ? (
				<p>There are no items in your list. Add some!</p>
			) : (
				<ul className="List">
					{list.map((item) => (
						<ListItem key={item.id} item={item} />
					))}
				</ul>
			)}

			<ul>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</ul>
		</>
	);
}

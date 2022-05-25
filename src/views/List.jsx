import { useEffect, useState } from 'react';
import { streamListItems } from '../api';
import { ListItem } from '../components/ListItem';

export function List({ listToken }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!listToken) return;

		return streamListItems(listToken, (querySnap) => {
			const nextData = [];
			querySnap.docs.forEach((docRef) => {
				const data = docRef.data();
				data.id = docRef.id;
				nextData.push(data);
			});
			setData(nextData);
		});
	}, [listToken]);

	const emptyListPrompt = <p>Looks like this list is empty!</p>;

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{listToken && data.length === 0 && emptyListPrompt}
			<ul>
				{data.map((item) => {
					return <ListItem key={item.id} id={item.id} name={item.name} />;
				})}
			</ul>
		</>
	);
}

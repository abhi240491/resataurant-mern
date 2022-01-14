import React from 'react';
import Card from './Card';
// redux
import { useSelector } from 'react-redux';

const AdminBody = () => {
	const { products } = useSelector(state => state.products);
	console.log("Inside AdminBody")
	console.log(products)
	return (
		<div className='container'>
			<div className='row'>
				<div className='card-deck'>
					{products &&
						products.map(product => (
							<Card key={product._id} product={product} />
						))}
				</div>
			</div>
		</div>
	);
};

export default AdminBody;

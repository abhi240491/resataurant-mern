import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/productActions';

const Card = ({ product }) => {
	const dispatch = useDispatch();
	console.log("Inside CARD")
	return (
		<div className='col-md-4 my-3'>
			<div className='card h-100'>
			<div className='card-body text-center h-40'>
                <a href = '#!'>
					<img
						className='img-fluid w-100 h-100'
						src={`/uploads/${product.fileName}`}
						alt="Max-width 100%"
					/>
                </a>
				</div>
				<div className='card-body text-center h-10'>
					<h5>{product.productName}</h5>
					<hr />
					<h6 className='mb-3'>
						<span className='text-secondary mr-2'>
							{product.productPrice.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</span>
					</h6>
					<div className='card-body text-center h-20'>
					<p>
						{product.productDesc.length > 60
							? product.productDesc.substring(0, 60) + '...'
							: product.productDesc.substring(0, 60)}
					</p>
					</div>
					<div className='card-body text-center h-10'>
					<Link 
						to ={`/admin/edit/product/${product._id}`}
						type='button'
						className='btn btn-secondary btn-sm mr-1 my-1'
					>
						<i className='far fa-edit pr-1'></i>
						Edit
					</Link>
					<button type = 'button' className = 'btn btn-danger btn-sm' onClick={() => dispatch(deleteProduct(product._id))}>
						<i className = 'far fa-trash-alt pr-1'></i>
						Delete
					</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
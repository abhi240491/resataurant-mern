import React, { useState } from "react";
//import {Link} from 'react-router-dom';

function UserCard({ product }) {
  console.log("Inside UserCards");
  const [productSelect, setProductSelect] = useState(false);
  const [productCount,setProductCount] = useState(0);
  const handleProductSubmit = () => {
    let count = productCount;
    count = count+1;
    setProductCount(count);
    setProductSelect(true);
  };
  const handleIncrementProduct = () => {
    console.log("Increment Product");
    let count = productCount;
    count = count+1;
    setProductCount(count);
  };
  const handleDecrementProduct = () => {
    console.log("Decrement Product");
    let count = productCount;
    count = count-1;
    setProductCount(count);
  };
  console.log(productCount);
  return (
    <div className="col-md-4 my-3">
      <div className="card h-100">
        <div className="card-body text-center h-40">
          <a href="#!">
            <img
              className="img-fluid w-100 h-100"
              src={`/uploads/${product.fileName}`}
              alt="Max-width 100%"
            />
          </a>
        </div>
        <div className="card-body text-center h-10">
          <h5>{product.productName}</h5>
          <hr />
          <h6 className="mb-3">
            <span className="text-secondary mr-2">
              {product.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </h6>
          <div className="card-body text-center h-20">
            <p>
              {product.productDesc.length > 60
                ? product.productDesc.substring(0, 60) + "..."
                : product.productDesc.substring(0, 60)}
            </p>
          </div>
          {/*Add Button to add product and buy*/}
          {!productSelect && (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleProductSubmit}
            >
              Add To Cart
            </button>
          )}
          {productSelect && (
            <>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleIncrementProduct}
              >
                +
              </button>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleDecrementProduct}
              >
                -
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;

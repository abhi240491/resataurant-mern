import React from "react";
import UserCard from './UserCard';
import { useSelector } from "react-redux";

export default function UserBody() {
  const { products } = useSelector((state) => state.products);
  console.log("Inside UserBody");
  console.log(products);
  return (
    <div className="container">
      <div className="row">
        <div className="card-deck">
          {products &&
            products.map((product) => (
              <UserCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getProduct } from "../redux/actions/productActions";
import { getCategories } from "../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "./AdminHeader";
import { Link } from "react-router-dom";
import axios from 'axios';

function AdminEditProduct({ match, history }) {
  //option#1
  //const productId = userParams(); //returns the URL parameters
  //option2
  const productId = match.params.productId;
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  console.log(categories[0].category);
  //console.log(product);
  //routing a component by default generates
  //history as props with parameters of interest
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productCategory, setProductCategory] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Product", product);
    if (!product) {
      dispatch(getProduct(productId));
      dispatch(getCategories());
      console.log("Product after getProduct", product);
    } else {
      setProductImage(product.fileName);
      setProductName(product.productName);
      setProductDesc(product.productDesc);
      setProductPrice(product.productPrice);
      setProductCategory(product.productCategory);
      setProductQuantity(product.productQty);
    }
  }, [productId, dispatch, product]);
  
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
    console.log("PRODUCT IMAGE:",image, typeof(image), productImage, typeof(productImage));
  };
  const handleProductSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productDescription", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productQuantity", productQuantity);
    //Turn this part into redux format: task
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    await axios.put(`/api/product/${productId}`,formData,config)
    .then(
        res => {
            console.log('Success product update:', res);
            history.push('/admin/dashboard')
    }) 
    .catch(err => {
        console.log("Error in product update:", err );
    })
  };

  return (
    <>
      <AdminHeader />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <Link to="/admin/dashboard">
              <span className="fas fa-arrow-left">Go Back</span>
            </Link>
            <div>
              <br />
              <div className="modal-content">
                <form onSubmit={handleProductSubmit}>
                  <div className="modal-header bg-warning text-white">
                    <h5 className="modal-title">Update Food</h5>
                  </div>
                  <div className="modal-body my-2">
                    <>
                      <label className="btn btn-dark mr-4">
                        {productImage ? productImage.name: "Choose file"}
                        <input
                          type="file"
                          name="productImage"
                          accept="images/*"
                          hidden
                          onChange={handleImageUpload}
                        />
                      </label>
                      {productImage && productImage.name ? (
                        <span className="badge badge-secondary">
                          {productImage.name}
                        </span>
                      ) : productImage ? (
                        <img
                          className="img-thumbnail"
                          style={{
                            width: "120px",
                            height: "80px",
                          }}
                          src={`/uploads/${productImage}`}
                          alt="product"
                        />
                      ) : null}

                      <div className="form-group">
                        <label className="text-secondary">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-secondary">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="productDesc"
                          value={productDesc}
                          onChange={(e) => setProductDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="text-secondary">Price</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productPrice"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="text-secondary">Category</label>
                          <select
                            className="custom-select mr-sm-2"
                            name="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                          >
                            <option value="">Choose one...</option>
                            {categories &&
                              categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                  {c.category}
                                </option>
                              ))}
                          </select>
                        </div>

                        <div className="form-group col-md-6">
                          <label className="text-secondary">Quantity</label>
                          <input
                            type="number"
                            className="form-control"
                            min="0"
                            max="1000"
                            name="productQty"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-warning text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEditProduct;

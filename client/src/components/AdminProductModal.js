import React, { useState} from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../components/helpers/message";
import isEmpty from "validator/lib/isEmpty";
//import { getCategories } from "../api/category";
import { showLoading } from "../components/helpers/loading";

//redux 
import {useSelector, useDispatch} from 'react-redux'
import {clearMessages} from "../redux/actions/messageActions";
import {createProduct} from '../redux/actions/productActions';



const AdminProductModal = () => {
  const dispatch = useDispatch();
  const {successMsg, errorMsg} = useSelector(state => state.messages);
  const {loading} =  useSelector(state => state.loading);
  const {categories} = useSelector(state => state.categories);



  const [clientError, setClientError] = useState('');
  
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productQuantity: 0,
  });

  const {
    productImage,
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQuantity,
  } = productData;
   
  const handleProductImage = (evt) => {
    console.log(evt.target.files[0]);
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.files[0],
    });
  };
  const handleProductChange = (evt) => {
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleMessages = (evt) => {
    dispatch(clearMessages);
    setClientError('');
  };

  const handleProductSubmit = (evt) => {
    evt.preventDefault();
    //client side checks
    if (productImage === null) {
      setClientError("Please select an Image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDescription) ||
      isEmpty(productPrice)
    ) {
      setClientError("All fields required");
    } else if (isEmpty(productCategory)) {
      setClientError("Please select a category");
    } else {
      let formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQuantity", productQuantity);
      
      dispatch(createProduct(formData));
      setProductData({
        productImage: null,
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "",
        productQuantity: 0,
      });
    }
  };

  
  return (
    <div id="addFoodModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          {/*FORM Food Add*/}
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add Food</h5>
              <button className="close" data-dismiss="modal">
                <span>
                  <i className="fas fa-times"></i>{" "}
                </span>
              </button>
            </div>
            <div className="modal-body my-2">
              {clientError && showErrorMessage(clientError)}
              {errorMsg && showErrorMessage(errorMsg)/*server side error*/}
              {successMsg && showSuccessMessage(successMsg)}
              {loading ? (
                <div className="text-center"> {showLoading()}</div>
              ) : (
                <>
                  {/*file upload*/}
                  <div className="custom-file mb-2">
                    <input
                      id="fileupload"
                      type="file"
                      className="custom-file-input"
                      name="productImage"
                      accept="images/*"
                      onChange={handleProductImage}
                    />
                    <label className="custom-file-label">Choose File</label>
                  </div>
                  {/*Name*/}
                  <div className="form-group">
                    <label className="text-secondary">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary">Description</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      name="productDescription"
                      value={productDescription}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productPrice"
                      value={productPrice}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label className="text-secondary">Category</label>
                      <select
                        className="custom-select mr-sm-2"
                        name="productCategory"
                        onChange={handleProductChange}
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
                        placeholder="0"
                        name="productQuantity"
                        value={productQuantity}
                        onChange={handleProductChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning mr-auto">
                Submit
              </button>
              <button data-dismiss="modal" className="btn btn-secondary ">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;

import React, { useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../components/helpers/message";
import { showLoading } from "../components/helpers/loading";
import { createCategory } from '../redux/actions/categoryActions';
import isEmpty from "validator/lib/isEmpty";
import {useSelector, useDispatch} from 'react-redux';
import {clearMessages} from '../redux/actions/messageActions';

const AdminCategoryModal = () => {
  /*****************************
   * Redux Global State Properties
   ****************************** */
  const dispatch = useDispatch();
  const {successMsg, errorMsg} = useSelector(state => state.messages)
  const {loading} = useSelector(state => state.loading)


  const [clientErrorMsg, setClientErrorMsg] = useState('')
  const [category, setCategory] = useState("");
  const handleCategoryChange = (evt) => {
    dispatch(clearMessages())
    setCategory(evt.target.value);
  };

  const handleCategorySubmit = (evt) => {
    evt.preventDefault();
    if (isEmpty(category)) {
      setClientErrorMsg('Please enter a Category');
    } else {
      const data = { category };
      console.log(data)
      dispatch(createCategory(data));
      setCategory('');
    }
  };

  const handleMessages = (evt) => {
    dispatch(clearMessages())
  };

  /*********************
   * LifeCycle Methods
   ************************/

  return (
    <div id="addCategoryModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add Category</h5>
              <button className="close" data-dismiss="modal">
                <span>
                  <i className="fas fa-times"></i>{" "}
                </span>
              </button>
            </div>
            <div className="modal-body my-2">
              {clientErrorMsg && showErrorMessage(clientErrorMsg)}
              {errorMsg && showErrorMessage(errorMsg)}
              {successMsg && showSuccessMessage(successMsg)}
              {loading ? (
                <div className="text-center"> {showLoading()}</div>
              ) : (
                <>
                  <label className="text-secondary">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g.. Beverages"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-info mr-auto">
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

export default AdminCategoryModal;

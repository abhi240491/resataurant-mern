import React,{useEffect} from "react";
import AdminHeader from "../components/AdminHeader";
import AdminActionButtons from "../components/AdminActionButtons";
import AdminCategoryModal from "../components/AdminCategoryModal";
import AdminProductModal from "../components/AdminProductModal";
import AdminBody from "../components/AdminBody";
import {useDispatch} from 'react-redux';
import {getCategories} from '../redux/actions/categoryActions';
import {getProducts} from '../redux/actions/productActions'
const AdminDashboard = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch]);

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);

  return (
    <section>
      <AdminHeader/>
      <AdminActionButtons/>
      <AdminCategoryModal/>
      <AdminProductModal/>
      <AdminBody/>
    </section>
  );
};

export default AdminDashboard;

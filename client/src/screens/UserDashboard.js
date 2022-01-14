import React,{useEffect} from 'react';
import UserBody from '../components/UserBody';
import {useDispatch} from 'react-redux';
import {getProducts} from '../redux/actions/productActions'
import {getCategories} from '../redux/actions/categoryActions'
const  UserDashboard = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProducts());
      },[dispatch]);
    
    useEffect(() => {
        dispatch(getCategories())
    },[dispatch])

    return(
        <UserBody/>
    )
}

export default UserDashboard;
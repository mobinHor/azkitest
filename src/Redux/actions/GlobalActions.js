import * as t from '../Types'
import axios from 'axios'


export const AuthUser = (form)=> (dispatch , getState) =>{
    if(getState().Global.userInfo){
        return true
    }else{
        return false
    }
}

export const StoreUserInfo = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_USER_INFO,
        payload : form
    })
}
export const StoreCarForm = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_CAR_FORM,
        payload : form
    })
}
export const StoreCompForm = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_COMP_FORM,
        payload : form
    })
}
export const StoreDiscountForm = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_DISCOUNT_FORM,
        payload : form
    })
}

export const GetCarTypes = async () =>{

    return await axios(`${process.env.REACT_APP_API_KEY}product/vehicle/models/third`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res=>{
            return res.data
        })
        .catch(error=>{
            return []
        })
}

export const GetInsuranceCompanies = async () =>{

    return await axios(`${process.env.REACT_APP_API_KEY}product/third/companies`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res=>{
            return res.data
        })
        .catch(error=>{
            return []
        })
}

export const GetThirdDiscounts = async () =>{

    return await axios(`${process.env.REACT_APP_API_KEY}product/third/third-discounts`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res=>{
            return res.data
        })
        .catch(error=>{
            return []
        })
}
export const GetDriverDiscounts = async () =>{

    return await axios(`${process.env.REACT_APP_API_KEY}product/third/driver-discounts`,{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(res=>{
            return res.data
        })
        .catch(error=>{
            return []
        })
}

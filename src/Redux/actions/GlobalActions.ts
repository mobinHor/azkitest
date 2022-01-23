import * as t from '../Types'
import axios from 'axios'

// fake authorizing user
export const AuthUser = ()=> (dispatch , getState) =>{
    if(getState().Global.userInfo){
        return true
    }else{
        return false
    }
}

// storing userInfo comming from RegistrationPage to REDUX
export const StoreUserInfo = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_USER_INFO,
        payload : form
    })
}

// storing carForm comming from CarSelectPage to REDUX
export const StoreCarForm = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_CAR_FORM,
        payload : form
    })
}

// storing ComForm comming from PreviousInsurancePage to REDUX
export const StoreCompForm = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_COMP_FORM,
        payload : form
    })
}

// storing DiscountForm comming from DiscountPage to REDUX
export const StoreDiscountForm = (form)=> (dispatch) =>{
    dispatch({
        type : t.STORE_DISCOUNT_FORM,
        payload : form
    })
}

// calling ENDPOINT to get the CarTypes list to use in CarSelectPage
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

// calling ENDPOINT to get the Companies list to use in PreviousInsurancePage
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

// calling ENDPOINT to get the Thid discounts list to use in DiscountPage
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

// calling ENDPOINT to get the Driver discounts list to use in DiscountPage
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

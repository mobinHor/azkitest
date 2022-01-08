import * as t from '../Types'

const GlobalState = {
    userInfo : undefined,
    carForm : undefined,
    compForm : undefined,
    discountForm : undefined
}

const GlobalReducer = (state=GlobalState , action)=>{
    switch (action.type) {
        case t.STORE_USER_INFO: return{
            ...state,
            userInfo : action.payload
        }
        case t.STORE_CAR_FORM: return{
            ...state,
            carForm : action.payload
        }
        case t.STORE_COMP_FORM: return{
            ...state,
            compForm : action.payload
        }
        case t.STORE_DISCOUNT_FORM: return{
            ...state,
            discountForm : action.payload
        }
        default: return{
            ...state
        }
    }
}


export default GlobalReducer


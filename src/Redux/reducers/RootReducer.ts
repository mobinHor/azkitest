import { combineReducers } from "redux";
import GlobalReducer from "./GlobalReducer";


// combining all reducers into one Reducer , this will be used in configuring the store
const RootReducer = combineReducers({
    Global : GlobalReducer
})

export default RootReducer
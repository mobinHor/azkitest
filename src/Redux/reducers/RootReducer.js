import { combineReducers } from "redux";
import GlobalReducer from "./GlobalReducer";


const RootReducer = combineReducers({
    Global : GlobalReducer
})

export default RootReducer
import { createStore , applyMiddleware } from "redux";
import RootReducer from "./reducers/RootReducer";
import thunkMiddleware from "redux-thunk"

// binding redux-devtools-extension with thunk to the store enhancer , ONLY on development
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const Store = createStore(
    RootReducer , 
    bindMiddleware([thunkMiddleware])
)


export default Store
import AuthReducer from "./authReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    authReducer: AuthReducer,
})

export default rootReducer
import AuthReducer from "./authReducer"
// import UsersReducer from "./usersReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    authReducer: AuthReducer,
    // usersReducer: UsersReducer
})

export default rootReducer
const initState = {
    userOnLogin: null,
    isLogin: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN":
            const userOnLogin = action.payload
            return {
                userOnLogin,
                isLogin: true
            }
        case "LOGOUT":
            return {
                userOnLogin: null,
                isLogin: false
            }
            
        default:
            return state
    }
}

export default AuthReducer
export const setLogin = (user) => {
    return {
            type: "LOGIN",
            payload: user
    }        
}

export const setLogout = () => {
    return {
        type: "LOGOUT"
    }
}
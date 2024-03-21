const defaultState = {
    isLoggedIn : false,
    email : undefined,
    name : undefined,
    surname : undefined,
    logoPath : undefined,
    password : undefined
}

const authReducer = (state = {... defaultState}, action) => {
    if(action.type === 'logout-success') {
        return defaultState;
    }
    else if(action.type === 'login-user-success') {
        return {
            ... action.data,
            isLoggedIn : true
        };
    }
    else if(action.type === 'update-user-success') {
        return {
            ... state,
            name : action.data.name,
            surname : action.data.surname,
            logoPath : action.data.logoPath
        }
    }
    else if(action.type === 'login-company-success') {
        return {
            ... action.data,
            isLoggedIn : true
        }
    }
    return state;
};

export default authReducer;
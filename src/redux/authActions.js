import { signUpUser, loginUser } from "../api/apiCalls";

export const logoutSuccess = () => {
    return {
        type : 'logout-success'
    };
}

export const loginSuccess = (loginData) => {
    return {
        type : 'login-success',
        data : loginData

    }
}

export const updateSuccess = ({ displayName, image }) => {
    return {
        type : 'update-success',
        data : {
            displayName,
            image
        }
    }
}

export const loginUserHandler = (creds) => {
    return async function(dispatch) {
        const response = await loginUser(creds);

        const loginState = {
            username : creds.username,
            displayName : response.data.displayName,
            password : creds.password,
            image : response.data.image
        }
                
        dispatch(loginSuccess(loginState));

        return response;
    }
}

export const signUpUserHandler = (user) => {
    return async function(dispatch) {
        const response = await signUpUser(user);
        //await dispatch(loginUserHandler(user));
        console.log(response);
        return response
    }
}
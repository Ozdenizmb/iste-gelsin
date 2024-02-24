//import { login, signUp } from "../api/apiCalls";
import { getProduct1 } from "../api/apiCalls";

export const getProduct1Success = () => {
    return {
        type : 'get-product'
    };
}

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

export const getProduct1Handler = () => {
    return async function(dispatch) {
        try {
            const response = await getProduct1();
            dispatch(getProduct1Success(response.data)); // Eğer başarılı ise response'ı action'a ekleyebilirsiniz.
            console.log(response.data);
        } catch (error) {
            console.log("Error: ", error);
        }

        
    }
}

export const loginHandler = (creds) => {
    return async function(dispatch) {
        //const response = await login(creds);

        const loginState = {
            username : creds.username,
            //displayName : response.data.displayName,
            displayName : "asd",
            password : creds.password,
            //image : response.data.image
            image : "asd"
        }
                
        dispatch(loginSuccess(loginState));

        //return response;
    }
}

export const signUpHandler = (user) => {
    return async function(dispatch) {
        //const response = await signUp(user);
        await dispatch(loginHandler(user));
        //return response
    }
}
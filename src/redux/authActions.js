import { signUpUser, loginUser, signUpCompany, loginCompany } from "../api/apiCalls";

export const logoutSuccess = () => {
    return {
        type : 'logout-success'
    };
}

export const loginUserSuccess = (loginData) => {
    return {
        type : 'login-user-success',
        data : loginData

    }
}

export const updateUserSuccess = ({ name, surname, password, logo_path }) => {
    return {
        type : 'update-user-success',
        data : {
            name,
            surname,
            password,
            logoPath: logo_path
        }
    }
}

export const loginCompanySuccess = (loginData) => {
    return {
        type : 'login-company-success',
        data : loginData
    }
}

export const loginUserHandler = (creds) => {
    return async function(dispatch) {
        const response = await loginUser(creds);

        const loginState = {
            id : response.data.data.userid,
            email : creds.email,
            name : response.data.data.name,
            surname : response.data.data.surname,
            password : creds.password,
            logoPath : response.data.data.logo_path
        }     
        dispatch(loginUserSuccess(loginState));
        console.log(loginState);

        return response;
    }
}

export const signUpUserHandler = (user) => {
    return async function(dispatch) {
        const response = await signUpUser(user);
        //await dispatch(loginUserHandler(user));
        return response
    }
}

export const loginCompanyHandler = (creds) => {
    return async function(dispatch) {
        const response = await loginCompany(creds);

        const loginState = {
            id : response.data.data.companyid,
            email : creds.email,
            name : response.data.data.company_name,
            password : creds.password,
            logoPath : response.data.data.logo_path
        }
        dispatch(loginCompanySuccess(loginState));

        return response;
    }
}

export const signUpCompanyHandler = (company) => {
    return async function() {
        const response = await signUpCompany(company);
        return response;
    }
}
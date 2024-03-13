import axios from "axios";

export const signUpUser = body => {
    return axios.post("/api/v1/User", body);
}

export const loginUser = creds => {
    return axios.get("/api/v1/User", creds);
}

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if(isLoggedIn) {
        const userInfo = username + ":" + password;
        const convertBasic = btoa(userInfo);
        const authorizationHeaderValue = "Basic " + convertBasic;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }
    else {
        delete axios.defaults.headers['Authorization'];
    }
};
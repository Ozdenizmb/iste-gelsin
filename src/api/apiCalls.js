import axios from "axios"

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
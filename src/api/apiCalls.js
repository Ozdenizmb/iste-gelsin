import axios from "axios"

export const getProduct1 = () => {
    return axios.get('/api/v1.0/Product/1');
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
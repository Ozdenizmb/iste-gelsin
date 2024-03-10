import axios from "axios";

export const signUpUser = body => {
    return axios.post("/api/v1/User", body, {
        headers: {
            'User': 'true'
        }
    });
}

export const loginUser = () => {
    return axios.get("/api/v1/User");
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
import axios from "axios";

export const signUpUser = body => {
    return axios.post("/api/v1/User", body);
}

export const loginUser = creds => {
    const { email, password } = creds;
    return axios.get(`/api/v1/User/Login?email=${email}&password=${password}`);
}

export const getUser = () => {
    return axios.get("/api/v1/User");
}

export const signUpCompany = body => {
    return axios.post("/api/v1/Company", body);
}

export const loginCompany = creds => {
    const { email, password } = creds;
    return axios.get(`/api/v1/Company/Login?email=${email}&password=${password}`);
}

export const getCompany = () => {
    return axios.get("/api/v1/Company", { headers: { company: true } });
}

export const setAuthorizationHeader = (userData) => {
    if(userData.isLoggedIn) {
        const { email, password } = userData;
        const userInfo = email + ":" + password;
        const convertBasic = btoa(userInfo);
        const authorizationHeaderValue = "Basic " + convertBasic;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }
    else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const updateUser = (body) => {
    return axios.put("/api/v1/User", body);
}

export const updateCompany = (body) => {
    return axios.put("/api/v1/Company", body, { headers: { company: true } });
}

export const getJobPostingAll = () => {
    return axios.get("/api/v1/JobPosting/List");
}

export const getJobPosting = (body) => {
    return axios.get("/api/v1/JobPosting?jobPostingId=" + body);
}

export const getJobPostingByCompanyId = (companyId) => {
    return axios.get("/api/v1/JobPosting/ListByCompany?companyId=" + companyId);
}
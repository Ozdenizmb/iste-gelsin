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

export const getJobPostingAll = (pageNumber, pageSize) => {
    return axios.get(`/api/v1/JobPosting/List?workModelId=0&pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export const getJobPosting = (postId) => {
    return axios.get("/api/v1/JobPosting?jobPostingId=" + postId);
}

export const getJobPostingByCompanyId = (companyId, pageNumber, pageSize) => {
    return axios.get(`/api/v1/JobPosting/ListByCompany?companyId=${companyId}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export const updateJobPosting = (body) => {
    return axios.put("/api/v1/JobPosting", body, { headers: { company: true } });
}

export const deleteJobPosting = (postId, body) => {
    return axios.patch("/api/v1/JobPosting?jobPostingId=" + postId, body, { headers: { company: true } });
}

export const insertJobPosting = (body) => {
    return axios.post("/api/v1/JobPosting", body, { headers: { company: true } });
}

export const postJobApplication = (body) => {
    return axios.post("/api/v1/JobApplication", body);
}

export const getJobApplication = (jobId, userId) => {
    return axios.get(`/api/v1/JobApplication?job_postingid=${jobId}&userid=${userId}`);
}

export const getJobApplicationUseTheByCompany = (jobId, userId) => {
    return axios.get(`/api/v1/JobApplication?job_postingid=${jobId}&userid=${userId}`, { headers: { company: true } });
}

export const getListJobApplication = (id) => {
    return axios.get("/api/v1/JobApplication/ListByJobPosting?job_postingid=" + id, { headers: { company: true } });
}

export const getListJobApplicationForUser = () => {
    return axios.get("/api/v1/JobApplication/ListByUser");
}

export const updateAcceptOrRejectApplication = (body) => {
    return axios.put("/api/v1/JobApplication", body, { headers: { company: true } });
}

export const getJobApplicationAcceptedForUser = () => {
    return axios.get("/api/v1/JobApplication/ListJobsAcceptedByUser");
}

export const postWorkAttendance = (body) => {
    return axios.post("/api/v1/WorkAttendance", body);
}

export const getWorkAttendance = (postId, userId) => {
    return axios.get(`/api/v1/WorkAttendance?job_postingid=${postId}&userid=${userId}`);
}

export const putWorkAttendance = (postId, userId, otp) => {
    return axios.put(`/api/v1/WorkAttendance/VerifyOTP?job_postingid=${postId}&userid=${userId}&otp=${otp}`, null, { headers: { company: true } });
}

export const postJobFeedbackForUser = (body) => {
    return axios.post("/api/v1/JobFeedback", body);
}

export const postJobFeedbackForCompany = (body) => {
    return axios.post("/api/v1/JobFeedback", body, { headers: { company: true } });
}
import axios from 'axios'

const API = axios.create({
    // baseURL: "http://localhost:5000/api/v1/users",
    baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/users",
    withCredentials: true,
});

const notesAPI = axios.create({
    //baseURL: "http://localhost:5000/api/v1/notes",
    baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/notes",
    withCredentials: true,
});

const videoAPI = axios.create({
    //baseURL: "http://localhost:5000/api/v1/videos",
        baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/videos",
    withCredentials: true,
});

const discussionAPI =  axios.create({
    //baseURL: "http://localhost:5000/api/v1/discussions",
    baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/discussions",
    withCredentials: true,
});

export {API, notesAPI, videoAPI, discussionAPI};
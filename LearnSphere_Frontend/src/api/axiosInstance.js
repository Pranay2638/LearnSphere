import axios from 'axios'

const API = axios.create({
    baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/users",
    withCredentials: true,
});

const notesAPI = axios.create({
    baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/notes",
    withCredentials: true,
});

const videoAPI = axios.create({
    baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/videos",
    withCredentials: true,
});

const discussionAPI =  axios.create({
    baseURL: "https://learnsphere-1s3z.onrender.com/api/v1/discussions",
    withCredentials: true,
});

export {API, notesAPI, videoAPI, discussionAPI};
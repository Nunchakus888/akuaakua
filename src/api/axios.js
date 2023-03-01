import A from 'axios';

const axios = A.create({
    baseURL: '/api'
    // baseURL: 'https://api.example.com'
});

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // console.warn(response.config.url, '--', response);
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { status, data } = response;
        if (status === 200) {
            if (data) {
                const { code, info } = data;
                if (code === 401) {
                    location.replace('/login');
                    throw new Error({ ...data });
                }
            }
            return data;
        }
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status, statusText } = error?.response || {};
        if (status === 401) {
            const stayPut = /^\/login|\/$/.test(location.pathname);
            if (!stayPut) location.replace('/login');
            return error.response;
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default axios;

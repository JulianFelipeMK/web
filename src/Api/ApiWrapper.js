import axios from 'axios'

// const getToken = async () => await AsyncStorage.getItem("access-token")

const client = axios.create({
    baseURL: "https://api-sgp-final.herokuapp.com",
    // auth: { Authorization: 'Bearer ' + { getToken } }
});

export const apiCall = function (method, route, body = null) {

    const onSuccess = function (response) {
        return response.data;
    }

    const onError = function (error) {
        console.error('Request Failed:', error.config);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        } else {
            console.error('Error Message:', error.message);
        }
        return Promise.reject(error.response || error.message);
    }

    return client({
        method,
        url: route,
        data: body
    }).then(onSuccess)
        .catch(onError);
}
import axios from 'axios';
import apiConfig from '../api/apiConfig';

export const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    params: {
        api_key: apiConfig.apiKey
    }
});

export const fetchToken = async () => {
    try {
        const { data } = await axiosClient.get('authentication/token/new');
        const token = data.request_token

        if(data.success) {
            localStorage.setItem('request_token', token);
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log("Sorry, your token could not be created")
    }
}

export const createSessionId = async () => {
    const token = localStorage.getItem('request_token');
    if (token) {
        try {
            const { data: { session_id } } = await axiosClient.post('authentication/session/new', {
                request_token: token,
            });
            localStorage.setItem('session_id', session_id);
            return session_id;
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteSession = async () => {
    const session = localStorage.getItem('session_id');
    try {
        const { data } = await axiosClient.delete('authentication/session', {
            data: {
                session_id: session
            }
        });
        localStorage.removeItem('request_token');
        localStorage.removeItem('session_id');
    } catch (error) {
        console.log("Sorry, your token could not be created")
    }
}
import axios from 'axios';
import { API_URL } from 'constants/api.constant';

const login = async ({ username, password }) => {
    try {
        const response = await axios.post(API_URL + '/api/login', {
            username,
            password,
        });

        if (response.status === 200) {
            // If login is successful, store the received token in localStorage or any other secure storage.
            localStorage.setItem('authToken', response.data.token);

            // Set the authorization header for all subsequent requests.
            axios.defaults.headers.common[
                'Authorization'
            ] = `${response.data.token}`;

            return response.data;
        } else {
            // Handle errors, e.g. incorrect username/password, server errors, etc.
            console.error('Error logging in:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        return null;
    }
};

export default login;

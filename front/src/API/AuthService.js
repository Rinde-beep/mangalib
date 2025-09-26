
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export default class AuthService {
    static async login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    static async register(email, password) {
        try {
            const response = await axios.post(`${API_URL}/auth/reg`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    static async logout() {
        try {
            const response = await axios.post(`${API_URL}/auth/logout`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}

import axios from "axios";
const API_URL = 'http://127.0.0.1:8000/api'
export default class PostService {
    static async getAll(page) {
        const response = await axios.get(`${API_URL}/catalog`, {
            params: {
        
                page: page
            }
        })
        return response;
    }

    static async getByName(name) {
        const response = await axios.get(`${API_URL}/manga/${name}`)
        return response;
    }

    static async getFilter(params) {
        const response = await axios.get(`${API_URL}/catalog?${params}`)
        return response;
    }

}
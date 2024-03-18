// ApiService.ts
import axios, {AxiosInstance, AxiosResponse} from 'axios'

class ApiService {
    private axiosInstance: AxiosInstance

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.example.com', // Set your API base URL
            timeout: 10000, // Set a timeout for requests
            headers: {
                'Content-Type': 'application/json', // Set default headers
            },
        })
    }
}

export default new ApiService()

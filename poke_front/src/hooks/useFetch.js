import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/pokemon`;


function useFetch() {
    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`)
            return response.data
        } catch (error) {
            console.error("Erro na requisição:", error)
            throw error
        }
    }

    return fetchData
}

export default useFetch;
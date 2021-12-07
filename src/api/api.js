import axios from "axios";


const apiKey = '24684226-fad981b2aba9a8597288ef8d8'
const url = 'https://pixabay.com/api/'
const per_page = 40

export const api = {
    fetchImage(inputValue, page = 1) {
        return axios.get(`${url}?key=${apiKey}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`)
            .then(response => response.data)
    }
}

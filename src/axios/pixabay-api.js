import axios from "axios";

export default class PixabayApi {
    
    constructor() {
        this.searchQuery = '';
        this.page = 1
    }

    fetchImages() {
        console.log(this)
        const apiKey = '24684226-fad981b2aba9a8597288ef8d8'
        const url = 'https://pixabay.com/api/'
        const per_page = 40

        return axios.get(`${url}?key=${apiKey}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${per_page}`)
             .then(res => {
                this.incrementPage()
                return res.data.hits
             })
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
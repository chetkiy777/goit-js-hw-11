
import Notiflix from "notiflix"
import axios from "axios"
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
}


refs.form.addEventListener('submit', loadImages)
refs.loadMoreBtn.addEventListener('click', loadMoreImages)

class ApiService {
    constructor() {
        this.searchQuery = ''
        this.page = 1
    }

    async fetchImages() {
        console.log(this)
        const apiKey = '24684226-fad981b2aba9a8597288ef8d8'
        const url = 'https://pixabay.com/api/'
        const per_page = 40

        return await axios.get(`${url}?key=${apiKey}&q=${this.searchQuery}&page=${this.page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`)
            .then(response => response.data.hits)
        
    }

    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }


}

const api = new ApiService()
 
async function loadImages(e) {
    e.preventDefault()

    clearGallery()

    api.resetPage()

    api.searchQuery = e.currentTarget.elements.searchQuery.value

    const objArray = await api.fetchImages()

    api.incrementPage()

    toggleLoadMoreBtn()

    renderImages(objArray)

   
}

async function loadMoreImages() {
    const objArray = await api.fetchImages()
    renderImages(objArray)
}

function clearGallery() {
    refs.galleryContainer.innerHTML = ''
}

function toggleLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('is-hidden')
}

function renderImages(objArray) {
    const markup = objArray.map(obj => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = obj
        
        return `
            <div class="photo-card">
                <a href=${largeImageURL}>    
                    <img class="photos" src=${webformatURL} alt=${tag} data-source=${largeImageURL} loading="lazy" title=${tags}>
                </a>

                <div class="info">
                    <p class="info-item">
                        <b>Likes: </b> ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views: </b> ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments: </b> ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads: </b> ${downloads}
                    </p>

                </div>
            </div>
            `
    })
        refs.galleryContainer.insertAdjacentHTML('beforeend', markup)
}

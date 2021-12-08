import PixabayApi from './axios/pixabay-api.js'
import renderGallery from './js/renderGallery.js';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// var lightbox = new SimpleLightbox('.photo-card a', { /* options */ });


const pixabayApiService = new PixabayApi()

const refs = {
     form: document.querySelector('.search-form'),
     loadMoreBtn: document.querySelector('[data-load]'),
     galleryContainer: document.querySelector('.gallery'),
}


refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoad)
refs.galleryContainer.addEventListener('click', onFullScreen)

async function onSearch(e) {
    e.preventDefault()
    
    pixabayApiService.searchQuery = e.currentTarget.elements.searchQuery.value
    pixabayApiService.resetPage()
    await pixabayApiService.fetchImages().then(renderGallery)
    isLoadBtnVisible()
}

async function onLoad() {
   await pixabayApiService.fetchImages().then(renderGallery)
}

function onFullScreen(e) {
    if (e.target.nodeName === 'IMG') {
        console.log(e)
    }
}

function isLoadBtnVisible() {
    refs.loadMoreBtn.classList.toggle('is-hidden')
}







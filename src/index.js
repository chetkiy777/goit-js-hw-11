import PixabayApi from './axios/pixabay-api.js'
import renderGallery from './js/renderGallery.js';

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


    // api.fetchImage(inputValue).then(data => {
    //     return data.hits
    // }).then(renderGallery)

}

async function onLoad() {
   await pixabayApiService.fetchImages().then(renderGallery)
}

function onFullScreen(e) {
    // e.currentTarget.nodeName === 'IMG' && console.log(e)
    if (e.currentTarget.nodeName === IMG) {
        console.log(e.currentTarget)
    }
}







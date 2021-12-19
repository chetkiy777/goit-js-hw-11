import ApiService from "./js/apiService"
import renderService from "./js/renderService"
import Notiflix from "notiflix"


const api = new ApiService()
const renderMaker = new renderService()

const refs = {
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
    fetchDataBtn: document.querySelector('[data-load="getData"]'),
}

refs.form.addEventListener('submit', renderImage)
refs.loadMoreBtn.addEventListener('click', loadMore)

function renderImage(e) {
    e.preventDefault()
    api.resetPage()
    renderMaker.hideLoadBtn()
    api.searchQuery = e.currentTarget.elements.searchQuery.value.trim()
    
    if (api.searchQuery === '') {
        return
    }
    
    renderMaker.clearGallery()

    api.fetchImages()
        .then(data => {
            if (data.totalHits === 0) {
                return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')    
            }
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)   
            renderMaker.renderImages(data.hits)
            api.incrementPage()
            renderMaker.showLoadBtn()
        })     
    }
        
function loadMore() {
    if (api.totalHits < 0) {
            renderMaker.hideLoadBtn()
            return Notiflix.Notify.info('We&#x60;re sorry, but you&#x60;ve reached the end of search results.')
    }
    
        renderMaker.hideLoadBtn()
        api.fetchImages().then(data => renderMaker.renderImages(data.hits))
        api.incrementPage()
        renderMaker.showLoadBtn()
    }




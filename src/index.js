import ApiService from "./js/apiService"
import renderService from "./js/renderService"
import Notiflix from "notiflix"

const api = new ApiService()
const renderMaker = new renderService()

const refs = {
    form: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', renderImage)
refs.loadMoreBtn.addEventListener('click', loadMore)

function renderImage(e) {
    e.preventDefault()
    api.searchQuery = e.currentTarget.elements.searchQuery.value

    if (api.searchQuery === '') {
        return Notiflix.Notify.info('Введите корректные данные!')
    }  
         
    renderMaker.clearGallery()


    api.fetchImages()
        .then(hits => {
            if (hits.length === 0) {
                return  Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
                
            }

            renderMaker.renderImages(hits)
              Notiflix.Notify.success(`Hooray! We found ${api.totalHits} images.`)
        }) 
        .then(() => renderMaker.showLoadBtn())
        
    
}
     

function loadMore() {

    api.fetchImages().then(renderMaker.renderImages)
}



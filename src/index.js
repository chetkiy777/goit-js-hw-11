import ApiService from "./js/apiService"
import renderService from "./js/renderService"
import Notiflix from "notiflix"
import { debounce } from "lodash"
// import preloader from "./js/preloader"


const api = new ApiService()
const renderMaker = new renderService()

const refs = {
    form: document.querySelector('.search-form'),
    // loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
    fetchDataBtn: document.querySelector('[data-load="getData"]'),
    preloader: document.querySelector('[data-loader]'),
}

refs.form.addEventListener('submit', renderImage)
// refs.loadMoreBtn.addEventListener('click', loadMore)


function  onScroll() {  
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight

  const scrolled = window.scrollY

  const threshold = height - screenHeight / 4

  const position = scrolled + screenHeight

    if (position >= threshold) {
      loadMore()
  }
}

function renderImage(e) {
    
    e.preventDefault()
    toggleLoader()
    api.resetPage()
    // renderMaker.hideLoadBtn()
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
            toggleLoader()
            renderMaker.renderImages(data.hits)
            api.incrementPage()

            // renderMaker.showLoadBtn()
            window.addEventListener('scroll', debounce(onScroll, 500))
        })     
    }
        
function loadMore() {
    
    if (api.totalHits < 0) {
        // renderMaker.hideLoadBtn()
        return Notiflix.Notify.info('We&#x60;re sorry, but you&#x60;ve reached the end of search results.')
    }
    toggleLoader()
    // renderMaker.hideLoadBtn()
    api.fetchImages().then(data => {
        toggleLoader()
        renderMaker.renderImages(data.hits)
        api.incrementPage()
    })
}

function toggleLoader() {
    refs.preloader.classList.toggle('is-hidden')
}

    

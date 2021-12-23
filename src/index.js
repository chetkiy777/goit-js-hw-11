import ApiService from "./js/apiService"
import renderService from "./js/renderService"
import Notiflix from "notiflix"
import { debounce } from "lodash"



const api = new ApiService()
const renderMaker = new renderService()

const refs = {
    form: document.querySelector('.search-form'),
    // loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery'),
    fetchDataBtn: document.querySelector('[data-load="getData"]'),
    loader: document.querySelector('[data-loader]'),
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

    api.resetPage()
    
    api.searchQuery = e.currentTarget.elements.searchQuery.value.trim()
    
    if (api.searchQuery === '') {
        return Notiflix.Notify.warning('please enter more query to find!')
    }
    
    renderMaker.clearGallery()
    toggleLoader()
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
    // renderMaker.hideLoadBtn()
        toggleLoader()
        api.fetchImages().then(data => {
            toggleLoader()
        renderMaker.renderImages(data.hits)
        api.incrementPage()
    })
}

function toggleLoader() {
    refs.loader.classList.toggle('is-hidden')
}

    

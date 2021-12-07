import { api } from './api/Api.js';
import renderGallery from './js/renderGallery.js';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('[data-load]')

form.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault()
    const form = e.currentTarget
    const inputValue = form.elements.searchQuery.value

    api.fetchImage(inputValue).then(data => {
        return data.hits
    }).then(renderGallery)
    
    loadMoreBtn.classList.remove('is-hidden')
}

loadMoreBtn.addEventListener('click', () => {
    const inputValue = form.elements.searchQuery.value


    api.fetchImage(inputValue, page += 1).then(data => {
        return data.hits
    }).then(renderGallery)
})





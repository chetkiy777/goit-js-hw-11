import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class renderService {

    renderImages(objArray) {
            const markup = objArray.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `
                <article class="card">
                    <div class="img__thumb">
                        <a class="img__link" href=${largeImageURL}>
                            <img src=${webformatURL} data-source=${largeImageURL} alt="${tags}" title="${tags}">
                        </a>
                    </div>
                    <ul class="img-info__list">

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>likes</b> ${likes}
                            </p>
                        </li>

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>comments</b> ${comments}
                            </p>
                        </li>

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>downloads</b> ${downloads}
                            </p>
                        </li>

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>views</b> ${views}
                            </p>
                        </li>

                    </ul>
                </article>
                `
        })
        
        document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup)
        
        var lightbox = new SimpleLightbox('.gallery a', { /* options */ });
        lightbox.refresh()
    }
    
    clearGallery() {
        document.querySelector('.gallery').textContent = ''
    }

    // showLoadBtn() {
    //     document.querySelector('.load-more').classList.remove('is-hidden')
    // }

    // hideLoadBtn() {
    //     document.querySelector('.load-more').classList.add('is-hidden')
    // }

}
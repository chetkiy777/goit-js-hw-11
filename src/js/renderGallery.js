import cleanGallery from "./cleanGallery"

const galleryContainer = document.querySelector('.gallery')

export default function renderGallery(objArray) {
    cleanGallery()
    objArray.map(obj => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = obj
        const markup = `
            <div class="photo-card">
                <img src=${webformatURL} alt="${tags}" loading="lazy" />

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
        galleryContainer.insertAdjacentHTML('afterbegin',markup)
    })
}


// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
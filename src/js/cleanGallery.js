const galleryContainer = document.querySelector('.gallery');

export default function cleanGallery() {
    return galleryContainer.innerHTML = ''
}
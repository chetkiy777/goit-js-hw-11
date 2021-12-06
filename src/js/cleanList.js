export default function clearList() {
    const list = document.querySelector('.country-list')
    const info = document.querySelector('.country-info')
    list.textContent = ''
    info.textContent = ''
}
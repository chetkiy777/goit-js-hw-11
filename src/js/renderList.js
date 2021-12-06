import clearList from "./cleanList"

export default function renderCountryList(countrysArray) {
    clearList()
    
    countrysArray.map(country => {
        const list = document.querySelector('.country-list')
        const { name, flags } = country
        return list.insertAdjacentHTML('afterbegin',
            `<li class="list__item">
                <div class="list__img-thumb">
                    <img src="${flags.png}" alt="flag-mini">
                </div>
                <p class="list__text">${name}</p>
            </li>`)
        }  
    )} 
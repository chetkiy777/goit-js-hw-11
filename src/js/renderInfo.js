import clearList from "./cleanList"

export default function renderCountryInfo(countryArray) {
    
    const card = document.querySelector('.country-info')
     clearList()
     countryArray.map(country => {
         const { name, capital, population, flags, languages } = country
         let language = languages.map(language => language.name).join(', ')

        return card.innerHTML = `
            <article class="card">
                
                <div class="card__img-thumb">
                    <img src=${flags.png} alt="flags">
                    <h1 class="card__title">${name}</h1>
                </div>
                <p class="card__item"><b>capital: </b>${capital}</p>
                <p class="card__item"><b>languages: </b>${language}</p>
                <p class="card__item"><b>population: </b>${population}</p>
            </article>
            `
    })
}
export default class Country {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountry() {
        const url = `https://restcountries.com/v2/name/${this.searchQuery}?fields=name,capital,population,languages,flags`
        return fetch(url).then(r => {return r.json()})
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}
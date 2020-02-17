const searchElement = document.querySelector('[data-city-search]')
const weatherButton = document.getElementById('searchButton')
let searchElementText = ''


weatherButton.addEventListener('click', () =>{
    searchElementText = searchElement.value
    fetch('/weather', {
         method: 'POSt',

        body: JSON.stringify({
         q: searchElementText
        }),

        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        }
})
.then(res => res.json())
.then(json => console.log(json))
 
})


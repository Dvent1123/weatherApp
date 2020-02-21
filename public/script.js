const searchElement = document.querySelector('[data-city-search]')
const weatherButton = document.getElementById('searchButton')
let searchElementText = ''


weatherButton.addEventListener('click', () =>{
    searchElementText = searchElement.value
    fetch('/weather', {
         method: 'POST',

        body: JSON.stringify({
         q: searchElementText
        }),

        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        }
})
.then(res => res.json())
.then(data => {setWeatherData(data, searchElementText)})
.catch(error =>{
    console.log(error)
})
 
})

const icon = new Skycons({color: '#222'})
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place){
    locationElement.textContent = place
    statusElement.textContent = data.summary
    temperatureElement.textContent = data.temperature
    precipitationElement.textContent = `${data.precipProbability * 100}%`
    windElement.textContent = data.windSpeed
    icon.set('icon', data.icon)
    icon.play()
}


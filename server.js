
if(process.env.NODE !== 'production'){
    require('dotenv').config()
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const express = require('express')
const app = express()
const opencage = require('opencage-api-client')
const axios = require('axios')
let latitude = ''
let longitude = ''
let url =''
app.use(express.json())
app.use(express.static('public'))




app.post('/weather', (req , res) =>{
    
    opencage.geocode(req.body).then(data => {
    // console.log(JSON.stringify(data));
    if (data.status.code == 200) {
        if (data.results.length > 0) {
        var place = data.results[0];
        latitude = place.geometry.lat;
        longitude = place.geometry.lng;
        url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}?units=auto`

        const getWeather = async () => {
          try {
            return await axios.get(url)
          } catch (error) {
            console.error(error)
          }
        }
        const weatherData = async () => {
          const weather = await getWeather()
          res.json(weather.data.currently)
        }
        
        weatherData()

        }
    } else if (data.status.code == 402) {
        console.log('hit free-trial daily limit');
        console.log('become a customer: https://opencagedata.com/pricing'); 
    } else {
        // other possible response codes:
        // https://opencagedata.com/api#codes
        console.log('error', data.status.message);
    }
    }).catch(error => {
    console.log('error', error.message);
     })//.then(data => res.json(data.data.currently))
    

})


app.listen(3000, () =>{
    console.log('Server Started')
})

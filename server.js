
if(process.env.NODE !== 'production'){
    require('dotenv').config()
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const express = require('express')
const app = express()
const opencage = require('opencage-api-client')

app.use(express.json())
app.use(express.static('public'))


app.post('/weather', (req , res) =>{
    console.log(req.body)


    opencage.geocode(req.body).then(data => {
    // console.log(JSON.stringify(data));
    if (data.status.code == 200) {
        if (data.results.length > 0) {
        var place = data.results[0];
        console.log(place.geometry.lat);
        console.log(place.geometry.lng)
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
    });
})


app.listen(3000, () =>{
    console.log('Server Started')
})

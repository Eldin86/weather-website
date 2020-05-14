const request = require('request')

//Assignment
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a5d8fb2e12280128d159c313dd625fa3&query=${latitude},${longitude}`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            //u callback smo proslijedili error, data ne treba jer nemamo data ako imamo error
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            //u callback smo proslijedili error, data ne treba jer nemamo data ako imamo error
            callback('Please specify a valid location identifier using the query parameter')
        } else {
            //u callback smo smo definisali undefined error, i data kao objekat
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                cityName: body.location.name,
                region: body.location.region,
                country: body.location.country
            })
        }
    })
}

module.exports = forecast
const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=22408c1715dc66cc1d17f995c09b444a&query='+ latitude + ',' + longitude
    request ({ url, json: true}, (error, { body }) => {
        //console.log(url)
        //console.log(response.body)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It\'s currentaly ' + body.current.temperature + ' degrees out. The feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast
const request = require ('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=74da6c978b6cc2bce622ffb42d8174f9&query=' + latitude + ',' + longitude + '&units=f'
    
    request({url, json:true}, (error,{body}) =>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' fahrenheit out. It feels like ' + body.current.feelslike + ' fahrenheit out. The wind speed is ' + body.current.wind_speed + '.')
        }
    })
    
}


module.exports = forecast
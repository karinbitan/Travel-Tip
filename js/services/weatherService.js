'use strict'
weather()
function weather() {
    return axios.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=f5b7f5d61c35c7cc714d7e78b327716d')
        .then(res => console.log(res.data))
        // .catch(err => console.log(err))
}

// ('api.openweathermap.org/data/2.5/weather?q={city name}&appid=f5b7f5d61c35c7cc714d7e78b327716d')
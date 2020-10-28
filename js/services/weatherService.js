'use strict';


function getweather(lat,lon) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=f5b7f5d61c35c7cc714d7e78b327716d`)
        .then(res => res.data)
}

export const weatherService = {
    getweather
}
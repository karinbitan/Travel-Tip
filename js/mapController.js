import { storageService } from './services/localStorage.js';
import { mapService } from './services/mapService.js'
import { weatherService } from './services/weatherService.js'
import { locationService } from './services/locationService.js'


var gMap;
console.log('Main!');

mapService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    renderWeather()
    var locations = storageService.loadFromStorage(locationService.STORAGE_KEY);
    console.log(locations);
    var lat = 32.0749831;
    var lng = 34.9120554;
    if (locations.length) {
        lat = locations[locations.length - 1].lat;
        lng = locations[locations.length - 1].lng;
    }
    initMap(lat, lng)
        .then(() => {

            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
    renderLocations();
}

document.querySelector('.go-btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    panTo(35.6895, 139.6917);
})

console.log(document.querySelector('.save-location-btn'))
document.querySelector('.save-location-btn').addEventListener('click', onSaveLocation);

export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            // Create the initial InfoWindow.
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: gMap.center,
            });
            infoWindow.open(gMap);
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                console.log(mapsMouseEvent);
                // Close the current InfoWindow.
                infoWindow.close();
                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
                infoWindow.open(gMap);
            });
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDlZpUHe3SXfAqlIJaalLGphEskyZlXt3Q';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


// Locations

function onSaveLocation() {
    console.log('onSaveLocation');
    var locationLat = gMap.center.lat();
    var locationLng = gMap.center.lng();
    var locationName = document.getElementById('location-name').value;
    console.log(locationName, locationLng, locationLat)
    locationService.setLocation(locationName, locationLat, locationLng);
    var locationName = document.getElementById('location-name').value = '';
    renderLocations();
}


function renderWeather() {
    let htmlWeather = ''
    weatherService.getweather(11.22, 22.11)
        .then(weatherPlace => {
            console.log(weatherPlace);
            console.log(weatherPlace.weather[0].icon);
            htmlWeather += `<h2>Weather today</h2><p>${weatherPlace.name}, ${weatherPlace.sys.country}, ${weatherPlace.weather[0].description}</p>
        <p><span class="deg">${Math.floor((weatherPlace.main.temp - 273.15))}\u2103</span>, tempeture from ${Math.floor((weatherPlace.main.temp_min - 273.15))} to ${Math.ceil((weatherPlace.main.temp_max - 273.15))}\u2103, wind ${weatherPlace.wind.speed}m/s.</p>`
            document.querySelector('.weather-container').innerHTML = htmlWeather;
        })
}


function renderLocations() {
    var locations = locationService.getLocations();
    var strHTMLs = locations.map((location) => {
        return `
        <ul>
        <li>${location.name}</li>
        </ul>
        `
    })
    document.querySelector('.location-table').innerHTML = strHTMLs.join('');
}

//object
import { utilService } from './util-service.js';


var gLocations = [];

function createLocation(name, lat, lng) {
    return {
    id: utilService.makeId(),
    name,
    lat,
    lng,
    weather,
    createdAt: utilService.getFullDate(),
    updatedAt: utilService.getFullDate()
    }
}

function setLocation(name, lat, lng) {
    var location = createLocation(name, lat, lng);
    gLocations.push(location);
}

export const locationService = {
    gLocations,
    createLocation,
    setLocation
}

// function _saveCarsToStorage() {
//     saveToStorage(STORAGE_KEY, gCars)
// }

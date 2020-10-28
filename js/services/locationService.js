//object
import { utilService } from './util-service.js';
import { storageService } from './localStorage.js';


var gLocations = [];
const STORAGE_KEY = 'Locations';

function createLocation(name, lat, lng) {
    return {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        // weather,
        createdAt: utilService.getFullDate(),
        updatedAt: utilService.getFullDate()
    }
}

function getLocations() {
    var locations = storageService.loadFromStorage(STORAGE_KEY);
    console.log(locations);
    if (!locations || !locations.length) {
        locations = [];
    }
    gLocations = locations;
    // saveLocationsToStorage();
    return gLocations;
}

// function getLocations() {
//     return gLocations;
// }

function setLocation(name, lat, lng) {
    var location = createLocation(name, lat, lng);
    gLocations.push(location);
    saveLocationsToStorage();
}


function saveLocationsToStorage() {
    storageService.saveToStorage(STORAGE_KEY, gLocations)
}


export const locationService = {
    gLocations,
    createLocation,
    getLocations,
    setLocation,
    STORAGE_KEY
}

console.log(gLocations);
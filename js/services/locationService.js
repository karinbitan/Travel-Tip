//object
import { utilService } from './util-service.js';

const gLocations = [];

// const gLocation = [{
//     id: utilService.makeId(),
//     name,
//     lat,
//     lng,
//     weather,
//     createdAt: utilService.getFullDate(),
//     updatedAt: utilService.getFullDate()
// }]

// function createLocation

function setLocation(locationName, locationLat, locationLng) {
    gLocation[0].name = locationName;
    gLocation[0].lat = locationLat;
    gLocation[0].lng = locationLng;
}
export const locationService = {
    // gLocation,
    setLocation
}

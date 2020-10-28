//object
import {utilService} from 'util-service.js';


    const gLocation = [{
        id: utilService.makeId(),
        name: getName(locationName),
        lat: getLat(),
        lng: getLng(),
        weather,
        createdAt: utilService.getFullDate(),
        updatedAt: utilService.getFullDate()
    }]



    //get name from user- need to write function at controller
    function getName(locationName){
        return locationName;
    }

    function getLat(lat){
        return lat;
    }

    function getLng(lng){
        return lng;
    }



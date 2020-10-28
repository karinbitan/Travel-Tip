'use strict';

function saveLocationToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadLocationFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}
'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;// Defining our global variables so that we can access them in all functions that they are needed

//Getting geolocation
if(navigator.geolocation)// Checking if the browser has access to the geolocation API
navigator.geolocation.getCurrentPosition(
    function(position) {
        console.log(position)
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(`Your latitude is ${latitude} and your longitude is ${longitude}`)

        const coords =[latitude, longitude]

        map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        //Handling clicks on map
        map.on('click', function(mapE){ // The on() method is not a JS method but rather part of the Leaflet API
            mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
        })
        
        

       
    }, 
    function () {
        console.log('your location was not found')
    }
);

form.addEventListener('submit', function(e){
            e.preventDefault();  
            //Clear input fields
            inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

            //Display Marker
            console.log(mapEvent)
            const {lat, lng} = mapEvent.latlng;

            L.marker([lat,lng])
            .addTo(map)
            .bindPopup(L.popup({
                maxWidth:250,
                minWidth:100,
                autoClose:false,
                closeOnClick: false,
                className:'running-popup',

                }))
            .setPopupContent('Workout')    
            .openPopup();
});

inputType.addEventListener('change', function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});


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

// Defining our global variables so that we can access them in all functions that they are needed

class App {
    #map;
    #mapEvent;
    constructor() { // A constructor method gets called as soon as the page loads
        this._getPosition();
        
form.addEventListener('submit', this._newWorkout.bind(this)); //With events in classes you will need to bind the this keyword. This is because we want the this keyword to point to the object itself and no the event

inputType.addEventListener('change', this._toggleElevationField);

    }

    _getPosition () {
        if(navigator.geolocation)// Checking if the browser has access to the geolocation API
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this) , function () {
            alert('your location was not found')
        })};

    _loadMap (position) {
            console.log(position)
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`Your latitude is ${latitude} and your longitude is ${longitude}`)
    
            const coords =[latitude, longitude]
    
            this.#map = L.map('map').setView(coords, 13);
    
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
    
            
            //Handling clicks on map
            this.#map.on('click', this._showForm.bind(this))
        }
        

    _showForm (mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField () {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout (e) {
        e.preventDefault();  
    //Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    //Display Marker
    console.log(this.#mapEvent)
    const {lat, lng} = this.#mapEvent.latlng;

    L.marker([lat,lng])
    .addTo(this.#map)
    .bindPopup(L.popup({
        maxWidth:250,
        minWidth:100,
        autoClose:false,
        closeOnClick: false,
        className:'running-popup',

        }))
    .setPopupContent('Workout')    
    .openPopup();
    }
}

const app = new App()

//Getting geolocation



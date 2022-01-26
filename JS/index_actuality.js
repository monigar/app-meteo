import { Actuality } from '../modules/actuality.js';
import { Astro } from '../modules/astro.js';

const apiKeyWeather = 'caf2e4af8e8e4a4183c142011210811';
const endpoint_current = 'https://api.weatherapi.com/v1/current.json';
const endpoint_astronomy = 'https://api.weatherapi.com/v1/astronomy.json';

// buscar població ------------------------------------------------/
document.querySelector('#searchButton').addEventListener('click', e => searchLocation(e));
async function searchLocation(e) {
  e.preventDefault();
  const actualCity = document.querySelector('#citySearch').value;
  localStorage.setItem('city', actualCity);
  showDatesToScreen(actualCity);   
}
   
// recupera dades generals desde l'API ----------------------------/ 
async function fetchDataWeather(location){
  const response = await fetch(`${endpoint_current}?key=${apiKeyWeather}&lang=es&q=${location}`);
  return response.ok ? await response.json() : [];   
}

function processDataWeather(data){
  return new Actuality(data);
}

// recupera dades sol i lluna -------------------------------------/
async function fetchAstroWeather(location){
  const response = await fetch(`${endpoint_astronomy}?key=${apiKeyWeather}&lang=es&q=${location}`)
  return response.ok ? await response.json() : [];
}

function processAstroWeather(data){
  return new Astro(data);
}

// mostrar dades generals població -------------------------/ 
function showCurrentDates(actuality, location){
  const poblacio = document.getElementById('poblacio');
  poblacio.textContent = location;
  const tempActual = document.getElementById('temperatura');
  tempActual.textContent = actuality.temp;
  const icon = document.querySelector('.icon_weather');
  icon.src = actuality.icon;
  const feelslike = document.querySelector('.feelslike');
  feelslike.textContent = actuality.feelslike;
  const date = document.querySelector('.hora');
  date.textContent = actuality.hora;
  const wind = document.querySelector('.wind');
  wind.textContent = actuality.wind;
  const rain = document.querySelector('.rain');
  rain.textContent = actuality.rain;
  const humidity = document.querySelector('.humidity');
  humidity.textContent = actuality.humidity;
  const pressure = document.querySelector('.pressure');
  pressure.textContent = actuality.pressure;  
}

// mostrar dades astronomia, sol i lluna --------------------/ 
function showAstronomyDates(astro){
  const sunrise = document.querySelector('.morning');
  sunrise.textContent = astro.sunrise;
  const sunset = document.querySelector('.evening');
  sunset.textContent = astro.sunset;
  const moonImg = document.querySelector('img.luna');
  moonImg.src = astro.getImage();
  const moon = document.querySelector('.moon');
  moon.textContent = astro.getTraduction();
}

// crear llista poblacions preferides en fer click -----------------/
document.querySelector('.btn-favorite').addEventListener('click', addCity);
//localStorage.removeItem('favoritos');

function addCity(){
  const location = document.querySelector('#poblacio').textContent;
  //console.log(location);
  const localStorageKey = 'favoritos';
  let favoritas = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  //console.log(favoritas);
  favoritas.push(location);
  favoritas = [...new Set(favoritas)];
  console.log(favoritas);
  //guardo població preferida
  localStorage.setItem(localStorageKey, JSON.stringify(favoritas)); 
}


/*DOMContentLoaded ------------------------------------------*/
async function showDatesToScreen(location){
  let data;
  try{
    data = await fetchDataWeather(location);
    //console.log(data);
    const actuality = processDataWeather(data);
    showCurrentDates(actuality, data.location.name);
    //console.log(actuality);
  }catch(err){
    alert(`Lo sentimos, no se ha encontrado la población que buscas. Puedes probar también con la región. Por ejemplo: Sort, catalonia`);
  }
  data = await fetchAstroWeather(location);
  //console.log(data);
  const astro =processAstroWeather(data);
  //console.log(astro);
  showAstronomyDates(astro);
  
}

document.addEventListener('DOMContentLoaded', () => {
  const lastCity = localStorage.getItem('city');
  showDatesToScreen(lastCity || 'London'); 
});

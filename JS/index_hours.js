import { Hora } from '../modules/hours.js';
import { Day } from '../modules/days.js';

const apiKeyWeather = 'caf2e4af8e8e4a4183c142011210811';
const endpoint_forecast = "https://api.weatherapi.com/v1/forecast.json";

// recupera dades dies i hores desde l'API ------------------------------/
async function fetchHoursWeather(location){
    const response = await fetch(`${endpoint_forecast}?key=${apiKeyWeather}&days=7&lang=es&q=${location})`);
    return response.ok ? response.json() : [];  
}

function processHoursData(days){
    const hora = days.map(item => item.hour);
    //console.log(hora);
    for( const h of hora){
      return h.map(item => new Hora(item));
    }
}

function processDaysData(data){
    const allDays = data.forecast.forecastday;
    return allDays.map(item => new Day(item));  
}

//recupera dades Template-header -----------------------------------------/
async function fetchTemplatesFromFileHeader(){
  const response = await fetch('template-header.html');
  //console.log(response);
  if(response.ok){
    const templates = document.createElement('template'); //<template></template>
    templates.innerHTML = await response.text();  //<template> ..... </template>
    const headerTemplate = templates.content.querySelector('#template_header').content;
    //console.log(headerTemplate);
    document.querySelector('#header').appendChild(headerTemplate);
    // buscar població ------------------------------------------------/
    document.querySelector('#searchButton').addEventListener('click', e => searchLocation(e));
    async function searchLocation(e) {
      e.preventDefault();
      const actualCity = document.querySelector('#citySearch').value;
      localStorage.setItem('city', actualCity);
      showDatesToScreen(actualCity);   
    } 
  }
}
// recupera dades Template-menu ---------------------------------------/
async function fetchTemplatesFromFileMenu(){
  const response = await fetch('template-menu.html');
  //console.log(response);
  if(response.ok){
    const templateMenu = document.createElement('template'); //<template></template>
    templateMenu.innerHTML = await response.text();  //<template> ..... </template>
    const menuTemplate = templateMenu.content.querySelector('#template_menu').content;
    //console.log(menuTemplate);
    menuTemplate.querySelectorAll('li a')[1].classList.remove('active');
    menuTemplate.querySelectorAll('li a')[1].classList.add('active');
    const clone = menuTemplate.cloneNode(true); 
    document.querySelector('#menu').appendChild(clone);  
  }
}
//recupera dades Template-footer -----------------------------------------/
async function fetchTemplatesFromFileFooter(){
  const response = await fetch('template-footer.html');
  //console.log(response);
  if(response.ok){
    const templateFooter = document.createElement('template'); //<template></template>
    templateFooter.innerHTML = await response.text();  //<template> ..... </template>
    const footerTemplate = templateFooter.content.querySelector('#template_footer').content;
    //console.log(footerTemplate);
    document.querySelector('#footer').appendChild(footerTemplate);
  }
}

/* mostrar població --------------------------------------------------*/
function showCity(data){
  const div = document.querySelector('.cityHours');
  const p = document.createElement('p');
  div.appendChild(p);
  p.textContent = data.location.name;
}

/* mostrar dades hores -----------------------------------------------*/
function showHoursWeather(hours, location){
    const carousel_one = document.querySelector('.one');
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#template-hours').content;
    for(const hour of hours.slice(0,4)){
        //console.log(Hora);
        template.querySelector('.pdg-hour').classList.add('one');
        template.querySelector('p.time').textContent = hour.hora;
        template.querySelector('img').src = hour.icon;
        template.querySelector('img').alt = hour.text;
        template.querySelector('p.temp-size').textContent = hour.tempActual;
        template.querySelector('p.wind').textContent = hour.wind;
        template.querySelector('p.rain').textContent = hour.rain;
        template.querySelector('p.humidity').textContent = hour.humidity;
        template.querySelector('p.pressure').textContent = hour.pressure;
        template.querySelector('p.temp').textContent = hour.feelslike;
        template.querySelector('p.rocio').textContent = hour.rocio;
        template.querySelector('p.uv').textContent = hour.uv;

        const clone = template.cloneNode(true);
        fragment.appendChild(clone);    
    }
    carousel_one.appendChild(fragment);
    const carousel_two = document.querySelector('.two');   
    for(const hour of hours.slice(4,8)){
      // console.log(Hora);
      template.querySelector('.pdg-hour').classList.add('two');
      template.querySelector('p.time').textContent = hour.hora;
      template.querySelector('img').src = hour.icon;
      template.querySelector('img').alt = hour.text;
      template.querySelector('p.temp-size').textContent = hour.tempActual;
      template.querySelector('p.wind').textContent = hour.wind;
      template.querySelector('p.rain').textContent = hour.rain;
      template.querySelector('p.humidity').textContent = hour.humidity;
      template.querySelector('p.pressure').textContent = hour.pressure;
      template.querySelector('p.temp').textContent = hour.feelslike;
      template.querySelector('p.rocio').textContent = hour.rocio;
      template.querySelector('p.uv').textContent = hour.uv;

      const clone = template.cloneNode(true);
      fragment.appendChild(clone);   
    }
    carousel_two.appendChild(fragment);
    const carousel_three = document.querySelector('.three');
    for(const hour of hours.slice(8,12)){
        //console.log(Hora);
        template.querySelector('.pdg-hour').classList.add('three');
        template.querySelector('p.time').textContent = hour.hora;
        template.querySelector('img').src = hour.icon;
        template.querySelector('img').alt = hour.text;
        template.querySelector('p.temp-size').textContent = hour.tempActual;
        template.querySelector('p.wind').textContent = hour.wind;
        template.querySelector('p.rain').textContent = hour.rain;
        template.querySelector('p.humidity').textContent = hour.humidity;
        template.querySelector('p.pressure').textContent = hour.pressure;
        template.querySelector('p.temp').textContent = hour.feelslike;
        template.querySelector('p.rocio').textContent = hour.rocio;
        template.querySelector('p.uv').textContent = hour.uv;
  
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);    
    }
    carousel_three.appendChild(fragment);
    const carousel_four = document.querySelector('.four');
    for(const hour of hours.slice(12,16)){
      //console.log(Hora);
      template.querySelector('.pdg-hour').classList.add('four');
      template.querySelector('p.time').textContent = hour.hora;
      template.querySelector('img').src = hour.icon;
      template.querySelector('img').alt = hour.text;
      template.querySelector('p.temp-size').textContent = hour.tempActual;
      template.querySelector('p.wind').textContent = hour.wind;
      template.querySelector('p.rain').textContent = hour.rain;
      template.querySelector('p.humidity').textContent = hour.humidity;
      template.querySelector('p.pressure').textContent = hour.pressure;
      template.querySelector('p.temp').textContent = hour.feelslike;
      template.querySelector('p.rocio').textContent = hour.rocio;
      template.querySelector('p.uv').textContent = hour.uv;

      const clone = template.cloneNode(true);
      fragment.appendChild(clone);  
    }
    carousel_four.appendChild(fragment);
    const carousel_five = document.querySelector('.five');
    for(const hour of hours.slice(16,20)){
      //console.log(Hora); 
      template.querySelector('.pdg-hour').classList.add('five');
      template.querySelector('p.time').textContent = hour.hora;
      template.querySelector('img').src = hour.icon;
      template.querySelector('img').alt = hour.text;
      template.querySelector('p.temp-size').textContent = hour.tempActual;
      template.querySelector('p.wind').textContent = hour.wind;
      template.querySelector('p.rain').textContent = hour.rain;
      template.querySelector('p.humidity').textContent = hour.humidity;
      template.querySelector('p.pressure').textContent = hour.pressure;
      template.querySelector('p.temp').textContent = hour.feelslike;
      template.querySelector('p.rocio').textContent = hour.rocio;
      template.querySelector('p.uv').textContent = hour.uv;

      const clone = template.cloneNode(true);
      fragment.appendChild(clone); 
    }
    carousel_five.appendChild(fragment);
    const carousel_six = document.querySelector('.six');
    for(const hour of hours.slice(20,24)){
      //console.log(Hora);
      template.querySelector('.pdg-hour').classList.add('six');
      template.querySelector('p.time').textContent = hour.hora;
      template.querySelector('img').src = hour.icon;
      template.querySelector('img').alt = hour.text;
      template.querySelector('p.temp-size').textContent = hour.tempActual;
      template.querySelector('p.wind').textContent = hour.wind;
      template.querySelector('p.rain').textContent = hour.rain;
      template.querySelector('p.humidity').textContent = hour.humidity;
      template.querySelector('p.pressure').textContent = hour.pressure;
      template.querySelector('p.temp').textContent = hour.feelslike;
      template.querySelector('p.rocio').textContent = hour.rocio;
      template.querySelector('p.uv').textContent = hour.uv;

      const clone = template.cloneNode(true);
      fragment.appendChild(clone);
      
    }
    carousel_six.appendChild(fragment);    
}

/*DOMContentLoaded -------------------------------------------*/
async function showDatesToScreen(location){
    let data;
    data = await fetchHoursWeather(location);
    //console.log(data);
    //showCity(data);
    const days = processDaysData(data);
    const hours = processHoursData(days);
    //console.log(hours);
    showHoursWeather(hours, location);      
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTemplatesFromFileHeader();
  fetchTemplatesFromFileMenu();
  fetchTemplatesFromFileFooter();
  showDatesToScreen(localStorage.getItem('city') || 'London');
});
  
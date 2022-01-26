import { Day } from '../modules/days.js';

const apiKeyWeather = 'caf2e4af8e8e4a4183c142011210811';
const endpoint_forecast = 'https://api.weatherapi.com/v1/forecast.json';


async function fetchDaysWeather(location){
    const response = await fetch(`${endpoint_forecast}?key=${apiKeyWeather}&lang=es&days=7&q=${location})`);
    return response.ok ? await response.json() : [];  
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
// recupera dades de Template-menú ------------------------------------/
async function fetchTemplatesFromFileMenu(){
  const response = await fetch('template-menu.html');
  //console.log(response);
  if(response.ok){
    const templateMenu = document.createElement('template'); //<template></template>
    templateMenu.innerHTML = await response.text();  //<template> ..... </template>
    const menuTemplate = templateMenu.content.querySelector('#template_menu').content;
    //console.log(menuTemplate);
    menuTemplate.querySelectorAll('li a')[2].classList.remove('active');
    menuTemplate.querySelectorAll('li a')[2].classList.add('active');
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
  const div = document.querySelector('.cityDays');
  const p = document.createElement('p');
  div.appendChild(p);
  p.textContent = data.location.name;
}

/* mostrar dades dies -------------------------------------------------*/
function showDaysWeather(days){
  const container = document.querySelector('body div.dies');
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#template-days').content;
  for(const day of days){
    //console.log(day);
    template.querySelector('p.nomDia').textContent = day.getDiaSemana();
    template.querySelector('p.diaSemana').textContent = day.getFormatDate();
    template.querySelector('img').src = day.icon;
    template.querySelector('img').alt = day.cel;
    template.querySelector('span.tempMax').textContent = day.tempMax;
    template.querySelector('span.tempMin').textContent = day.tempMin;
    template.querySelector('span.text').textContent = day.cel;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    container.appendChild(fragment);
  }
  // event per veure les hores al fer click a sobre del dia -- falta acabar d'implementar l'enllaç amb les dades correctes/
  container.addEventListener('click', (e) => {
    if(e.target.dataset.dia){
      //console.log(`estic al div ${e.target.dataset.dia}`);
      window.location.href = 'hores.html'; 
    }
  })  
}
  
/*DOMContentLoaded -------------------------------------------*/
async function showDatesToScreen(location){
  let data;
  data = await fetchDaysWeather(location);
  //console.log(data);
  //showCity(data);
  const days = processDaysData(data);
  //console.log(days);
  showDaysWeather(days, location);
}
document.addEventListener('DOMContentLoaded', () => {
  fetchTemplatesFromFileHeader();
  fetchTemplatesFromFileMenu();
  fetchTemplatesFromFileFooter();
  showDatesToScreen(localStorage.getItem('city') || 'London');
 
});
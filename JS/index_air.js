const apiKeyWeather = 'caf2e4af8e8e4a4183c142011210811';
const endpoint_forecast = 'https://api.weatherapi.com/v1/forecast.json';


async function fetchAirWeather(location){
    const response = await fetch(`${endpoint_forecast}?key=${apiKeyWeather}&lang=es&days=7&aqi=yes&q=${location})`);
    return response.ok ? await response.json() : [];  
}

function processAirData(data){
    const airQuality = data.current.air_quality;
    return  airQuality;  
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
        menuTemplate.querySelectorAll('li a')[3].classList.remove('active');
        menuTemplate.querySelectorAll('li a')[3].classList.add('active');
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

// mostrar població --------------------------------------------------/
/*
function showCity(data){
    const div = document.querySelector('.cityAir');
    const p = document.createElement('p');
    div.appendChild(p);
    p.textContent = data.location.name;
}
*/
/* mostrar dades qualitat aire -------------------------------------------------*/
function showAirWeather(air){
    const container = document.querySelector('body div.air');
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#template-air').content;
    template.querySelector('p.quantity_co').textContent = Number(air.co.toFixed(2)) + ' μg/m³';
    template.querySelector('p.quantity_o3').textContent = Number(air.o3.toFixed(2)) + ' μg/m³';
    template.querySelector('p.quantity_no2').textContent = Number(air.no2.toFixed(2)) + ' μg/m³';
    template.querySelector('p.quantity_so2').textContent = Number(air.so2.toFixed(2)) + ' μg/m³';
    template.querySelector('p.quantity_pm2').textContent = Number(air.pm2_5.toFixed(2)) + ' μg/m³';
    template.querySelector('p.quantity_pm10').textContent = Number(air.pm10.toFixed(2)) + ' μg/m³';
    template.querySelector('.healthy').style.backgroundColor = 'green';
    template.querySelector('.healthy').textContent = air['us-epa-index'];
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    container.appendChild(fragment);    
}


/*DOMContentLoaded -------------------------------------------*/
async function showDatesToScreen(location){
    let data;
    data = await fetchAirWeather(location);
    //console.log(data);
    //showCity(data);
    const air = processAirData(data);
    //console.log(air);
    showAirWeather(air);
}
document.addEventListener('DOMContentLoaded', () => {
    fetchTemplatesFromFileHeader();
    fetchTemplatesFromFileMenu();
    fetchTemplatesFromFileFooter();
    showDatesToScreen(localStorage.getItem('city') || 'London');
});
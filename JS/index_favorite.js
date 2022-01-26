
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
      showDatesToScreen(actualCity);   
    }
  }
}

//recupera dades Template-menu -----------------------------------------/
async function fetchTemplatesFromFileMenu(){
  const response = await fetch('template-menu.html');
  //console.log(response);
  if(response.ok){
    const templateMenu = document.createElement('template'); //<template></template>
    templateMenu.innerHTML = await response.text();  //<template> ..... </template>
    const menuTemplate = templateMenu.content.querySelector('#template_menu').content;
    //console.log(menuTemplate);
    menuTemplate.querySelectorAll('li a')[4].classList.remove('active');
  menuTemplate.querySelectorAll('li a')[4].classList.add('active');
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
  

// llegeixo los favoritos del localStorage -------------------------------------/
const localStorageKey = 'favoritos';
const favoritas = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
if(favoritas){
  addFavorites(favoritas);
}else{
  console.log('no se ha guardado ninguna población');
}
function addFavorites (favoritas){
    const ul = document.createElement('ul');
    for(let fav=0; fav<favoritas.length; fav++){
      const li = document.createElement('li');
      li.classList.add('list');
      const a = document.createElement('a');
      const atribut = document.createAttribute('data');
      atribut.value = 'city';
      a.setAttributeNode(atribut);
      //console.log(a.getAttribute('data'));
      a.textContent = favoritas[fav];
      const i = document.createElement('i');
      i.classList.add('bi', 'bi-x-square');
      li.appendChild(a);
      li.appendChild(i);
      ul.appendChild(li); 
    } 
  document.querySelector(".favorite").appendChild(ul);
}
// busco entre totes les 'a' en quina faig click per anar a la pàg inicial i mostrar dades ----- falta acabar d'implementar l'enllaç a pàg inicial amb dades correctes.
const container = document.querySelector(".favorite")
const link = container.addEventListener('click', (e) => {
  
  if(e.target.getAttribute('data')){
   // console.log(e.target.textContent);
    e.href = 'index.html';
  }
});

/*DOMContentLoaded ------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  fetchTemplatesFromFileHeader();
  fetchTemplatesFromFileMenu();
  fetchTemplatesFromFileFooter();  
});


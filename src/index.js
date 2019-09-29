const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
// const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
const Observer = true;

window.onload = localStorage.clear();

function next_fetch() {
  // debugger
  Next_fetch = localStorage.getItem('next_Dato');
  
  return Next_fetch;        
}

const getData = api => {
  console.log('next_fetch: ', Next_fetch)
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;        

      localStorage.setItem('next_Dato', response.info.next);
      
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span><span> ID ${character.id}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData  = async () => {	 
  
  try {
    if (next_fetch() === null) {
      return await getData(API);
    }
    else if(next_fetch() === ''){
      let messageContainer = document.createElement('h2');
      messageContainer.innerHTML = 'SE TERMINARON TODOS LOS PERSONAJES....';
      $app.appendChild(messageContainer);
      intersectionObserver.unobserve($observe);
      Observer = false;
    }
    else {
      return await getData(next_fetch());      
    }
          
  } catch {
    onError(`SE PRESENTO UN PROBLEMA`)
    }    
  	
}
const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

if (Observer === true) {
  intersectionObserver.observe($observe);  
  
}



import { videos } from './datavideo.js';

//capturar el click del logo para redireccionar a la pagina principal
const logo = document.querySelector(".header__figure2");
//escuchar el click
logo.addEventListener('click', () => {
   window.location.href ="../index.html" 
})

console.log(videos);
const characters = JSON.parse(sessionStorage.getItem("characters")) || videos;
//Mostrar los videos en listado cards
//1. capturamos el contenedor donde vamos a pintar todos los videos
const containerVideos = document.querySelector(".main__videos");
console.log(containerVideos);

//2. Construir función que me permita pintar los videos dentro de un elemento contenedor
const printVideos = (container, video) => {
    //vaciar el contenedor
    container.innerHTML = "";
    //vamos a recorrer el array
    video.forEach((character) => {
        container.innerHTML += `
       <article class="cards">
       <figure class="cards__figure">
        <img class="cards__img" data-card='cards' name=${character.id} src=${character.image} alt=${character.title}>
       </figure> 
       <section>
       <div class="main__div">
        <figure>
        <img class="cards__avatar" data-card='cards' name=${character.id} src=${character.seenIn.avatar}>
        </figure> 
        <h3 class="main__h3" data-card='cards' name=${character.id}> ${character.seenIn.title}</h3>
        </div>
        <h5 class="cards__h5autor">${character.seenIn.autor}</h5>
        <h5 class="cards__h5vistas">${character.seenIn.vistas}, - ${character.seenIn.fecha}</h5>
        </section>
       </article>
       `;
    });
};
//vamos a escuchar al evento DomContentLoad
document.addEventListener('DOMContentLoaded', () => {
    printVideos(containerVideos, characters);
})

//vamos a escuchar el evento click sobre las cards
document.addEventListener('click', (event) => {

    // if (event.target.classList.contains('cards__img')){
    //     console.log('Hice click aquí');
    //     console.log(event.target);
    const dataVideoAttribute = event.target.getAttribute("data-card");
    if (dataVideoAttribute === "cards") {
        const id = event.target.getAttribute('name');
        sessionStorage.setItem('idVideo', JSON.stringify(id));
        window.location.href = './pages/detailsvideos.html';

    }

})

//--------filtrado----------//
//1.creamos un array con las categorias existentes//
//vamos a pintar las categorias
const categorias = ['all'];
characters.forEach((item) => {
    if (!categorias.includes(item.categoria)) {
        categorias.push(item.categoria)
    }
});

categorias.forEach((item) => {
    const botonFiltrado = document.getElementsByName(item)[0];
    
    botonFiltrado.addEventListener("click", () => {
        const videoFiltrados = item ==='all'? characters : characters.filter((element) => element.categoria === item);
        
        printVideos(containerVideos, videoFiltrados);
    });
});

//-----------busquedad videos por nombre-----------//
const busquedadVideos = (terminoBusquedad, listaDeVideos) => {
    const videoFiltrado = listaDeVideos.filter((video)=>video.seenIn.title.toLowerCase().includes(terminoBusquedad.toLowerCase()));
    const result = videoFiltrado.length ? videoFiltrado : listaDeVideos;

    const mensajeResultado = videoFiltrado.length? false :"Este video no existe";

return {
        resultBusquedad: result,
        mensajeBusqueda: mensajeResultado,
        };
};
const formBusquedad = document.querySelector(".search");
console.log(formBusquedad);
formBusquedad.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(formBusquedad.children);
    const formChildren = Array.from(formBusquedad.children);

    const inputBusquedad = formChildren.find((item)=> item.localName === 'input');
    console.log(inputBusquedad.value);

    const terminoBusquedad = inputBusquedad.value;

    if (terminoBusquedad) {
     const resultaBusquedad = busquedadVideos(terminoBusquedad, characters);

     console.log(resultaBusquedad);
      
     printVideos(containerVideos, resultaBusquedad.resultBusquedad);
     if(resultaBusquedad.mensajeBusqueda) {
        Swal.fire("Oops!",resultaBusquedad.mensajeBusqueda , "error");
     }

    } else {
        Swal.fire("Oops!", "No a ingresado termino de busquedad", "error");
    }  
});


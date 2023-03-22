import { videos } from "../scripts/datavideo.js";


const characters = JSON.parse(sessionStorage.getItem("characters")) || videos;
//capturar el click del logo para redireccionar a la pagina principal
const logo = document.querySelector(".header__figure2");
//escuchar el click
logo.addEventListener('click', () => {
   window.location.href ="../index.html" 
})


// //hago la busquedad del video al cual le hemos dado click
// const searchVideo = videos.find(image => image.id === idVideo);
// console.log(searchVideo);

// const playVideoContainer = document.getElementById("informacion");
//Le vamos a agregar el video seleccionado
const videoPlay = (contenedor, video) => {
    //creamos el elemento iframe
    const iframe = document.createElement("iframe");
    iframe.classList.add("main__iframe");
    iframe.setAttribute("src", video.video);
    //insertamos iframe en su contenedor
    contenedor.appendChild(iframe);
    //insertar info video detalles
    const infoVideo = document.createElement("section");
    infoVideo.classList.add("section__videoPrincipal");
    /* for (const key in video.seenIn) {
        console.log(key, "--->", video.seenIn[key]); */

    /* const item = document.createElement("section"); */
    
    infoVideo.innerHTML = `
    <h3 class="h3__detalles">${video.seenIn.title}</h3>
    <div class="div__detalles">
    <figure class="figure__avatar">
        <img src=${video.seenIn.avatar}>
    </figure>
    <h4 class="main__h4">${video.seenIn.autor}</h4>
    </div>
    <h5 class="main__h5">${video.seenIn.vistas} - ${video.seenIn.fecha}</h5>
    `;

    contenedor.appendChild(infoVideo);
};


document.addEventListener('DOMContentLoaded', () => {
    //capturar la informacion guardada en el session storage
    const idVideoStg = JSON.parse(sessionStorage.getItem('idVideo')) || 0;
    const idVideo = Number(idVideoStg);
    console.log(idVideo);
    const video = characters.find(video => video.id === idVideo);
    const containerVideo = document.querySelector(".main__videoPrincipal")
    const containerVideoSugerido = document.querySelector(".main__videoSugerido")  
    videoPlay(containerVideo, video);
    mostrarVideosSugeridos(containerVideoSugerido, characters, idVideo);
})

const mostrarVideosSugeridos = (
    contenedorVideosSugeridos,
    videosList,
    idVideo
    ) => {
        //1.Creamos el contendor padre de videos sugeridos
        const sectionVideos = document.createElement("section");
        sectionVideos.classList.add("main__videoSugeridoDetalle");

        const videosSugeridos = videosList.filter((item) => item.id !== idVideo);

        videosSugeridos.forEach(element => {
          sectionVideos.innerHTML += `
          
          <div class="div__infoSugerido">
          <article class="videoSugeridos">
          <figure><img src=${element.image} alt=${element.seenIn.title}>
          </figure>
          </article>
          <section>
          <h3 class="article__h3">${element.seenIn.title}</h3>
          <h4 class="article__h4">${element.seenIn.autor}</h4>
          <h5 class="article__h5">${element.seenIn.vistas} - ${element.seenIn.fecha}</h5>
          </section>
          </div>
          `;            
        });

        contenedorVideosSugeridos.appendChild(sectionVideos);
    }





// //pintar informacion video
// const videoDetalle = videos.find(item => item.id === idVideo)
// const containerVideoDetalles = document.querySelector(".main__article");
// console.log(containerVideoDetalles, videoDetalle);

// const informacionVideo = (contenedor, video) => {

//     video.forEach((character) => {
//     contenedor.innerHTML =`
//     <article>
//     <figure>
//     <img class=detallesAvatar src=${character.avatar} alt=${character.title}>
//     </figure>
//     <h3 class="detalles__h3"> ${character.title}</h3>
//         </div>
//         <h5 class="detalles__h5autor">${character.autor}</h5>
//         <h5 class="detalles__h5vistas">${character.vistas}, - ${character.fecha}</h5>
//        </article>
//     `;
// });
// };

// document.addEventListener('DOMContentLoaded', () => {
// informacionVideo(containerVideoDetalles, videos);
// })


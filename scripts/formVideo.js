import { videos } from "../scripts/datavideo.js";

//capturar el click del logo para redireccionar a la pagina principal
const logo = document.querySelector(".header__figure2");
//escuchar el click
logo.addEventListener('click', () => {
   window.location.href ="../index.html" 
})


//------------activamos enlace-------------//
const linkNuevo = document.querySelector(".link__nuevoVideo");
linkNuevo.classList.add("active");
console.log(linkNuevo.classList);

//-------------capturamos el formulario--------->
const formulario = document.getElementById("formNuevoVideo");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

const formChildren = Array.from(formulario.children);

const arrayInput = formChildren.filter(
    (item) => item.localName === 'input' || 
    item.localName === "select");

const newVideo = {
      video:"",
      image:"",
      categoria:"",
      duracion:"",
      seenIn:{
      avatar:"",
      title: "",
      autor:"",
      vistas:" ",
      fecha: ""
 },
};

for (const key in newVideo) {
    
    if(typeof newVideo[key] === "object") {
        for (const propertyname in newVideo[key]) {

            const input =  arrayInput.find(item=> 
                item.id == propertyname)
            newVideo[key][propertyname] = input.value 
           
           }
   } else {
            const input = arrayInput.find((item)=> 
            item.id == key);
            newVideo[key] = input.value; 
        }
    }
    console.log(newVideo);
    const validateCampos = validateInputs(newVideo);
       if(validateCampos){
        newVideo.id = videos.length + 1;
          videos.push(newVideo);
          sessionStorage.setItem('characters', JSON.stringify(videos));
       }
       console.log(videos); 
    });

    const validateInputs = (ObjectData) => {
        let camposVacios = "";
        for (const key in ObjectData) {
            
            if (typeof ObjectData[key] === "object")
             {
             for (const propertyname in ObjectData[key]) {
                const valueProperty = ObjectData[key][propertyname]
                camposVacios += !valueProperty ? 
                `${propertyname}` : "";
                }
             } else {
                const valueProperty = ObjectData[key];
                camposVacios += !valueProperty ? `${key} ` : "";
             }
             }   
            if(camposVacios){
                Swal.fire("Oops!", `Hay campos vacios: ${camposVacios}"`, "error");
                return false;
            } else {
                return true;
            }
        }
    
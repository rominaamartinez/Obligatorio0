

function mostrarDatosPerfil(){
    if(localStorage.getItem("nombre1") != "null"){
        document.getElementById("btnCerrar").innerHTML = `<button  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`
        document.getElementById("nombrePerfil").innerHTML = localStorage.getItem("nombre1") + " " + localStorage.getItem("apellido1")
        document.getElementById("emailPerfil").innerHTML = localStorage.getItem("user");
        if(localStorage.getItem("telefono") != "null" && localStorage.getItem("telefono") != ""){
            document.getElementById("telefonoPerfil").innerHTML = "Contacto: "+ localStorage.getItem("telefono");
        }else{
            document.getElementById("telefonoPerfil").innerHTML = " "
        }
    }else{
        //aca tengo que poner para que salte la modal ya que no estan los datsos en el local storage
        document.getElementById("btnCerrar").innerHTML =""
        let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {})
        myModal.show()  
    }

}

function llenarFormulario(){
    document.getElementById("email").value = localStorage.getItem("user");
    let nombre1 = localStorage.getItem("nombre1")
    let nombre2 = localStorage.getItem("nombre2")
    let apellido1 = localStorage.getItem("apellido1")
    let apellido2 = localStorage.getItem("apellido2")
    let telefono = localStorage.getItem("telefono")
    let color = localStorage.getItem("color")
            console.log(color)
            document.getElementById("cardOpciones").style.backgroundColor = color;
            document.getElementById("cardInfoPerfil").style.backgroundColor = color;

    if(nombre1 != "null")
        document.getElementById("nombre1").value = nombre1;
    if(nombre2 != "null")
        document.getElementById("nombre2").value = nombre2;
    if(apellido2 != "null")
        document.getElementById("apellido2").value = apellido2;
    if(apellido1 != "null")
        document.getElementById("apellido1").value = apellido1;
    if(telefono != "null")
        document.getElementById("telefono").value = telefono;
}


function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
  }
  
  function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
  }
//
function codificarImagen(imagen){
    let enBase64 = utf8_to_b64(imagen);
    localStorage.setItem("img", enBase64);
}
function cambiarImagen(){
    let nuevaImg = document.getElementById("formFileSm").files;
    if (nuevaImg.length > 0){
        let imgCargada = nuevaImg[0];
        let lector = new FileReader();
        lector.onload = function(evento){
            let srcImg = evento.target.result;
            console.log(srcImg)
            localStorage.setItem("img", JSON.stringify(srcImg))
            document.getElementById("imagePerfil").src = srcImg;
        }
        lector.readAsDataURL(imgCargada);
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    llenarFormulario();

    codificarImagen("img/img_perfil.png");
    mostrarDatosPerfil();
    let form = document.getElementById("formulario");
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {          
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
        }else{ 
            localStorage.setItem("nombre1", document.getElementById("nombre1").value);
            localStorage.setItem("nombre2", document.getElementById("nombre2").value);
            localStorage.setItem("apellido1", document.getElementById("apellido1").value);
            localStorage.setItem("apellido2", document.getElementById("apellido2").value);
            localStorage.setItem("telefono", document.getElementById("telefono").value);
            localStorage.setItem("color", document.getElementById("color").value);
            
        }
    })
    
    document.getElementById("btnGuardar").addEventListener("click", ()=>{
        
    })

    document.getElementById("imagePerfil").addEventListener("click", ()=>{
        Swal.fire({
            title: "Selecciona la imagen",
            html:`
            <div id="fotoSeleccionada"></div>
            <div class="mb-3">
            <label for="formFileSm" class="form-label">Small file input example</label>
            <input accept="image/*" class="form-control form-control-sm" id="formFileSm" type="file">
          </div>
          `,
            showCancelButton: true,
            confirmButtonColor: 'black',
            cancelButtonColor: 'red',
            confirmButtonText: 'Guardar!',
            cancelButtonText: "Cancelar"
            
          }).then((result) => {
            if (result.isConfirmed) {
                cambiarImagen();   //no funciona 
            }
          })
    })
    //inicializacion de popover
    document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
      new bootstrap.Popover(popover)
    })

    //inicializacion de tooltip
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(tooltip => {
      new bootstrap.Tooltip(tooltip)
    })
    
    document.getElementById("listaDeseos").addEventListener("click", ()=>{
        console.log(document.getElementById("cardSelect").innerHTML)
        
        document.getElementById("cardSelect").innerHTML =`
        <div id="animacionCard" class="card animate__animated animate__backInRight" style="height: 280px; width:700px; margin-top:20px" >
        <div class="card-body">
        <button id="btnCerrarLista" type="button" class="btn-close float-end" ></button>
          <h3> Mi lista de deseos</h3>
          <hr>
          <h6 style="color:grey">Tu lista está vacía</h6>
        </div>
      </div>`
        
        document.getElementById("btnCerrarLista").addEventListener("click", ()=>{
            document.getElementById("animacionCard").classList.remove("animate__backInRight")
            document.getElementById("animacionCard").classList.add("animate__backOutRight")

        })
    })
    document.getElementById("misCupones").addEventListener("click", ()=>{        
        document.getElementById("cardSelect").innerHTML =`
        <div id="animacionCard" class="card animate__animated animate__backInRight" style="height: 280px; width:700px; margin-left: 20px; margin-top:20px" >
        <div class="card-body">
        <button id="btnCerrarLista" type="button" class="btn-close float-end" ></button>
          <h3>Mis cupones</h3>
          <hr>
          <h6 style="color:grey">No tienes cupones disponibles</h6>
        </div>
      </div>`
        
        document.getElementById("btnCerrarLista").addEventListener("click", ()=>{
            document.getElementById("animacionCard").classList.remove("animate__backInRight")
            document.getElementById("animacionCard").classList.add("animate__backOutRight")

        })
    })
    //la idea es que aparezca una vista previa de la foto luego de seleccionar una imagen pero no anda
    /*document.getElementById("formFileSm").addEventListener("change", ()=>{
        document.getElementById("fotoSeleccionada").innerHTML = '<img id="vistaPrevia" src="" class="img-fluid" alt=""></img>'
        document.getElementById("vistaPrevia").src = localStorage.getItem("img");
    })*/
})
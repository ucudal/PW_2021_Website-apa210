function toggleModal(modalID) {
    document.getElementById(modalID).classList.toggle("hidden");
    document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalID).classList.toggle("flex");
    document.getElementById(modalID + "-backdrop").classList.toggle("flex");
}

function renderExperiences(lista_experiencias) {
    let experienciasHtml = "";
    lista_experiencias["experiencia-laboral"].forEach(function (experiencia) {
        const { fechaInicio, fechaFin, empresa, puesto, descripcion } = experiencia;
        experienciasHtml += `<div class="box">
                                <div class="year_company">
                                    <h5>${fechaInicio} - ${fechaFin}</h5>
                                    <h5>${empresa}</h5>
                                </div>
                                <div class="text">
                                    <h4>${puesto}</h4>
                                    <p>${descripcion}</p>
                                </div>
                            </div>`;
    });
    document.getElementById("experiences-placeholder").innerHTML  = experienciasHtml;
}

function get_experiencia_laboral() {
    fetch("https://pw2021-apinode-apa210.apa210.repl.co/experiencia-laboral")
        .then(function(response){
            if (!response.ok){
                throw Error("rechazo");
            }
            return response.json();

        }).then(function(response){
            renderExperiences(response);
        }).catch(function(error){
            console.log(error);
        });
  }

  document.addEventListener("DOMContentLoaded", () => {
    get_experiencia_laboral();
  })

  document.addEventListener("submit", function (event) {
    event.preventDefault();
    var toSend = {
        nombreContacto: document.getElementById("name").value + " " + document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        phone: document.getElementById("phone").value
    };
    var jsonString = JSON.stringify(toSend);
    var url = "https://pw2021-apinode-apa210.apa210.repl.co/enviar-formulario";
    console.log(jsonString);
    fetch(url, {
        method: "POST",
        body: jsonString,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        toggleModal("id-modal-contacto");
        toggleModal("id-modal-correcto");
    })["catch"](function (error) {
        console.error(error);
    });
});
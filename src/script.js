function alternarModal(modalID) {
    document.getElementById(modalID).classList.toggle("hidden");
    document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalID).classList.toggle("flex");
    document.getElementById(modalID + "-backdrop").classList.toggle("flex");
}
function renderExperiences(lista_experiencias) {
    var experienciasHtml = "";
    lista_experiencias["experiencia-laboral"].forEach(function (experiencia) {
        var fechaInicio = experiencia.fechaInicio, fechaFin = experiencia.fechaFin, empresa = experiencia.empresa, puesto = experiencia.puesto, descripcion = experiencia.descripcion;
        experienciasHtml += "<div class=\"box\">\n                                <div class=\"year_company\">\n                                    <h5>".concat(fechaInicio, " - ").concat(fechaFin, "</h5>\n                                    <h5>").concat(empresa, "</h5>\n                                </div>\n                                <div class=\"text\">\n                                    <h4>").concat(puesto, "</h4>\n                                    <p>").concat(descripcion, "</p>\n                                </div>\n                            </div>");
    });
    document.getElementById("experiences-placeholder").innerHTML = experienciasHtml;
}
function get_experiencia_laboral() {
    fetch("https://pw2021-apinode-apa210.apa210.repl.co/experiencia-laboral")
        .then(function (response) {
        if (!response.ok) {
            throw Error("rechazo");
        }
        return response.json();
    }).then(function (response) {
        renderExperiences(response);
    })["catch"](function (error) {
        console.log(error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    get_experiencia_laboral();
});
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
        alternarModal("id-modal-contacto");
        alternarModal("id-modal-correcto");
    })["catch"](function (error) {
        console.error(error);
    });
});

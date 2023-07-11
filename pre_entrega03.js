

class Mate {
    constructor(id, tipo, precio, imagen) {
        this.id = id,
            this.tipo = tipo,
            this.precio = precio,
            this.imagen = imagen
    }

    mostrarInfoMate() {
        console.log(`Mate ${this.tipo}, tiene un precio de ${this.precio}`)
    }
}

const mate1 = new Mate(1, "Imperial", 2100, "multimedia/mateImperial.jpg")
const mate2 = new Mate(2, "Comet", 980, "multimedia/mateComet.jpg")
const mate3 = new Mate(3, "Calabaza", 980, "multimedia/mateCalabaza.jpg")
const mate4 = new Mate(4, "Cerámica", 980, "multimedia/mateCeramica.jpg")


let matesPush = []

if (localStorage.getItem("matesPush")) {
    matesPush = JSON.parse(localStorage.getItem("matesPush"))
} else {
    matesPush.push(mate1, mate2, mate3, mate4)
    localStorage.setItem("matesPush", JSON.stringify(matesPush))
}

// PROYECTO
let verCatalogo = document.getElementById("verCatalogo")
let matesDiv = document.getElementById("mates")
let btnGuardarMateBtn = document.getElementById("guardarMateBtn")


function buscarPorTipo(array) {
    let tipoBuscado = prompt("Ingrese el tipo de mate que desea buscar")
    let busquedaT = array.find(
        (mate) => mate.tipo.toUpperCase() === tipoBuscado.toUpperCase()
    )
    if (busquedaT == undefined) {
        console.log(`El mate ${tipoBuscado} no está en nuestro catálogo`)
    } else {
        console.log(busquedaT)
    }
}


function buscarPorPrecio(array) {
    let precioBuscado = prompt("Ingrese el precio máximo que desea abonar")
    let busqueda = array.filter(
        (mate) => mate.precio <= precioBuscado
    )
    if (busqueda.length == 0) {
        console.log(`No existen mates cuyo valor sea menor o igual a ${precioBuscado}`)
    } else {
        console.log(busqueda)
    }
}


// DOM CON ARRAY DE OBJETOS
verCatalogo.addEventListener("click", () => {
    mostrarCatalogo(matesPush)
})



function mostrarCatalogo(array) {
    matesDiv.innerHTML = ``
    for (let mate of matesPush) {

        let nuevoMateDiv = document.createElement("div")
        nuevoMateDiv.className = "col-12 col-md-4 col-lg-4 my-2"
        nuevoMateDiv.innerHTML = `<div id="${mate.id}" class="card">
    <img src="${mate.imagen}" alt="${mate.tipo}" class="card-img-top img-fluid">
        <div class="card-body">
            <h4 class="card-title">
                <p>${mate.tipo}</p>
                <p>${mate.precio}</p>
                <button class="btn btn-outline-success"> Agregar al carrito</button>
            </h4>
        </div>`
        matesDiv.appendChild(nuevoMateDiv)
    }
}

btnGuardarMateBtn.addEventListener("click", function (event) {
    event.preventDefault()
    agregarMate(matesPush)
    console.log(`${matesPush}`)
})

// AGREGAR MATE PARA DOM
function agregarMate(array) {
    let tipoMate = document.getElementById("tipoInput")
    let precioMate = document.getElementById("precioInput")
    const mateNuevo = new Mate(array.length + 1, tipoMate.value, precioMate.value, "multimedia/mateNuevo.jpg")
    array.push(mateNuevo)
    localStorage.setItem("matesPush", JSON.stringify(array))
    mostrarCatalogo(matesPush)
}



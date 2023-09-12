//Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-curso');
let articulosCarrito = []

//Funcion donde registro todos mis eventListener 
cargarEventListeners();
function cargarEventListeners() {
    listaCurso.addEventListener('click', obtenerProducto);


    carrito.addEventListener('click', eliminarProducto);



    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })
}


//Funciones

function obtenerProducto(e) {
    e.preventDefault(e)

    if (e.target.classList.contains('btn-js')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarProducto(e) {
    e.preventDefault(e)
    if (e.target.classList.contains('eliminar')) {
        const productoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
        mostrarHTML()
    }
}




//Lee el contenido del HTML al que le dimso click y extrae la informacion del producto
function leerDatosCurso(producto) {


    //Crear un objeto con el contenido del producto actual
    const infoproducto = {
        imagen: producto.querySelector('IMG').src,
        nombre: producto.querySelector('H3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        contador: 1
    }


    const existe = articulosCarrito.some(producto => producto.id === infoproducto.id);
    if (existe) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoproducto.id) {
                producto.contador++
                return producto
            } else {
                return producto
            }

        })
        articulosCarrito = [...productos]

    } else {
        articulosCarrito = [...articulosCarrito, infoproducto];
    }






    mostrarHTML()
}

//Muestra el carrito de compras en el HTML
function mostrarHTML() {

    //Limpiar Contenido previo
    limpiarHTML()



    articulosCarrito.forEach((producto) => {
        const { imagen, nombre, precio, contador, id } = producto
        const row = document.createElement('TR');
        row.innerHTML = `
            <td>
            <img src='${imagen}' alt='producto-imagen' width='100'>
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${contador}</td>
            <td>
                <a href='#' class='eliminar' data-id='${id}' >X</a>
            </td>
        `

        contenedorCarrito.appendChild(row)

    })

}


function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
// ===============================
// Parcial Programacion III - E-commerse de Frutas
// Alumno: Santiago Baez - DNI 42834398
// ===============================

// ===============================
// EJERCICIO 1: Crear array de objetos con frutas
// ===============================
const arrayFrutas = [
    { id: 1, nombre: "Anana", precio: 270, imagen: "./img/anana.jpg" },
    { id: 2, nombre: "Arandano", precio: 90, imagen: "./img/arandano.jpg" },
    { id: 3, nombre: "Banana", precio: 110, imagen: "./img/banana.jpg" },
    { id: 4, nombre: "Naranja", precio: 100, imagen: "./img/naranja.jpg" },
    { id: 5, nombre: "Fraumbuesa", precio: 300, imagen: "./img/frambuesa.png" },
    { id: 6, nombre: "Frutilla", precio: 250, imagen: "./img/frutilla.jpg" },
    { id: 7, nombre: "Kiwi", precio: 180, imagen: "./img/kiwi.jpg" },
    { id: 8, nombre: "Mandarina", precio: 220, imagen: "./img/mandarina.jpg" },
    { id: 9, nombre: "Manzana", precio: 260, imagen: "./img/manzana.jpg" },
    { id: 10, nombre: "Naranja", precio: 100, imagen: "./img/naranja.jpg" },
    { id: 11, nombre: "Pera", precio: 200, imagen: "./img/pera.jpg" },
    { id: 12, nombre: "Pomelo Amarillo", precio: 150, imagen: "./img/pomelo-amarillo.jpg" },
    { id: 13, nombre: "Pomelo Rojo", precio: 150, imagen: "./img/pomelo-rojo.jpg" },
];

// ===============================
// EJERCICIO 2: Crear objeto alumno y mostrar en consola y en nav
// ===============================
const alumno = {
    dni: 42834398,
    nombre: "Santiago",
    apellido: "Baez"
};

// Funcion que imprime mis datos 
function imprimirDatosAlumno() {
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

    const header = document.querySelector("header");
    if (header) {
        const p = document.createElement("p");
        p.textContent = `${alumno.nombre} ${alumno.apellido}`;
        p.style.color = "white";
        header.appendChild(p);
    }
}

// ===============================
// VARIABLES GLOBALES
// ===============================
let carrito = []; // Carrito de compras

// ===============================
// EJERCICIO 3: Imprimir frutas en pantalla
// ===============================
function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    lista.forEach(fruta => {
        const div = document.createElement("div");
        div.classList.add("card-producto");

        div.innerHTML = `
            <img src="${fruta.imagen}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
        `;

        contenedor.appendChild(div);
    });
}

// ===============================
// EJERCICIO 4: Filtro por nombre
// ===============================
function filtrarProductos() {
    const texto = document.getElementById("filtro").value.toLowerCase();
    const filtrados = arrayFrutas.filter(fruta =>
        fruta.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
}

// ===============================
// EJERCICIO 5: Carrito de compras
// ===============================
function agregarAlCarrito(id) {
    const fruta = arrayFrutas.find(item => item.id === id);
    carrito.push(fruta);
    guardarCarrito();
    mostrarCarrito();
    console.log(`Agregado: ${fruta.nombre} - $${fruta.precio}`);
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("bloque-item");

        li.innerHTML = `
            <p class="nombre-item">${item.nombre} - $${item.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
        `;

        listaCarrito.appendChild(li);
    });

    actualizarContadorYTotal();
}

function eliminarProducto(index) {
    carrito.splice(index, 1); // Quita 1 producto en la posicion index
    guardarCarrito();
    mostrarCarrito();
}

// ===============================
// EJERCICIO 6: Guardar en localStorage
// ===============================
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
        carrito = JSON.parse(guardado);
    }
}

// ===============================
// EJERCICIO 7: Contador y total
// ===============================
function actualizarContadorYTotal() {
    const contador = document.getElementById("contador-carrito");
    const total = document.getElementById("total-carrito");

    contador.textContent = `Carrito: ${carrito.length} productos`;

    let suma = 0;
    carrito.forEach(item => suma += item.precio);

    total.textContent = `Total: $${suma}`;
}

// ===============================
// EJERCICIO 8: Ordenar productos
// ===============================
// Funcion que ordena el carrito por nombre
function ordenarPorNombre() {
    const ordenados = [...arrayFrutas].sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
    );
    mostrarProductos(ordenados);
}
// Funcion que ordena el carrito por precio
function ordenarPorPrecio() {
    const ordenados = [...arrayFrutas].sort((a, b) =>
        a.precio - b.precio
    );
    mostrarProductos(ordenados);
}

// ===============================
// EJERCICIO 9: Vaciar carrito
// ===============================
// Funcion que vacia el carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}
document.addEventListener("DOMContentLoaded", () => {
    // Boton de ordenar por nombre
    document.getElementById("btn-ordenar-nombre").addEventListener("click", ordenarPorNombre);

    // Boton de ordenar por precio
    document.getElementById("btn-ordenar-precio").addEventListener("click", ordenarPorPrecio);

    // Input de filtro
    document.getElementById("filtro").addEventListener("keyup", filtrarProductos);

    // Boton vaciar carrito
    document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
});
// ===============================
// EJERCICIO 10: Inicializar todo
// ===============================
function init() {
    imprimirDatosAlumno();   // Muestra alumno
    cargarCarrito();         // Recupera carrito guardado
    mostrarProductos(arrayFrutas); // Muestra frutas
    mostrarCarrito();        // Muestra carrito si hay algo
}

document.addEventListener("DOMContentLoaded", init); // Inicializar todo

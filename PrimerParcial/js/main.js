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
const alumno = { // Crear objeto alumno
    dni: 42834398,
    nombre: "Santiago",
    apellido: "Baez"
};

// Funcion que imprime mis datos 
function imprimirDatosAlumno() {
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

    const header = document.querySelector("header");                        // Obtener el header
    if (header) { // Si existe el header
        const p = document.createElement("p");                              // Crear un p
        p.textContent = `${alumno.nombre} ${alumno.apellido}`;             // Poner el nombre y apellido
        p.style.color = "white";                                           // Colorear el texto
        header.appendChild(p);                                             // Agregar el p al header
    }
}

// ===============================
// VARIABLES GLOBALES
// ===============================
let carrito = []; // Carrito de compras

// ===============================
// EJERCICIO 3: Imprimir frutas en pantalla
// ===============================
function mostrarProductos(lista) {                                          // Funcion que muestra los productos
    const contenedor = document.getElementById("contenedor-productos");     // Obtener el contenedor
    contenedor.innerHTML = "";                                              // Limpiar el contenedor    

    lista.forEach(fruta => {                                                // Iterar sobre cada fruta
        const div = document.createElement("div");                           // Crear un div
        div.classList.add("card-producto");                                 // Agregar clase card-producto

        div.innerHTML = `  
            <img src="${fruta.imagen}" alt="${fruta.nombre}">   
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
        `;                                                                  // Agregar el HTML 

        contenedor.appendChild(div);                                        // Agregar el div al contenedor
    });
}

// ===============================
// EJERCICIO 4: Filtro por nombre
// ===============================
function filtrarProductos() {                                               // Funcion que filtra los productos
    const texto = document.getElementById("filtro").value.toLowerCase();    // Obtener el texto del input
    const filtrados = arrayFrutas.filter(fruta =>                           // Filtrar los productos    
        fruta.nombre.toLowerCase().includes(texto)                          // Si el nombre del producto contiene el texto
    );
    mostrarProductos(filtrados);                                            // Mostrar los productos filtrados
}

// ===============================
// EJERCICIO 5: Carrito de compras
// ===============================
function agregarAlCarrito(id) {                                             // Funcion que agrega al carrito    
    const fruta = arrayFrutas.find(item => item.id === id);         // Encontrar el producto en el array
    carrito.push(fruta);                                                // Agregar el producto al carrito
    guardarCarrito();                                                   // Guardar el carrito   
    mostrarCarrito();                                                   // Mostrar el carrito
    console.log(`Agregado: ${fruta.nombre} - $${fruta.precio}`);        // Mostrar en consola el producto agregado
}

function mostrarCarrito() {                                             // Funcion que muestra el carrito
    const listaCarrito = document.getElementById("lista-carrito");       // Obtener el lista de carrito
    listaCarrito.innerHTML = "";                                         // Limpiar el lista de carrito

    carrito.forEach((item, index) => {                                  // Iterar sobre cada producto del carrito
        const li = document.createElement("li");                         // Crear un li
        li.classList.add("bloque-item");                                 // Agregar clase bloque-item

        li.innerHTML = ` 
            <p class="nombre-item">${item.nombre} - $${item.precio}</p>
            <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
        `;                                                               // Agregar el HTML

        listaCarrito.appendChild(li);                                    // Agregar el li al lista de carrito
    });

    actualizarContadorYTotal();                                         // Actualizar el contador y el total
}

function eliminarProducto(index) {                                      // Funcion que elimina un producto del carrito
    carrito.splice(index, 1);                                           // Quita 1 producto en la posicion index
    guardarCarrito();                                                   // Guardar el carrito
    mostrarCarrito();                                                   // Mostrar el carrito
}

// ===============================
// EJERCICIO 6: Guardar en localStorage
// =============================== 
function guardarCarrito() {                                             // Funcion que guarda el carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));                                           // Guardar el carrito en localStorage
}

function cargarCarrito() {                                               // Funcion que carga el carrito
    const guardado = localStorage.getItem("carrito");                    // Obtener el carrito guardado
    if (guardado) {                                                     // Si existe el carrito guardado
        carrito = JSON.parse(guardado);                                 // Parsear el JSON
    }                                                                   //  
}

// ===============================
// EJERCICIO 7: Contador y total
// ===============================

//Aca tuve un problema, se me pide que sea en el header, yo tenia un nav con la fun de nombre, intente modificarlo,no me salio, asi que borre el nav, 
//Y puse unincamente un header en el HTML, el codigo se me rompia si usaba nav en lugar de header, el filtro no funcionaba, o el alumno no se imprimia.
//Para que se deje de romper, en CSS, hice que el carrito sea un hoover, en lugar de que este abajo
//No fue algo estetico (queda mejor igual), fue que nav, header y el filtro de busqueda con el manejo del inner se me rompia cuando el carrito estaba abajo
function actualizarContadorYTotal() {                                    // Funcion que actualiza el contador y el total    
    const contador = document.getElementById("contador-carrito");       // Obtener el contador
    const total = document.getElementById("total-carrito");             // Obtener el total

    contador.textContent = `Carrito: ${carrito.length} productos`;      // Actualizar el contador con el número de productos del carrito

    let suma = 0;                                                       // Crear un suma
    carrito.forEach(item => suma += item.precio);                       // Iterar sobre cada producto del carrito y sumar el precio

    total.textContent = `Total: $${suma}`;                               // Actualizar el total
}

// ===============================
// EJERCICIO 8: Ordenar productos
// ===============================
// Funcion que ordena el carrito por nombre
function ordenarPorNombre() {                                          // Funcion que ordena el carrito por nombre
    const ordenados = [...arrayFrutas].sort((a, b) =>                // Ordenar los productos
        a.nombre.localeCompare(b.nombre)                            // Comparar los nombres de forma localizada 
    );
    mostrarProductos(ordenados);                                     // Mostrar los productos ordenados
}
// Funcion que ordena el carrito por precio
function ordenarPorPrecio() {                                         // Funcion que ordena el carrito por precio
    const ordenados = [...arrayFrutas].sort((a, b) =>                // Ordenar los productos
        a.precio - b.precio                                         // Comparar los precios
    );
    mostrarProductos(ordenados);                                     // Mostrar los productos ordenados
}

// ===============================
// EJERCICIO 9: Vaciar carrito
// ===============================
// Funcion que vacia el carrito
function vaciarCarrito() {                                           // Funcion que vacia el carrito
    carrito = [];                                                   // Vaciar el carrito
    guardarCarrito();                                               // Guardar el carrito
}
// Funcion que inicializa todo 
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
    imprimirDatosAlumno();                                           // Muestra alumno
    cargarCarrito();                                                 // Recupera carrito guardado
    mostrarProductos(arrayFrutas);                                   // Muestra frutas
    mostrarCarrito();                                                // Muestra carrito si hay algo
}

document.addEventListener("DOMContentLoaded", init);                // Inicializar todo  

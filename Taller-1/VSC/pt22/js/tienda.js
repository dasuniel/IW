// Productos iniciales
let productos = [
    {
        id: 1,
        nombre: "Inception",
        precio: 15000,
        video: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzlpcnEwNGJmb3Ntdmxxd2RudG9mb29mM3U3c3ZiOXdreXBkNmNudyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9UqRcQHzBou6A/giphy.gif",
        director: "Christopher Nolan",
        genero: "Ciencia Ficción",
        duracion: 148
    },
    {
        id: 2,
        nombre: "The Godfather",
        precio: 18000,
        video: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjdxOGg4MXpoNDMyZTk4b2pmbHZrMjF1OWhuemt3MjU4M2gyN3I5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xrvCI5ykhg9QQ/giphy.gif",
        director: "Francis Ford Coppola",
        genero: "Drama",
        duracion: 175
    },
    {
        id: 3,
        nombre: "Pulp Fiction",
        precio: 16000,
        video: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN213dnA4ZGl1YXkzY2tncGI0ZXF6Yzd1NzR6azg5aGlxazNjdm5qdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6uGhT1O4sxpi8/giphy.gif",
        director: "Quentin Tarantino",
        genero: "Acción",
        duracion: 154
    }
];

let carrito = [];
let contador_id = 4;

// Cargar productos
function cargar_productos() {
    const grid = document.getElementById('productos-grid');
    grid.innerHTML = '';
    
    productos.forEach(p => {
        grid.innerHTML += `
            <div class="producto-tarjeta">
                <img src="${p.video}" class="producto-video">
                <div class="producto-info">
                    <h3>${p.nombre}</h3>
                    <p class="producto-precio">$${p.precio.toLocaleString()}</p>
                    <p><strong>Director:</strong> ${p.director}</p>
                    <p><strong>Género:</strong> ${p.genero}</p>
                    <p><strong>Duración:</strong> ${p.duracion} min</p>
                    <button class="boton-agregar-carrito" onclick="agregar_al_carrito(${p.id})">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
    });
}

// Agregar al carrito
function agregar_al_carrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(item => item.id === id);
    
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    
    actualizar_carrito();
}

// Actualizar carrito
function actualizar_carrito() {
    const contenido = document.getElementById('carrito-contenido');
    const contador = document.getElementById('contador-carrito');
    const total_div = document.getElementById('carrito-total');
    
    contador.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    if (carrito.length === 0) {
        contenido.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        total_div.innerHTML = '';
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        html += `
            <div class="carrito-item">
                <img src="${item.video}" class="carrito-item-video">
                <div>
                    <h4>${item.nombre}</h4>
                    <p>Precio: $${item.precio.toLocaleString()}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Subtotal: $${subtotal.toLocaleString()}</p>
                </div>
            </div>
        `;
    });
    
    contenido.innerHTML = html;
    total_div.innerHTML = `Total: $${total.toLocaleString()}`;
}

// Vaciar carrito
function vaciar_carrito() {
    carrito = [];
    actualizar_carrito();
}

// Manejar formulario
document.getElementById('formulario-articulo').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const precio = parseInt(document.getElementById('precio').value);
    
    if (precio < 1000) {
        alert('Error: El precio debe ser mayor o igual a 1.000');
        return;
    }
    
    productos.push({
        id: contador_id++,
        nombre: document.getElementById('nombre').value,
        precio: precio,
        video: document.getElementById('video').value,
        director: document.getElementById('director').value,
        genero: document.getElementById('genero').value,
        duracion: parseInt(document.getElementById('duracion').value)
    });
    
    cargar_productos();
    this.reset();
    alert('¡Película agregada!');
});

// Inicializar
document.getElementById('boton-vaciar').addEventListener('click', vaciar_carrito);
cargar_productos();
actualizar_carrito();

/**********************
 * CONTROL DEL CARRITO (ABRIR / CERRAR)
 **********************/

const carritoIcono = document.getElementById("carrito-icono");
const carritoModal = document.getElementById("carrito-modal");

// Abrir o cerrar carrito al hacer click en el icono
carritoIcono.addEventListener("click", function (e) {
    e.stopPropagation(); // evita que el click se propague al document
    carritoModal.classList.toggle("abierto");
});

// Cerrar carrito si se hace click fuera
document.addEventListener("click", function () {
    carritoModal.classList.remove("abierto");
});

// Evita que al hacer click dentro del modal se cierre
carritoModal.addEventListener("click", function (e) {
    e.stopPropagation();
});

let carrito = [];

const listaLibrosInicial = [
    "Rayuela — Julio Cortázar",
    "Bestiario — Julio Cortázar",
    "Final del juego — Julio Cortázar",
    "Ficciones — Jorge Luis Borges",
    "El Aleph — Jorge Luis Borges",
    "El libro de arena — Jorge Luis Borges",
    "Sobre héroes y tumbas — Ernesto Sabato",
    "Abaddón el exterminador — Ernesto Sabato",
    "Glosa — Juan José Saer",
    "La pesquisa — Juan José Saer",
    "Cicatrices — Juan José Saer",
    "Los premios — Julio Cortázar",
    "Historias de cronopios y de famas — Julio Cortázar",
    "Inquisiciones — Jorge Luis Borges",
    "El entenado — Juan José Saer",
    "Respiración artificial — Ricardo Piglia"
];

// Mostrar lista inicial cuando carga la página
window.onload = () => {
    mostrarListaInicial();
};

// Busca libros en la API según un query
async function buscarLibros(query) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
    const data = await res.json();
    return data.items ? data.items[0] : null; // Tomo el primer resultado
}

async function mostrarListaInicial() {
    const contenedor = document.getElementById('lista-inicial');
    contenedor.innerHTML = '';

    // Genero todas las promesas de búsqueda a la vez
    const promesas = listaLibrosInicial.map(titulo => buscarLibros(titulo));
    
    // Espero a que terminen todas
    const resultados = await Promise.all(promesas);

    // Recorro resultados y los muestro
    resultados.forEach(libro => {
        if (libro) {
            const tituloLibro = libro.volumeInfo.title;
            const autores = libro.volumeInfo.authors?.join(", ") || "Desconocido";
            const imagen = libro.volumeInfo.imageLinks?.thumbnail || "";
            const precio = Math.floor(Math.random() * 20) + 10;

            const div = document.createElement('div');
            div.className = 'libro';
            div.innerHTML = `
                <img src="${imagen}" alt="${tituloLibro}" style="width:100px;"><br>
                <strong>${tituloLibro}</strong><br>
                <em>${autores}</em><br>
                <p>$${precio}</p>
                <button onclick='agregarAlCarrito("${tituloLibro}", ${precio})'>Agregar</button>
            `;
            contenedor.appendChild(div);
        }
    });
}



function mostrarResultados(libros) {
    const contenedor = document.getElementById('resultados');
    contenedor.innerHTML = '';
    libros.forEach(libro => {
        const titulo = libro.volumeInfo.title;
        const autores = libro.volumeInfo.authors?.join(", ") || "Desconocido";
        const imagen = libro.volumeInfo.imageLinks?.thumbnail || "";
        const precio = Math.floor(Math.random() * 20) + 10;

        const div = document.createElement('div');
        div.className = 'libro';
        div.innerHTML = `
            <img src="${imagen}" alt="${titulo}" style="width:100px;"><br>
            <strong>${titulo}</strong><br>
            <em>${autores}</em><br>
            <p>$${precio}</p>
            <button onclick='agregarAlCarrito("${titulo}", ${precio})'>Agregar</button>
        `;
        contenedor.appendChild(div);
    });
}

// 📌 Carrito
function agregarAlCarrito(titulo, precio) {
    carrito.push({ titulo, precio });
    mostrarCarrito();

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `"${titulo}" se agregó al carrito`,
        showConfirmButton: false,
        position: "center",
        timer: 1200
    });
}


function mostrarCarrito() {
    const contenedor = document.getElementById('carrito');
    contenedor.innerHTML = '';
    carrito.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            ${item.titulo} - $${item.precio}
            <button onclick="eliminarDelCarrito(${index})">X</button>
        `;
        contenedor.appendChild(div);
    });
}

function eliminarDelCarrito(index) {
    const eliminado = carrito[index];
    carrito.splice(index, 1);
    mostrarCarrito();

    Swal.fire({
        position: "top-end",
        icon: "info",
        title: `"${eliminado.titulo}" se eliminó del carrito`,
        showConfirmButton: false,
        position: "center",
        timer: 1200
    });
}


function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Carrito vacío",
            text: "Agregá al menos un libro antes de finalizar la compra.",
            confirmButtonText: "Entendido"
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "🎉 ¡Gracias por tu compra!",
        text: "Tu pedido ha sido registrado con éxito.",
        confirmButtonText: "Aceptar"
    });

    carrito = [];
    mostrarCarrito();
}

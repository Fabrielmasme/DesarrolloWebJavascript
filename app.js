const form = document.getElementById("notaForm");
const lista = document.getElementById("listaNotas");

// Cargar notas existentes del localStorage
document.addEventListener("DOMContentLoaded", mostrarNotas);

// Evento al enviar el formulario
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const nota = document.getElementById("nota").value;

  const nuevaNota = { nombre, nota };

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  notas.push(nuevaNota);

  localStorage.setItem("notas", JSON.stringify(notas));

  form.reset();

  mostrarNotas();
});

// Función para mostrar las notas en la lista
function mostrarNotas() {
  lista.innerHTML = ""; // Limpiar la lista

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  notas.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = `${item.nombre}: ${item.nota}`;

    // Botón para eliminar nota
    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => eliminarNota(index);

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

// Función para eliminar una nota
function eliminarNota(index) {
  let notas = JSON.parse(localStorage.getItem("notas")) || [];
  notas.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(notas));
  mostrarNotas();
}


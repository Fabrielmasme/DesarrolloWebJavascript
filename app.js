const IVA = 0.21;
let carrito = [];

function iniciarSimulador() {
  alert("Bienvenido al Simulador de Tienda.\nAbre la consola para ver los registros detallados.");
  console.log("=== Simulador iniciado ===");

  const nombreUsuario = prompt("Ingresa tu nombre:");
  console.log("Usuario:", nombreUsuario);

  let seguir = true;
  while (seguir) {
    console.log("\nMenú:");
    console.log("1 - Registrar productos en carrito");
    console.log("2 - Mostrar carrito en consola");
    console.log("3 - Calcular total y mostrar resumen");
    console.log("4 - Vaciar carrito");
    console.log("5 - Salir del simulador");

    const opcion = prompt(
      "Elige una opción (1-5):\n1 Registrar producto\n2 Mostrar carrito\n3 Calcular total\n4 Vaciar carrito\n5 Salir"
    );

    if (!opcion) {
      alert("No ingresaste ninguna opción. Saliendo.");
      console.log("Salida por falta de opción.");
      break;
    }

    switch (opcion.trim()) {
      case "1":
        registrarProductos();
        break;
      case "2":
        mostrarCarrito();
        break;
      case "3":
        calcularTotal();
        break;
      case "4":
        if (confirm("¿Estás seguro que quieres vaciar el carrito?")) {
          carrito = [];
          alert("Carrito vaciado.");
          console.log("Carrito vaciado por el usuario.");
        }
        break;
      case "5":
        seguir = false;
        break;
      default:
        alert("Opción inválida. Intenta con 1-5.");
        console.log("Opción inválida ingresada:", opcion);
    }
  }

  alert("Gracias por usar el simulador. ¡Hasta luego!");
  console.log("=== Simulador terminado ===");
}

function registrarProductos() {
  let agregar = true;

  while (agregar) {
    const nombre = prompt("Nombre del producto (dejar vacío para cancelar):");
    if (!nombre || nombre.trim() === "") {
      console.log("Registro de producto cancelado o nombre vacío.");
      break;
    }

    let precioRaw = prompt("Precio unitario del producto (ej: 250):");
    let precio = Number(precioRaw);
    while (isNaN(precio) || precio <= 0) {
      precioRaw = prompt("Precio inválido. Ingresa un número mayor que 0:");
      if (precioRaw === null) break;
      precio = Number(precioRaw);
    }
    if (precioRaw === null) {
      console.log("Ingreso de precio cancelado.");
      break;
    }

    let cantidadRaw = prompt("Cantidad a agregar (ej: 2):");
    let cantidad = parseInt(cantidadRaw);
    while (isNaN(cantidad) || cantidad <= 0) {
      cantidadRaw = prompt("Cantidad inválida. Ingresa un entero mayor que 0:");
      if (cantidadRaw === null) break;
      cantidad = parseInt(cantidadRaw);
    }
    if (cantidadRaw === null) {
      console.log("Ingreso de cantidad cancelado.");
      break;
    }

    const producto = {
      nombre: nombre.trim(),
      precio: precio,
      cantidad: cantidad,
    };
    carrito.push(producto);

    alert("Producto agregado: " + producto.nombre + " x" + producto.cantidad);
    console.log("Producto registrado:", producto);

    agregar = confirm("¿Deseas agregar otro producto al carrito?");
  }
}


function calcularTotal() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos primero.");
    console.log("Intento de calcular total con carrito vacío.");
    return;
  }

  let subtotal = 0;

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const itemTotal = item.precio * item.cantidad;
    subtotal += itemTotal;
    console.log(`Ítem ${i + 1}: ${item.nombre} - ${item.cantidad} x ${item.precio} = ${itemTotal}`);
  }

  const impuesto = subtotal * IVA;
  const total = subtotal + impuesto;

  const mensaje =
    "Resumen de compra:\n" +
    "Subtotal: $" + subtotal.toFixed(2) + "\n" +
    "IVA (" + (IVA * 100) + "%): $" + impuesto.toFixed(2) + "\n" +
    "TOTAL: $" + total.toFixed(2) + "\n" +
    "Cantidad de productos distintos: " + carrito.length;

  alert(mensaje);
  console.log("Resumen calculado:", { subtotal, impuesto, total, items: carrito.length });
}


function mostrarCarrito() {
  if (carrito.length === 0) {
    console.log("Carrito vacío.");
    alert("El carrito está vacío. Nada que mostrar en consola.");
    return;
  }

  console.log("=== Contenido del carrito ===");
  carrito.forEach((p, idx) => {
    console.log(`${idx + 1}. ${p.nombre} - Cant: ${p.cantidad} - Precio unit: $${p.precio}`);
  });
  console.log("=== Fin del carrito ===");

  alert("Se ha mostrado el carrito en la consola (abre la consola del navegador).");
}

document.getElementById("btnIniciar").addEventListener("click", () => {
  iniciarSimulador();
});


const carrito = [];
const carritoContainer = document.querySelector('.cart-items');
const totalContainer = document.getElementById('cart-total-amount');

document.addEventListener('productoSeleccionado', (e) => {
    const producto = e.detail;
    carrito.push(producto);
    renderizarCarrito();
});

function renderizarCarrito() {
    carritoContainer.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.nombre} - $${item.precio}</span>
            <button class="remove-btn" data-index="${index}">Quitar</button>
        `;
        carritoContainer.appendChild(itemDiv);
        total += parseFloat(item.precio);
    });

    totalContainer.textContent = `$${total}`;
}

// Quitar productos del carrito
carritoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        renderizarCarrito();
    }
});
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agregue productos antes de comprar.');
        return;
    }
    
    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
 // Redirigir a la página de pagos
 window.location.href = '/Pagos(Adapter)/VIEW/pagos.html';
}

// Asignar evento al botón de comprar (esto puede ir en el HTML también)
document.getElementById('finalizar-compra-btn').addEventListener('click', finalizarCompra);

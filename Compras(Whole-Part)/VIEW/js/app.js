const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const carritoContainer = document.querySelector('.cart-items');
const totalContainer = document.getElementById('cart-total-amount');

function calcularTotal() {
    return carrito.reduce((total, item) => total + parseFloat(item.precio), 0);
}

document.addEventListener('productoSeleccionado', (e) => {
    const producto = e.detail;
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('totalCarrito', calcularTotal());
    renderizarCarrito();
});

function renderizarCarrito() {
    carritoContainer.innerHTML = '';
    const total = calcularTotal();

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

    totalContainer.textContent = `$${total.toFixed(2)}`;
}

// Quitar productos del carrito
carritoContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const index = e.target.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('totalCarrito', calcularTotal());
        renderizarCarrito();
    }
});

document.getElementById('finalizar-compra-btn').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    // Guardar el total antes de redirigir
    localStorage.setItem('totalCarrito', calcularTotal());
    window.location.href = 'pagos.js';
});
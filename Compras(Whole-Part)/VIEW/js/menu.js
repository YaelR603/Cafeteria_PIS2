// Manejo de interacciones con el menú
document.addEventListener('DOMContentLoaded', () => {
    // Cambiar categorías del menú
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.menu-items').forEach(section => {
                section.classList.add('hidden');
            });
            
            document.getElementById(btn.dataset.category).classList.remove('hidden');
        });
    });

    // Control de cantidades
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.quantity-controls');
            const quantityElement = container.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (btn.classList.contains('minus') {
                quantity = Math.max(0, quantity - 1);
            } else {
                quantity += 1;
            }
            
            quantityElement.textContent = quantity;
        });
    });

    // Agregar items al carrito
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemContainer = btn.closest('.menu-item');
            const name = itemContainer.querySelector('h3').textContent;
            const description = itemContainer.querySelector('.item-description').textContent;
            const price = parseFloat(itemContainer.querySelector('.item-price').textContent.replace('$', ''));
            const quantity = parseInt(itemContainer.querySelector('.quantity').textContent);
            
            if (quantity > 0) {
                addToCart(name, description, price, quantity);
                itemContainer.querySelector('.quantity').textContent = '0';
            }
        });
    });

    // Finalizar compra
    document.getElementById('finalizar-compra-btn').addEventListener('click', () => {
        if (document.querySelectorAll('.cart-item').length > 0) {
            document.getElementById('modal-pago').classList.remove('hidden');
        } else {
            alert('El carrito está vacío');
        }
    });
});

// Función para agregar items al carrito
function addToCart(name, description, price, quantity) {
    const cartItems = document.querySelector('.cart-items');
    const totalElement = document.getElementById('cart-total-amount');
    let total = parseFloat(totalElement.textContent.replace('$', ''));
    
    // Actualizar total
    total += price * quantity;
    totalElement.textContent = `$${total.toFixed(2)}`;
    
    // Crear elemento del carrito
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-name">${name}</div>
        <div class="cart-item-quantity">${quantity}</div>
        <div class="cart-item-price">$${(price * quantity).toFixed(2)}</div>
    `;
    
    cartItems.appendChild(cartItem);
}
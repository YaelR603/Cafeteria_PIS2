document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos del carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Calcular total
    const totalAmount = carrito.reduce((total, item) => total + parseFloat(item.precio), 0);
    
    // Elementos del DOM
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');
    // ... resto del código existente ...
    
    // Cargar ítems del carrito (modificar esta función)
    function loadCartItems() {
        cartItemsContainer.innerHTML = '';
        carrito.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.nombre}</span>
                <span>$${parseFloat(item.precio).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
    
    // ... resto del código existente ...
    
    // Al final, cargar los ítems
    loadCartItems();
    generateQRCode();
});
    
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Elementos del DOM
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const payButton = document.getElementById('pay-btn');
    const cancelButton = document.getElementById('cancel-btn');
    const receiptModal = document.getElementById('receipt-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal, #close-receipt');
    const printReceiptButton = document.getElementById('print-receipt');
    const receiptContent = document.getElementById('receipt-content');
    const qrStatusText = document.getElementById('qr-status-text');
    const qrImage = document.getElementById('qr-image');
    
    // Cargar ítems del carrito
    function loadCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
    
    // Cambiar pestañas de método de pago
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const method = button.dataset.method;
            
            // Actualizar botones activos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Actualizar contenido visible
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(method).classList.add('active');
            
            // Generar nuevo QR si es el método seleccionado
            if (method === 'efectivo_qr') {
                generateQRCode();
            }
        });
    });
    
    // Generar código QR
    function generateQRCode() {
        const randomCode = `COMEDOR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${randomCode}`;
        qrStatusText.textContent = 'Esperando pago...';
        
        // Simular verificación de pago QR
        simulateQRPayment(randomCode);
    }
    
    // Simular pago con QR
    function simulateQRPayment(qrCode) {
        // Simular tiempo de espera para el pago
        setTimeout(() => {
            // 80% de probabilidad de éxito (como en el backend)
            if (Math.random() < 0.8) {
                qrStatusText.textContent = 'Pago confirmado!';
                qrStatusText.style.color = 'var(--success-color)';
            } else {
                qrStatusText.textContent = 'Pago fallido. Intente nuevamente.';
                qrStatusText.style.color = 'var(--danger-color)';
            }
        }, 3000);
    }
    
    // Realizar pago
    payButton.addEventListener('click', async () => {
        const activeMethod = document.querySelector('.tab-btn.active').dataset.method;
        let paymentConfig = {};
        let isValid = true;
        
        // Validar datos según el método de pago
        switch (activeMethod) {
            case 'tarjeta':
                const cardNumber = document.getElementById('card-number').value;
                const cardName = document.getElementById('card-name').value;
                const cardExpiry = document.getElementById('card-expiry').value;
                const cardCvv = document.getElementById('card-cvv').value;
                
                if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                    alert('Por favor complete todos los campos de la tarjeta');
                    isValid = false;
                    break;
                }
                
                paymentConfig = {
                    numeroTarjeta: cardNumber,
                    nombreTitular: cardName,
                    fechaVencimiento: cardExpiry,
                    cvv: cardCvv
                };
                break;
                
            case 'efectivo_qr':
                if (qrStatusText.textContent !== 'Pago confirmado!') {
                    alert('El pago QR no ha sido confirmado aún');
                    isValid = false;
                }
                paymentConfig = { codigoQR: qrImage.src.split('data=')[1] };
                break;
                
            case 'paypal':
                const paypalEmail = document.getElementById('paypal-email').value;
                if (!paypalEmail) {
                    alert('Por favor ingrese su correo de PayPal');
                    isValid = false;
                    break;
                }
                paymentConfig = { email: paypalEmail };
                break;
        }
        
        if (!isValid) return;
        
        // Mostrar carga
        payButton.disabled = true;
        payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        
        try {
            // Simular llamada al backend (en un caso real sería una llamada fetch)
            const paymentResult = await simulateBackendPayment(totalAmount, activeMethod, paymentConfig);
            
            if (paymentResult.exito) {
                // Mostrar comprobante
                showReceipt(paymentResult);
            } else {
                alert(`Error en el pago: ${paymentResult.error}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            // Restaurar botón
            payButton.disabled = false;
            payButton.textContent = 'Realizar Pago';
        }
    });
    
    // Simular llamada al backend
    async function simulateBackendPayment(monto, tipoMetodo, configMetodo) {
        // Simular tiempo de procesamiento según el método
        let processingTime = 1000; // 1 segundo por defecto
        
        if (tipoMetodo === 'tarjeta') processingTime = 1500;
        if (tipoMetodo === 'paypal') processingTime = 1200;
        if (tipoMetodo === 'efectivo_qr') processingTime = 800;
        
        await new Promise(resolve => setTimeout(resolve, processingTime));
        
        // Simular fallos aleatorios según las probabilidades del backend
        let exito = true;
        let error = null;
        
        switch (tipoMetodo) {
            case 'tarjeta':
                if (Math.random() < 0.1) {
                    exito = false;
                    error = "Pago rechazado por el banco";
                }
                break;
            case 'paypal':
                if (Math.random() < 0.15) {
                    exito = false;
                    error = "Fallo en la transacción PayPal";
                }
                break;
            case 'efectivo_qr':
                if (Math.random() >= 0.8) {
                    exito = false;
                    error = "Pago QR no confirmado";
                }
                break;
        }
        
        if (exito) {
            // Generar datos de comprobante
            const now = new Date();
            return {
                exito: true,
                datos: {
                    estado: 'completado',
                    fecha: now,
                    metodo: {
                        tipo: tipoMetodo,
                        ...(tipoMetodo === 'tarjeta' ? { 
                            ultimosDigitos: configMetodo.numeroTarjeta.slice(-4),
                            titular: configMetodo.nombreTitular
                        } : {}),
                        ...(tipoMetodo === 'efectivo_qr' ? {
                            codigoQR: configMetodo.codigoQR,
                            estado: 'completado'
                        } : {}),
                        ...(tipoMetodo === 'paypal' ? {
                            email: configMetodo.email
                        } : {})
                    },
                    comprobante: {
                        codigo: `COMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                        fecha: now,
                        monto: monto,
                        estado: 'completado'
                    }
                }
            };
        } else {
            return { exito: false, error, tipo: tipoMetodo };
        }
    }
    
    // Mostrar comprobante
    function showReceipt(paymentResult) {
        const { datos } = paymentResult;
        const { comprobante, metodo } = datos;
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalAmount = carrito.reduce((total, item) => total + parseFloat(item.precio), 0);
        
        receiptContent.innerHTML = `
            <div class="receipt">
                <!-- ... encabezado y detalles existentes ... -->
                
                <div class="receipt-items">
                    <h5>Detalle de Compra</h5>
                    ${carrito.map(item => `
                    <div class="receipt-item">
                        <span>${item.nombre}</span>
                        <span>$${parseFloat(item.precio).toFixed(2)}</span>
                    </div>
                    `).join('')}
                </div>
                
                <div class="receipt-total">
                    <span>Total:</span>
                    <span>$${totalAmount.toFixed(2)}</span>
                </div>
                
                <!-- ... pie de página existente ... -->
            </div>
        `;
        
        receiptModal.classList.add('active');
    }
    
    // Imprimir comprobante
    printReceiptButton.addEventListener('click', () => {
        window.print();
    });
    
    // Cancelar compra
    cancelButton.addEventListener('click', () => {
        if (confirm('¿Está seguro que desea cancelar la compra?')) {
            // Redirigir o limpiar el formulario
            window.location.href = 'menu.html'; // Asumiendo que hay una página de menú
        }
    });
    
    // Cargar datos iniciales
    loadCartItems();
    generateQRCode();

document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');

    let total = 0;

    carrito.forEach(producto => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.textContent = `${producto.nombre} - $${producto.precio}`;
        cartItemsContainer.appendChild(itemDiv);
        total += parseFloat(producto.precio);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
});

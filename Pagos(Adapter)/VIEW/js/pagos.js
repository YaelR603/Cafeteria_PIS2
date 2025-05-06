document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos del carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalAmount = parseFloat(localStorage.getItem('totalCarrito')) || 0;
    
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
    
    // Cambiar pestañas de método de pago
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const method = button.dataset.method;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(method).classList.add('active');
            
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
        qrStatusText.style.color = 'inherit';
        
        simulateQRPayment(randomCode);
    }
    
    // Simular pago con QR
    function simulateQRPayment(qrCode) {
        setTimeout(() => {
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
        
        payButton.disabled = true;
        payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        
        try {
            const paymentResult = await simulateBackendPayment(totalAmount, activeMethod, paymentConfig);
            
            if (paymentResult.exito) {
                showReceipt(paymentResult);
            } else {
                alert(`Error en el pago: ${paymentResult.error}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            payButton.disabled = false;
            payButton.textContent = 'Realizar Pago';
        }
    });
    
    // Simular llamada al backend
    async function simulateBackendPayment(monto, tipoMetodo, configMetodo) {
        let processingTime = 1000;
        if (tipoMetodo === 'tarjeta') processingTime = 1500;
        if (tipoMetodo === 'paypal') processingTime = 1200;
        if (tipoMetodo === 'efectivo_qr') processingTime = 800;
        
        await new Promise(resolve => setTimeout(resolve, processingTime));
        
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
        
        receiptContent.innerHTML = `
            <div class="receipt">
                <div class="receipt-header">
                    <h4>Comedor Universitario</h4>
                    <p>Comprobante de Pago</p>
                </div>
                
                <div class="receipt-details">
                    <div class="receipt-detail">
                        <span>Código:</span>
                        <span>${comprobante.codigo}</span>
                    </div>
                    <div class="receipt-detail">
                        <span>Fecha:</span>
                        <span>${comprobante.fecha.toLocaleString()}</span>
                    </div>
                    <div class="receipt-detail">
                        <span>Método:</span>
                        <span>${getPaymentMethodName(metodo.tipo)}</span>
                    </div>
                    ${metodo.tipo === 'tarjeta' ? `
                    <div class="receipt-detail">
                        <span>Tarjeta:</span>
                        <span>**** **** **** ${metodo.ultimosDigitos}</span>
                    </div>
                    <div class="receipt-detail">
                        <span>Titular:</span>
                        <span>${metodo.titular}</span>
                    </div>
                    ` : ''}
                    ${metodo.tipo === 'paypal' ? `
                    <div class="receipt-detail">
                        <span>PayPal:</span>
                        <span>${metodo.email}</span>
                    </div>
                    ` : ''}
                    ${metodo.tipo === 'efectivo_qr' ? `
                    <div class="receipt-detail">
                        <span>Código QR:</span>
                        <span>${metodo.codigoQR.split('data=')[1].substring(0, 15)}...</span>
                    </div>
                    ` : ''}
                </div>
                
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
                
                <div class="receipt-footer">
                    <p>¡Gracias por su compra!</p>
                    <p>Presente este comprobante para retirar su pedido</p>
                </div>
            </div>
        `;
        
        receiptModal.classList.add('active');
    }
    
    function getPaymentMethodName(method) {
        switch (method) {
            case 'tarjeta': return 'Tarjeta de Crédito/Débito';
            case 'efectivo_qr': return 'Pago QR';
            case 'paypal': return 'PayPal';
            default: return method;
        }
    }
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            receiptModal.classList.remove('active');
        });
    });
    
    printReceiptButton.addEventListener('click', () => {
        window.print();
    });
    
    cancelButton.addEventListener('click', () => {
        if (confirm('¿Está seguro que desea cancelar la compra?')) {
            window.location.href = 'menu.html';
        }
    });
    
    // Inicialización
    loadCartItems();
    generateQRCode();
});
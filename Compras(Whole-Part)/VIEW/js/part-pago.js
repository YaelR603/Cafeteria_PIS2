// Part: Componente de Pago
const pagoUI = {
    init(controladorCompras, usuarioId) {
        this.controladorCompras = controladorCompras;
        this.usuarioId = usuarioId;
        
        // Elementos UI
        this.selectMetodoPago = document.getElementById('metodo-pago');
        this.pagoDetails = document.getElementById('pago-details');
        this.btnProcesarPago = document.getElementById('procesar-pago');
        this.comprobanteContainer = document.getElementById('comprobante-container');
        this.comprobanteContent = document.getElementById('comprobante-content');
        this.btnFinalizarCompra = document.getElementById('finalizar-compra');
        
        // Inicializar event listeners
        this.initEventListeners();
    },
    
    initEventListeners() {
        this.selectMetodoPago.addEventListener('change', () => {
            this.mostrarDetallesPago(this.selectMetodoPago.value);
        });
        
        this.btnProcesarPago.addEventListener('click', async () => {
            await this.procesarPago();
        });
        
        this.btnFinalizarCompra.addEventListener('click', () => {
            this.comprobanteContainer.classList.add('hidden');
            app.volverInicio();
        });
    },
    
    mostrarDetallesPago(metodo) {
        this.pagoDetails.innerHTML = '';
        
        if (!metodo) {
            this.pagoDetails.classList.add('hidden');
            this.btnProcesarPago.classList.add('hidden');
            return;
        }
        
        this.pagoDetails.classList.remove('hidden');
        
        const metodos = this.controladorCompras.listarMetodosPagoDisponibles();
        const config = metodos[metodo];
        
        if (!config) {
            this.pagoDetails.innerHTML = '<p>Método de pago no válido</p>';
            return;
        }
        
        let html = `<h4>${this.getMetodoNombre(metodo)}</h4>`;
        
        config.requiere.forEach(campo => {
            html += `
                <div class="payment-field">
                    <label for="pago-${campo}">${this.getCampoNombre(campo)}:</label>
                    <input type="${this.getTipoInput(campo)}" id="pago-${campo}" required>
                </div>
            `;
        });
        
        this.pagoDetails.innerHTML = html;
        this.btnProcesarPago.classList.remove('hidden');
    },
    
    async procesarPago() {
        const metodo = this.selectMetodoPago.value;
        if (!metodo) {
            alert('Seleccione un método de pago');
            return;
        }
        
        try {
            // Obtener configuración del pago
            const config = {};
            const metodos = this.controladorCompras.listarMetodosPagoDisponibles();
            metodos[metodo].requiere.forEach(campo => {
                config[campo] = document.getElementById(`pago-${campo}`).value;
            });
            
            // Procesar compra
            const resultado = await this.controladorCompras.finalizarCompra(
                this.usuarioId,
                metodo,
                config
            );
            
            // Mostrar comprobante
            this.mostrarComprobante(resultado.comprobante);
        } catch (error) {
            alert(`Error al procesar pago: ${error.message}`);
        }
    },
    
    mostrarComprobante(comprobante) {
        this.comprobanteContent.innerHTML = `
            <p><strong>Código:</strong> ${comprobante.codigo}</p>
            <p><strong>Fecha:</strong> ${new Date(comprobante.fecha).toLocaleString()}</p>
            <p><strong>Total:</strong> $${comprobante.total.toFixed(2)}</p>
            <p><strong>Estado:</strong> ${comprobante.estadoCompra}</p>
            
            <h4>Items:</h4>
            <ul>
                ${comprobante.items.map(item => `
                    <li>${item.cantidad}x ${item.nombre} - $${item.subtotal.toFixed(2)}</li>
                `).join('')}
            </ul>
            
            <h4>Pago:</h4>
            <p><strong>Método:</strong> ${comprobante.pago.metodo}</p>
            <p><strong>Estado:</strong> ${comprobante.pago.estado}</p>
        `;
        
        this.comprobanteContainer.classList.remove('hidden');
    },
    
    getMetodoNombre(metodo) {
        const nombres = {
            tarjeta: 'Tarjeta de Crédito/Débito',
            efectivo_qr: 'Efectivo QR',
            paypal: 'PayPal'
        };
        return nombres[metodo] || metodo;
    },
    
    getCampoNombre(campo) {
        const nombres = {
            numeroTarjeta: 'Número de Tarjeta',
            nombreTitular: 'Nombre del Titular',
            fechaVencimiento: 'Fecha de Vencimiento',
            cvv: 'CVV',
            codigoQR: 'Código QR',
            email: 'Email de PayPal'
        };
        return nombres[campo] || campo;
    },
    
    getTipoInput(campo) {
        if (campo === 'fechaVencimiento') return 'month';
        if (campo === 'email') return 'email';
        if (campo === 'cvv') return 'password';
        return 'text';
    }
};
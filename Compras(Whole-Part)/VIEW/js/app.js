// Whole: Sistema de Compras - Controlador principal
class App {
    constructor() {
        this.usuarioId = null;
        this.controladorCompras = new ControladorCompras();
        
        // Elementos UI
        this.uiUsuarioActual = document.getElementById('usuario-actual');
        this.btnCambiarUsuario = document.getElementById('cambiar-usuario');
        
        // Modales
        this.modalUsuario = document.getElementById('modal-usuario');
        
        // Inicializar
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.btnCambiarUsuario.addEventListener('click', () => this.mostrarModalUsuario());
        
        // Cerrar modales
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.add('hidden');
                });
            });
        });
        
        // Modal usuario
        document.getElementById('form-usuario').addEventListener('submit', (e) => {
            e.preventDefault();
            this.usuarioId = document.getElementById('usuario-id').value;
            this.uiUsuarioActual.textContent = this.usuarioId;
            this.modalUsuario.classList.add('hidden');
        });

        // Métodos de pago
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.procesarCompra(btn.dataset.method);
            });
        });
    }
    
    mostrarModalUsuario() {
        document.getElementById('usuario-id').value = this.usuarioId || '';
        this.modalUsuario.classList.remove('hidden');
    }
    
    async procesarCompra(metodoPago) {
        if (!this.usuarioId) {
            alert('Por favor seleccione un usuario primero');
            this.mostrarModalUsuario();
            return;
        }
        
        try {
            const cartItems = document.querySelectorAll('.cart-item');
            const itemsData = [];
            
            // Obtener datos de los items del carrito
            cartItems.forEach(item => {
                const name = item.querySelector('.cart-item-name').textContent;
                const quantity = parseInt(item.querySelector('.cart-item-quantity').textContent);
                const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', '')) / quantity;
                
                itemsData.push({
                    id: Date.now().toString(),
                    nombre: name,
                    precio: price,
                    cantidad: quantity,
                    categoria: name.includes('Platillo') ? 'platillo' : 
                              name.includes('Boing') ? 'bebida' : 'snack'
                });
            });
            
            // Iniciar compra
            this.controladorCompras.iniciarCompra(this.usuarioId);
            
            // Agregar items a la compra
            itemsData.forEach(item => {
                if (item.categoria === 'platillo') {
                    this.controladorCompras.agregarPlatillo(this.usuarioId, item);
                } else {
                    this.controladorCompras.agregarAlimento(this.usuarioId, item);
                }
            });
            
            // Procesar pago
            const config = {}; // Configuración básica para el ejemplo
            const resultado = await this.controladorCompras.finalizarCompra(
                this.usuarioId,
                metodoPago,
                config
            );
            
            if (resultado.exito) {
                alert('Compra realizada con éxito');
                // Limpiar carrito
                document.querySelector('.cart-items').innerHTML = '';
                document.getElementById('cart-total-amount').textContent = '$0';
            } else {
                alert(`Error al procesar compra: ${resultado.error}`);
            }
            
            document.getElementById('modal-pago').classList.add('hidden');
        } catch (error) {
            alert(`Error al procesar compra: ${error.message}`);
        }
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
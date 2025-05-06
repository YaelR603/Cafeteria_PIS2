// Part: Componente de Compra
const compraUI = {
    init(controladorCompras) {
        this.controladorCompras = controladorCompras;
        
        // Elementos UI
        this.btnAgregarAlimento = document.getElementById('agregar-alimento');
        this.btnAgregarPlatillo = document.getElementById('agregar-platillo');
        this.btnEliminarItem = document.getElementById('eliminar-item');
        this.itemsTable = document.getElementById('items-table').querySelector('tbody');
        this.totalCompra = document.getElementById('total-compra');
        
        // Modales
        this.modalAlimento = document.getElementById('modal-alimento');
        this.modalPlatillo = document.getElementById('modal-platillo');
        
        // Inicializar event listeners
        this.initEventListeners();
        this.actualizarUI();
    },
    
    initEventListeners() {
        this.btnAgregarAlimento.addEventListener('click', () => {
            this.modalAlimento.classList.remove('hidden');
        });
        
        this.btnAgregarPlatillo.addEventListener('click', () => {
            this.modalPlatillo.classList.remove('hidden');
        });
        
        this.btnEliminarItem.addEventListener('click', () => {
            const itemId = prompt("Ingrese el ID del item a eliminar:");
            if (itemId) {
                try {
                    this.controladorCompras.compraActual.eliminarItem(itemId);
                    this.actualizarUI();
                } catch (error) {
                    alert(`Error al eliminar item: ${error.message}`);
                }
            }
        });
        
        // Formulario alimento
        document.getElementById('form-alimento').addEventListener('submit', (e) => {
            e.preventDefault();
            this.agregarAlimento();
        });
        
        // Formulario platillo
        document.getElementById('form-platillo').addEventListener('submit', (e) => {
            e.preventDefault();
            this.agregarPlatillo();
        });
    },
    
    agregarAlimento() {
        try {
            const alimentoData = {
                id: Date.now().toString(),
                nombre: document.getElementById('alimento-nombre').value,
                precio: parseFloat(document.getElementById('alimento-precio').value),
                cantidad: parseInt(document.getElementById('alimento-cantidad').value),
                categoria: document.getElementById('alimento-categoria').value
            };
            
            this.controladorCompras.agregarAlimento(this.controladorCompras.usuarioId, alimentoData);
            this.modalAlimento.classList.add('hidden');
            this.actualizarUI();
            document.getElementById('form-alimento').reset();
        } catch (error) {
            alert(`Error al agregar alimento: ${error.message}`);
        }
    },
    
    agregarPlatillo() {
        try {
            const platilloData = {
                id: Date.now().toString(),
                nombre: document.getElementById('platillo-nombre').value,
                precio: parseFloat(document.getElementById('platillo-precio').value),
                cantidad: parseInt(document.getElementById('platillo-cantidad').value)
            };
            
            this.controladorCompras.agregarPlatillo(this.controladorCompras.usuarioId, platilloData);
            this.modalPlatillo.classList.add('hidden');
            this.actualizarUI();
            document.getElementById('form-platillo').reset();
        } catch (error) {
            alert(`Error al agregar platillo: ${error.message}`);
        }
    },
    
    actualizarUI() {
        // Limpiar tabla
        this.itemsTable.innerHTML = '';
        
        // Verificar si hay compra en curso
        if (!this.controladorCompras.compraActual) {
            return;
        }
        
        // Obtener items y actualizar tabla
        const items = this.controladorCompras.compraActual.obtenerItems();
        
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td>$${item.subtotal.toFixed(2)}</td>
            `;
            this.itemsTable.appendChild(row);
        });
        
        // Actualizar total
        const total = this.controladorCompras.compraActual.obtenerTotal();
        this.totalCompra.textContent = `$${total.toFixed(2)}`;
    }
};
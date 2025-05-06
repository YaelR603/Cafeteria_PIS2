class InventarioView {
    constructor(controlador) {
        this.controlador = controlador;
        this.initUI();
    }

    initUI() {
        // Crear elementos de la interfaz
        this.createForm();
        this.createInventoryList();
    }

    createForm() {
        // Formulario para agregar insumos
        this.form = document.createElement('form');
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Nombre del insumo';
        nameInput.required = true;
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.placeholder = 'Cantidad';
        quantityInput.required = true;
        
        const typeSelect = document.createElement('select');
        typeSelect.innerHTML = `
            <option value="comida">Comida (kg)</option>
            <option value="bebida">Bebida (lt)</option>
            <option value="alimento">Alimento (unidades)</option>
        `;
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Agregar Insumo';
        
        this.form.appendChild(nameInput);
        this.form.appendChild(quantityInput);
        this.form.appendChild(typeSelect);
        this.form.appendChild(submitBtn);
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = nameInput.value;
            const cantidad = parseFloat(quantityInput.value);
            const tipo = typeSelect.value;
            
            switch(tipo) {
                case 'comida':
                    this.controlador.agregarInsumoComida(nombre, cantidad);
                    break;
                case 'bebida':
                    this.controlador.agregarInsumoBebida(nombre, cantidad);
                    break;
                case 'alimento':
                    this.controlador.agregarInsumoAlimento(nombre, cantidad);
                    break;
            }
            
            this.updateInventoryList();
            this.form.reset();
        });
        
        document.body.appendChild(this.form);
    }

    createInventoryList() {
        // Lista para mostrar el inventario
        this.inventoryList = document.createElement('div');
        this.inventoryList.innerHTML = '<h2>Inventario Actual</h2>';
        document.body.appendChild(this.inventoryList);
        this.updateInventoryList();
    }

    updateInventoryList() {
        const inventario = this.controlador.obtenerInventario();
        let html = '<h2>Inventario Actual</h2><ul>';
        
        inventario.forEach(insumo => {
            html += `<li>${insumo.toString()}</li>`;
        });
        
        html += '</ul>';
        this.inventoryList.innerHTML = html;
    }
}

// Exportar para usar en el HTML
// window.InventarioView = InventarioView;
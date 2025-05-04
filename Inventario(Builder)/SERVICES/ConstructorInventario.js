class ConstructorInventario {
    constructor() {
        this.inventario = new (require('./Inventario'))();
    }

    construir() {
        return this.inventario;
    }
}

module.exports = ConstructorInventario;
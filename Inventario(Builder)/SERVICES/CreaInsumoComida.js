const Insumo = require('./Insumo');

class CreaInsumoComida {
    constructor() {
        this.insumo = null;
    }

    reset() {
        this.insumo = null;
    }

    setNombre(nombre) {
        this.insumo = new Insumo(nombre, 'comida', 0, 'kg');
    }

    setCantidad(cantidad) {
        if (this.insumo) this.insumo.cantidad = cantidad;
    }

    getProducto() {
        const producto = this.insumo;
        this.reset();
        return producto;
    }
}

module.exports = CreaInsumoComida;
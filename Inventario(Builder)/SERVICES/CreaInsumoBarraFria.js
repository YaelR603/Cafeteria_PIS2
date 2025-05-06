//const Insumo = require('./Insumo');

class CreaInsumoBarraFria {
    constructor() {
        this.insumo = null;
    }

    reset() {
        this.insumo = null;
    }

    setNombre(nombre) {
        this.insumo = new Insumo(nombre, 'bebida', 0, 'lt');
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

//module.exports = CreaInsumoBarraFria;
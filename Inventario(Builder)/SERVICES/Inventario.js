class Inventario {
    constructor() {
        this.insumos = [];
    }

    agregarInsumo(insumo) {
        this.insumos.push(insumo);
    }

    obtenerInsumos() {
        return this.insumos;
    }

    buscarInsumoPorNombre(nombre) {
        return this.insumos.find(insumo => insumo.nombre === nombre);
    }
}

//module.exports = Inventario;
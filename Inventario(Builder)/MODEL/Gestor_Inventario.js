const ConstructorInventario = require('../SERVICES/ConstructorInventario');
const CreaInsumoComida = require('../SERVICES/CreaInsumoComida');
const CreaInsumoBarraFria = require('../SERVICES/CreaInsumoBarraFria');

class GestorInventario {
    constructor() {
        this.constructorInventario = new ConstructorInventario();
        this.creadorComida = new CreaInsumoComida();
        this.creadorBebida = new CreaInsumoBarraFria();
        this.creadorAlimento = new CreaInsumoBarraFria();
        this.inventario = this.constructorInventario.construir();
    }

    agregarInsumoComida(nombre, cantidad) {
        this.creadorComida.setNombre(nombre);
        this.creadorComida.setCantidad(cantidad);
        const insumo = this.creadorComida.getProducto();
        this.inventario.agregarInsumo(insumo);
        return insumo;
    }

    agregarInsumoBebida(nombre, cantidad) {
        this.creadorBebida.setNombre(nombre);
        this.creadorBebida.setCantidad(cantidad);
        const insumo = this.creadorBebida.getProducto();
        this.inventario.agregarInsumo(insumo);
        return insumo;
    }

    agregarInsumoAlimento(nombre, cantidad) {
        this.creadorAlimento.setNombre(nombre);
        this.creadorAlimento.setCantidad(cantidad);
        const insumo = this.creadorAlimento.getProducto();
        this.inventario.agregarInsumo(insumo);
        return insumo;
    }

    obtenerInventario() {
        return this.inventario.obtenerInsumos();
    }
}

module.exports = GestorInventario;
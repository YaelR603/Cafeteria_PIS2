const GestorInventario = require('../MODEL/Gestor_Inventario');

class ControladorInventario {
    constructor() {
        this.gestor = new GestorInventario();
    }

    agregarInsumoComida(nombre, cantidad) {
        return this.gestor.agregarInsumoComida(nombre, cantidad);
    }

    agregarInsumoBebida(nombre, cantidad) {
        return this.gestor.agregarInsumoBebida(nombre, cantidad);
    }

    obtenerInventario() {
        return this.gestor.obtenerInventario();
    }
}

module.exports = ControladorInventario;
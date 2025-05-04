class Platillo {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    actualizarCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad;
    }

    obtenerSubtotal() {
        return this.precio * this.cantidad;
    }
}

module.exports = Platillo;
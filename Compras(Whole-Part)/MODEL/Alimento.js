class Alimento {
    constructor(id, nombre, precio, cantidad, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.categoria = categoria; // 'fruta', 'verdura', 'carne', etc.
    }

    actualizarCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad;
    }

    obtenerSubtotal() {
        return this.precio * this.cantidad;
    }
}

module.exports = Alimento;
class MetodoPago {
    constructor() {
        if (this.constructor === MetodoPago) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
    }

    async procesarPago(monto) {
        throw new Error("Método 'procesarPago' debe ser implementado");
    }

    obtenerDetalles() {
        throw new Error("Método 'obtenerDetalles' debe ser implementado");
    }
}

module.exports = MetodoPago;
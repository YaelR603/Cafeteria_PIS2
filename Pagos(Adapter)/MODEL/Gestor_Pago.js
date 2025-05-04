const Pago = require('./Pago');

class GestorPago {
    constructor() {
        this.metodosDisponibles = {
            tarjeta: (config) => new (require('./Tarjeta'))(...config),
            efectivo_qr: (config) => new (require('./EfectivoAdaptador'))(config.codigoQR),
            paypal: (config) => new (require('./PaypalAdaptador'))(config.email)
        };
    }

    crearMetodoPago(tipo, config) {
        if (!this.metodosDisponibles[tipo]) {
            throw new Error(`Método de pago ${tipo} no soportado`);
        }
        return this.metodosDisponibles[tipo](config);
    }

    async procesarPago(monto, metodoPago) {
        const pago = new Pago(monto, metodoPago);
        await pago.realizarPago();
        return pago.obtenerEstado();
    }
}

module.exports = GestorPago;
const MetodoPago = require('./MetodoPago');
const Paypal = require('./Paypal');

class PaypalAdaptador extends MetodoPago {
    constructor(email) {
        super();
        this.paypal = new Paypal(email);
    }

    async procesarPago(monto) {
        const resultado = await this.paypal.hacerPago(monto);
        return {
            exito: resultado.estado === 'completado',
            codigoTransaccion: resultado.id,
            monto: resultado.cantidad
        };
    }

    obtenerDetalles() {
        return {
            tipo: 'paypal',
            email: this.paypal.email
        };
    }
}

module.exports = PaypalAdaptador;
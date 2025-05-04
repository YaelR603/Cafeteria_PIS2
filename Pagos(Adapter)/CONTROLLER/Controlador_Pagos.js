const GestorPago = require('../MODEL/Gestor_Pago');

class ControladorPagos {
    constructor() {
        this.gestor = new GestorPago();
    }

    async realizarPago(monto, tipoMetodo, configMetodo) {
        try {
            const metodo = this.gestor.crearMetodoPago(tipoMetodo, configMetodo);
            const resultado = await this.gestor.procesarPago(monto, metodo);
            return { exito: true, datos: resultado };
        } catch (error) {
            return { 
                exito: false, 
                error: error.message,
                tipo: tipoMetodo
            };
        }
    }

    listarMetodosDisponibles() {
        return {
            tarjeta: { requiere: ['numeroTarjeta', 'nombreTitular', 'fechaVencimiento', 'cvv'] },
            efectivo_qr: { requiere: ['codigoQR'] },
            paypal: { requiere: ['email'] }
        };
    }
}

module.exports = ControladorPagos;
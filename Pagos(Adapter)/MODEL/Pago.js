const ComprobantePago = require('./ComprobantePago');

class Pago {
    constructor(monto, metodoPago) {
        this.monto = monto;
        this.metodoPago = metodoPago;
        this.estado = 'pendiente';
        this.fecha = null;
        this.comprobante = null;
    }

    async realizarPago() {
        try {
            const resultado = await this.metodoPago.procesarPago(this.monto);
            this.estado = 'completado';
            this.fecha = new Date();
            this.comprobante = new ComprobantePago(this);
            return true;
        } catch (error) {
            this.estado = 'fallido';
            throw error;
        }
    }

    obtenerEstado() {
        return {
            estado: this.estado,
            fecha: this.fecha,
            metodo: this.metodoPago.obtenerDetalles(),
            comprobante: this.comprobante ? this.comprobante.generar() : null
        };
    }
}

module.exports = Pago;
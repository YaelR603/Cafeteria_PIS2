class Pago {
    constructor(monto, metodoPago, estado = 'pendiente') {
        this.monto = monto;
        this.metodoPago = metodoPago; // 'efectivo', 'tarjeta', 'transferencia'
        this.estado = estado; // 'pendiente', 'completado', 'fallido'
        this.fechaPago = null;
    }

    procesarPago() {
        this.fechaPago = new Date();
        this.estado = 'completado';
        return true;
    }

    obtenerDetallePago() {
        return {
            monto: this.monto,
            metodo: this.metodoPago,
            estado: this.estado,
            fecha: this.fechaPago
        };
    }
}

module.exports = Pago;
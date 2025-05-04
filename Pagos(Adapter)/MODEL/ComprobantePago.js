class ComprobantePago {
    constructor(pago) {
        this.pago = pago;
        this.codigo = `COMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        this.fechaEmision = new Date();
    }

    generar() {
        return {
            codigo: this.codigo,
            fecha: this.fechaEmision,
            monto: this.pago.monto,
            metodo: this.pago.metodoPago.obtenerDetalles(),
            estado: this.pago.estado
        };
    }
}

module.exports = ComprobantePago;
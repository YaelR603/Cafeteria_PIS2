class ComprobanteCompra {
    constructor(compra) {
        this.compra = compra;
        this.fechaEmision = new Date();
        this.codigo = `COMP-${Math.floor(Math.random() * 1000000)}`;
    }

    generarContenido() {
        const estadoPago = this.compra.obtenerEstadoPago();
        
        return {
            codigo: this.codigo,
            fecha: this.fechaEmision,
            items: this.compra.obtenerItems(),
            total: this.compra.obtenerTotal(),
            estadoCompra: this.compra.estado,
            pago: estadoPago ? {
                metodo: estadoPago.metodo.tipo,
                estado: estadoPago.estado,
                comprobantePago: estadoPago.comprobante?.codigo
            } : null,
            detallesPago: estadoPago
        };
    }
}

module.exports = ComprobanteCompra;
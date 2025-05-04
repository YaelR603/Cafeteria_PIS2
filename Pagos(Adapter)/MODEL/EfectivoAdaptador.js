const MetodoPago = require('./MetodoPago');
const EfectivoQR = require('./EfectivoQR');

class EfectivoAdaptador extends MetodoPago {
    constructor(codigoQR) {
        super();
        this.efectivoQR = new EfectivoQR(codigoQR);
        this.detallesTransaccion = null;
    }

    async procesarPago(monto) {
        this.detallesTransaccion = await this.efectivoQR.generarCobro(monto);
        const resultado = await this.efectivoQR.verificarPago();
        
        if (!resultado.exito) {
            throw new Error("Pago QR no confirmado");
        }
        
        return {
            exito: true,
            codigoTransaccion: this.detallesTransaccion.codigoTransaccion,
            fechaConfirmacion: resultado.fechaConfirmacion
        };
    }

    obtenerDetalles() {
        return {
            tipo: 'efectivo_qr',
            codigoQR: this.efectivoQR.codigoQR,
            estado: this.detallesTransaccion?.estado || 'no_iniciado'
        };
    }
}

module.exports = EfectivoAdaptador;
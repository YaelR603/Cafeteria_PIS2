const Compra = require('./Compra');
const Historial_Compra = require('./Historial_Compra');
const { GestorPago } = require('../../Pagos(Adapter)/MODEL/Gestor_Pago');

class GestorCompra {
    constructor() {
        this.historial = new Historial_Compra();
        this.gestorPago = new GestorPago();
    }

    crearCompra(usuarioId) {
        return new Compra(usuarioId);
    }

    async finalizarCompra(compra, tipoMetodoPago, configMetodoPago) {
        try {
            // Crear el método de pago usando el gestor de pagos
            const metodoPago = this.gestorPago.crearMetodoPago(tipoMetodoPago, configMetodoPago);
            
            // Establecer el método de pago en la compra
            compra.establecerMetodoPago(metodoPago);
            
            // Procesar la compra (que a su vez procesará el pago)
            const comprobante = await compra.procesarCompra();
            
            // Registrar en el historial
            this.historial.registrarCompra(compra);
            
            return {
                exito: true,
                comprobante,
                estadoPago: compra.obtenerEstadoPago()
            };
        } catch (error) {
            return {
                exito: false,
                error: error.message,
                estadoCompra: compra.estado,
                estadoPago: compra.obtenerEstadoPago()
            };
        }
    }

    obtenerHistorial(usuarioId) {
        return this.historial.obtenerComprasPorUsuario(usuarioId);
    }
}

module.exports = GestorCompra;
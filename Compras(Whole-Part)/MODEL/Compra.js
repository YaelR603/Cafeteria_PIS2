//const Pago = require('./Pago');
const { Pago } = require('../../Pagos(Adapter)/MODEL/Pago');
const ComprobanteCompra = require('./ComprobanteCompra');

class Compra {
    constructor(usuarioId) {
        this.usuarioId = usuarioId;
        this.fecha = new Date();
        this.items = [];
        this.pago = null; // Ahora será una instancia de la clase Pago de /Pagos
        this.comprobante = null;
        this.estado = 'en_proceso';
    }

    agregarItem(item) {
        this.items.push(item);
    }

    eliminarItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + item.obtenerSubtotal(), 0);
    }

    establecerMetodoPago(metodoPago) {
        // metodoPago debe ser una instancia de una clase que herede de MetodoPago
        const total = this.calcularTotal();
        this.pago = new Pago(total, metodoPago);
    }

    async procesarCompra() {
        if (!this.pago) throw new Error('Método de pago no definido');
        
        try {
            await this.pago.realizarPago();
            this.estado = 'completada';
            this.comprobante = new ComprobanteCompra(this);
            return this.comprobante.generarContenido();
        } catch (error) {
            this.estado = 'fallida';
            throw error;
        }
    }

    obtenerItems() {
        return this.items.map(item => ({
            id: item.id,
            nombre: item.nombre,
            cantidad: item.cantidad,
            subtotal: item.obtenerSubtotal()
        }));
    }

    obtenerTotal() {
        return this.calcularTotal();
    }

    obtenerEstadoPago() {
        return this.pago ? this.pago.obtenerEstado() : null;
    }
}

module.exports = Compra;
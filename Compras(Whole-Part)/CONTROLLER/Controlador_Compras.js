const GestorCompra = require('../MODEL/Gestor_Compra');
const Alimento = require('../MODEL/Alimento');
const Platillo = require('../MODEL/Platillo');

class ControladorCompras {
    constructor() {
        this.gestor = new GestorCompra();
    }

    iniciarCompra(usuarioId) {
        this.compraActual = this.gestor.crearCompra(usuarioId);
        return { mensaje: 'Compra iniciada', usuarioId };
    }

    agregarAlimento(usuarioId, alimentoData) {
        if (!this.compraActual) throw new Error('No hay compra en curso');
        
        const alimento = new Alimento(
            alimentoData.id,
            alimentoData.nombre,
            alimentoData.precio,
            alimentoData.cantidad,
            alimentoData.categoria
        );
        
        this.compraActual.agregarItem(alimento);
        return { mensaje: 'Alimento agregado', total: this.compraActual.calcularTotal() };
    }

    agregarPlatillo(usuarioId, platilloData) {
        if (!this.compraActual) throw new Error('No hay compra en curso');
        
        const platillo = new Platillo(
            platilloData.id,
            platilloData.nombre,
            platilloData.precio,
            platilloData.cantidad
        );
        
        this.compraActual.agregarItem(platillo);
        return { mensaje: 'Platillo agregado', total: this.compraActual.calcularTotal() };
    }

    async finalizarCompra(usuarioId, tipoMetodoPago, configMetodoPago) {
        if (!this.compraActual) throw new Error('No hay compra en curso');
        
        const resultado = await this.gestor.finalizarCompra(
            this.compraActual,
            tipoMetodoPago,
            configMetodoPago
        );
        
        this.compraActual = null;
        
        if (!resultado.exito) throw new Error(resultado.error);
        return resultado;
    }

    obtenerHistorial(usuarioId) {
        return this.gestor.obtenerHistorial(usuarioId);
    }

    listarMetodosPagoDisponibles() {
        return {
            tarjeta: { requiere: ['numeroTarjeta', 'nombreTitular', 'fechaVencimiento', 'cvv'] },
            efectivo_qr: { requiere: ['codigoQR'] },
            paypal: { requiere: ['email'] }
        };
    }
}

module.exports = ControladorCompras;
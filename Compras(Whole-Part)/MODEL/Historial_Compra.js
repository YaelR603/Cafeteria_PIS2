class Historial_Compra {
    constructor() {
        this.compras = [];
    }

    registrarCompra(compra) {
        this.compras.push(compra);
    }

    obtenerComprasPorUsuario(usuarioId) {
        return this.compras
            .filter(compra => compra.usuarioId === usuarioId)
            .map(compra => ({
                fecha: compra.fecha,
                total: compra.obtenerTotal(),
                estado: compra.estado,
                comprobante: compra.comprobante ? compra.comprobante.generarContenido() : null
            }));
    }
}

module.exports = Historial_Compra;
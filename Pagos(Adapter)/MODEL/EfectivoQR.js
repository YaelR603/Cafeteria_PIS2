class EfectivoQR {
    constructor(codigoQR) {
        this.codigoQR = codigoQR;
    }

    async generarCobro(monto) {
        console.log(`Generando cobro QR por $${monto}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { 
            qr: this.codigoQR, 
            monto, 
            estado: 'pendiente',
            codigoTransaccion: `QR-${Date.now()}`
        };
    }

    async verificarPago() {
        console.log("Verificando pago QR...");
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simular pago exitoso (80% probabilidad)
        if (Math.random() < 0.8) {
            return { exito: true, fechaConfirmacion: new Date() };
        }
        return { exito: false };
    }
}

module.exports = EfectivoQR;
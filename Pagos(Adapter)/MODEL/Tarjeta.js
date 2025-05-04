const MetodoPago = require('./MetodoPago');

class Tarjeta extends MetodoPago {
    constructor(numeroTarjeta, nombreTitular, fechaVencimiento, cvv) {
        super();
        this.numeroTarjeta = numeroTarjeta;
        this.nombreTitular = nombreTitular;
        this.fechaVencimiento = fechaVencimiento;
        this.cvv = cvv;
    }

    async procesarPago(monto) {
        // Simulación de pago con tarjeta
        console.log(`Procesando pago de $${monto} con tarjeta ${this.numeroTarjeta.slice(-4)}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular demora
        
        // Simular rechazo aleatorio (10% de probabilidad)
        if (Math.random() < 0.1) {
            throw new Error("Pago rechazado por el banco");
        }
        
        return { exito: true, codigoAutorizacion: `AUTH-${Date.now()}` };
    }

    obtenerDetalles() {
        return {
            tipo: 'tarjeta',
            ultimosDigitos: this.numeroTarjeta.slice(-4),
            titular: this.nombreTitular
        };
    }
}

module.exports = Tarjeta;
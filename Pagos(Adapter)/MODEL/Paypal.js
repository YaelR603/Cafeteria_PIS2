class Paypal {
    constructor(email) {
        this.email = email;
    }

    async hacerPago(cantidad) {
        console.log(`Iniciando pago PayPal de $${cantidad} a ${this.email}`);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simular fallo aleatorio (15% probabilidad)
        if (Math.random() < 0.15) {
            throw new Error("Fallo en la transacción PayPal");
        }
        
        return {
            id: `PAYPAL-${Date.now()}`,
            cantidad,
            destinatario: this.email,
            estado: 'completado'
        };
    }
}

module.exports = Paypal;
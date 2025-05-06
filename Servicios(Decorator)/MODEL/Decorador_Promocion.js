//const DecoradorServicios = require('./DecoradorServicios');

class Decorador_Promocion extends DecoradorServicios {
    constructor(servicioDecorado, descripcionPromo, descuento) {
        super(servicioDecorado);
        this.descripcionPromo = descripcionPromo;
        this.descuento = descuento;
    }

    obtenerDescripcion() {
        return `${super.obtenerDescripcion()} + Promoción: ${this.descripcionPromo}`;
    }

    calcularCosto() {
        return super.calcularCosto() * (1 - this.descuento);
    }
}

//module.exports = Decorador_Promocion;
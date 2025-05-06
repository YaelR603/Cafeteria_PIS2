//const IServicios = require('./IServicios');

// Clase base para todos los decoradores
class DecoradorServicios extends IServicios {
    constructor(servicioDecorado) {
        super();
        this.servicioDecorado = servicioDecorado;
    }

    obtenerDescripcion() {
        return this.servicioDecorado.obtenerDescripcion();
    }

    calcularCosto() {
        return this.servicioDecorado.calcularCosto();
    }
}

//module.exports = DecoradorServicios;
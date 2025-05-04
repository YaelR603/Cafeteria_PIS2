const DecoradorServicios = require('./DecoradorServicios');

class Decorador_Espacio extends DecoradorServicios {
    constructor(servicioDecorado) {
        super(servicioDecorado);
    }

    obtenerDescripcion() {
        return `${super.obtenerDescripcion()} + Espacio para evento`;
    }

    calcularCosto() {
        return super.calcularCosto() + 500;
    }
}

module.exports = Decorador_Espacio;
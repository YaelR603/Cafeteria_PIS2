//const DecoradorServicios = require('./DecoradorServicios');

class Decorador_Comida extends DecoradorServicios {
    constructor(servicioDecorado, menuComida) {
        super(servicioDecorado);
        this.menuComida = menuComida;
    }

    obtenerDescripcion() {
        return `${super.obtenerDescripcion()} + Comida (${this.menuComida})`;
    }

    /*
    calcularCosto() {
        return super.calcularCosto() + 700;
    }*/
    calcularCosto() {
        return super.calcularCosto() + this.menuComida.obtenerCostoBase();
    }
}

//module.exports = Decorador_Comida;
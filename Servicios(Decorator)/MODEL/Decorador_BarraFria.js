const DecoradorServicios = require('./DecoradorServicios');

class Decorador_BarraFria extends DecoradorServicios {
    constructor(servicioDecorado, menuBarraFria) {
        super(servicioDecorado);
        this.menuBarraFria = menuBarraFria;
    }

    obtenerDescripcion() {
        return `${super.obtenerDescripcion()} + Barra Fría (${this.menuBarraFria})`;
    }

    /*
    calcularCosto() {
        return super.calcularCosto() + 300;
    }*/
    calcularCosto() {
        return super.calcularCosto() + this.menuBarraFria.obtenerCostoBase();
    }
}

module.exports = Decorador_BarraFria;
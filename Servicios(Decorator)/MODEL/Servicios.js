const IServicios = require('./IServicios');

// Implementación concreta del servicio base
class Servicios extends IServicios {
    constructor() {
        super();
        this.descripcion = "Servicio base";
    }

    obtenerDescripcion() {
        return this.descripcion;
    }

    calcularCosto() {
        return 0; // Costo base
    }
}

module.exports = Servicios;
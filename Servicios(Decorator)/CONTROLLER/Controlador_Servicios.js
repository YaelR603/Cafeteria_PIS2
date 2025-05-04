const Servicios = require('../MODEL/Servicios');
const Decorador_Espacio = require('../MODEL/Decorador_Espacio');
const Decorador_BarraFria = require('../MODEL/Decorador_BarraFria');
const Decorador_Comida = require('../MODEL/Decorador_Comida');
const Decorador_Promocion = require('../MODEL/Decorador_Promocion');

class Controlador_Servicios {
    constructor() {
        this.servicioBase = new Servicios();
    }

    crearServicioBasico() {
        return this.servicioBase;
    }

    agregarEspacio(servicio) {
        return new Decorador_Espacio(servicio);
    }

    agregarBarraFria(servicio, menuBarraFria) {
        return new Decorador_BarraFria(servicio, menuBarraFria);
    }

    agregarComida(servicio, menuComida) {
        return new Decorador_Comida(servicio, menuComida);
    }

    agregarPromocion(servicio, descripcion, descuento) {
        return new Decorador_Promocion(servicio, descripcion, descuento);
    }
}

module.exports = Controlador_Servicios;
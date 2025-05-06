// Interfaz base para los servicios
class IServicios {
    obtenerDescripcion() {
        throw new Error("Método abstracto: debe ser implementado");
    }

    calcularCosto() {
        throw new Error("Método abstracto: debe ser implementado");
    }
}

//module.exports = IServicios;
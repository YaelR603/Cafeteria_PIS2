class Insumo {
    constructor(nombre, tipo, cantidad, unidadMedida) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.unidadMedida = unidadMedida;
    }

    toString() {
        return `${this.nombre} (${this.tipo}): ${this.cantidad} ${this.unidadMedida}`;
    }
}

//module.exports = Insumo;
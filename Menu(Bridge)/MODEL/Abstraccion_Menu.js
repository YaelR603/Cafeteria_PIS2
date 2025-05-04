class Abstraccion_Menu {
    constructor(implementador) {
        this.implementador = implementador;
    }

    crearMenu() {
        throw new Error("Método abstracto: debe ser implementado");
    }
}

module.exports = Abstraccion_Menu;
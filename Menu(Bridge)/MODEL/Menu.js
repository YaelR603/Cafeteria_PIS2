const Abstraccion_Menu = require('./Abstraccion_Menu');
const Implementador_Menu = require('./Implementador_Menu');

class Menu extends Abstraccion_Menu {
    constructor(implementador) {
        super(implementador);
    }

    crearMenu() {
        return this.implementador.creationMenu();
    }
}

module.exports = Menu;
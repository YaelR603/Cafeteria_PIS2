//const Menu = require('../MODEL/Menu');
//const MenuInventoryService = require('../SERVICES/MenuInventoryService');

class Controlador_Menu {
    constructor(controladorInventario) {
        this.menuInventoryService = new MenuInventoryService(controladorInventario);
    }

    crearMenuPlatillo(implementadorPlatillo) {
        const implementador = new implementadorPlatillo(this.menuInventoryService);
        const menu = new Menu(implementador);
        return menu.crearMenu();
    }

    crearMenuAlimento(implementadorAlimento) {
        const implementador = new implementadorAlimento(this.menuInventoryService);
        const menu = new Menu(implementador);
        return menu.crearMenu();
    }
}

//module.exports = Controlador_Menu;
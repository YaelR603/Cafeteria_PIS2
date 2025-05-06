class MenuInventoryService {
    constructor(controladorInventario) {
        this.inventario = controladorInventario;
    }

    verificarDisponibilidad(ingredientes) {
        const inventario = this.inventario.obtenerInventario();
        return ingredientes.every(ing => {
            const item = inventario.find(i => i.nombre === ing.nombre);
            return item && item.cantidad >= ing.cantidad;
        });
    }

    obtenerIngredientesDisponibles() {
        return this.inventario.obtenerInventario();
    }
}

//module.exports = MenuInventoryService;
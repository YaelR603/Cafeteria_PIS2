/*class IMenu_Platillo {
    creationMenu() {
        throw new Error("Método abstracto: debe ser implementado");
    }
}*/

class IMenu_Platillo {
    obtenerNombre() {
        throw new Error("Método abstracto: debe ser implementado");
    }
    
    obtenerCostoBase() {
        throw new Error("Método abstracto: debe ser implementado");
    }
}

module.exports = IMenu_Platillo;
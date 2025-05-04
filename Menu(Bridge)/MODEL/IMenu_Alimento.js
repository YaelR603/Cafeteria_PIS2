/*class IMenu_Alimento {
    creationMenu() {
        throw new Error("Método abstracto: debe ser implementado");
    }
}*/

class IMenu_Alimento {
    obtenerNombre() {
        throw new Error("Método abstracto: debe ser implementado");
    }
    
    obtenerCostoBase() {
        throw new Error("Método abstracto: debe ser implementado");
    }
}

module.exports = IMenu_Alimento;
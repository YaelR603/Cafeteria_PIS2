const Controlador_Inventario = require('../CONTROLLER/Controlador_Inventario');

class View_Inventario {
    constructor() {
        this.controlador = new Controlador_Inventario();
    }

    mostrarMenuPrincipal() {
        console.log("\n=== SISTEMA DE INVENTARIO ===");
        console.log("1. Agregar Insumo Comida");
        console.log("2. Agregar Insumo Bebida");
        console.log("3. Mostrar Inventario");
        console.log("4. Salir");
    }

    async iniciar() {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let opcion;
        do {
            this.mostrarMenuPrincipal();
            opcion = await new Promise(resolve => {
                readline.question("Seleccione una opción: ", resolve);
            });

            switch(opcion) {
                case '1':
                    await this.agregarInsumoComida(readline);
                    break;
                case '2':
                    await this.agregarInsumoBebida(readline);
                    break;
                case '3':
                    this.mostrarInventario();
                    break;
                case '4':
                    console.log("Saliendo del sistema de inventario...");
                    break;
                default:
                    console.log("Opción no válida");
            }
        } while(opcion !== '4');

        readline.close();
    }

    async agregarInsumoComida(readline) {
        const nombre = await new Promise(resolve => {
            readline.question("Nombre del insumo: ", resolve);
        });

        const cantidad = await new Promise(resolve => {
            readline.question("Cantidad (kg): ", resolve);
        });

        this.controlador.agregarInsumoComida(nombre, parseFloat(cantidad));
        console.log("Insumo agregado correctamente");
    }

    async agregarInsumoBebida(readline) {
        const nombre = await new Promise(resolve => {
            readline.question("Nombre de la bebida: ", resolve);
        });

        const cantidad = await new Promise(resolve => {
            readline.question("Cantidad (lt): ", resolve);
        });

        this.controlador.agregarInsumoBebida(nombre, parseFloat(cantidad));
        console.log("Bebida agregada correctamente");
    }

    mostrarInventario() {
        console.log("\n=== INVENTARIO ACTUAL ===");
        const inventario = this.controlador.obtenerInventario();
        
        if (inventario.length === 0) {
            console.log("El inventario está vacío");
            return;
        }

        inventario.forEach(item => {
            console.log(`- ${item.nombre}: ${item.cantidad} ${item.unidadMedida} (${item.tipo})`);
        });
    }
}

module.exports = View_Inventario;

// Para ejecutar directamente desde este archivo
if (require.main === module) {
    const view = new View_Inventario();
    view.iniciar();
}
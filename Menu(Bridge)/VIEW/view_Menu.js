const Controlador_Menu = require('../CONTROLLER/Controlador_Menu');
const Controlador_Inventario = require('../../Inventario(Builder)/CONTROLLER/Controlador_Inventario')

class View_Menu {
    constructor() {
        // Inicializar controladores
        this.controladorInventario = new Controlador_Inventario();
        this.controladorMenu = new Controlador_Menu(this.controladorInventario);
        
        // Configurar algunos insumos básicos
        this.configurarInventarioInicial();
    }

    // Agregar insumos al inventario
    configurarInventarioInicial() {
        this.controladorInventario.agregarInsumoComida('Pollo en salsa verde, arroz, sopa de pasta y frijoles', 10);
        this.controladorInventario.agregarInsumoComida('Picadillo, arroz, sopa de verduras y frijoles', 10);
        this.controladorInventario.agregarInsumoComida('Bistec en salsa de guajillo, arroz, consome y frijoles', 10);
        this.controladorInventario.agregarInsumoBebida('Refresco', 22);
        this.controladorInventario.agregarInsumoBebida('Jugo', 18);
        this.controladorInventario.agregarInsumoAlimento('Cheescake de queso con zarzamora', 35);
        this.controladorInventario.agregarInsumoAlimento('Hotdogs', 30);
    }

    mostrarMenuPrincipal() {
        console.log("\n=== SISTEMA DE MENÚS ===");
        console.log("1. Crear Menú Platillo");
        console.log("2. Crear Menú Alimento");
        console.log("3. Ver Inventario");
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
                    await this.crearMenuPlatillo();
                    break;
                case '2':
                    await this.crearMenuAlimento();
                    break;
                case '3':
                    this.mostrarInventario();
                    break;
                case '4':
                    console.log("Saliendo del sistema de menús...");
                    break;
                default:
                    console.log("Opción no válida");
            }
        } while(opcion !== '4');

        readline.close();
    }

    async crearMenuPlatillo() {
        console.log("\n=== CREAR MENÚ PLATILLO ===");
        
        // Implementación concreta de menú platillo
        class MenuPlatilloEjemplo extends require('../Model/IMenu_Platillo') {
            obtenerNombre() { return "Platillo del Chef"; }
            obtenerCostoBase() { return 650; }
        }

        const menu = this.controladorMenu.crearMenuPlatillo(MenuPlatilloEjemplo);
        console.log(`Menú creado: ${menu.obtenerNombre()} - Costo: $${menu.obtenerCostoBase()}`);
    }

    async crearMenuAlimento() {
        console.log("\n=== CREAR MENÚ ALIMENTO ===");
        
        // Implementación concreta de menú alimento
        class MenuAlimentoEjemplo extends require('../Model/IMenu_Alimento') {
            obtenerNombre() { return "Bebidas Premium"; }
            obtenerCostoBase() { return 400; }
        }

        const menu = this.controladorMenu.crearMenuAlimento(MenuAlimentoEjemplo);
        console.log(`Menú creado: ${menu.obtenerNombre()} - Costo: $${menu.obtenerCostoBase()}`);
    }

    mostrarInventario() {
        console.log("\n=== INVENTARIO ACTUAL ===");
        const inventario = this.controladorInventario.obtenerInventario();
        inventario.forEach(item => {
            console.log(`- ${item.nombre}: ${item.cantidad} ${item.unidadMedida}`);
        });
    }
}

module.exports = View_Menu;

// Para ejecutar directamente desde este archivo
if (require.main === module) {
    const view = new View_Menu();
    view.iniciar();
}
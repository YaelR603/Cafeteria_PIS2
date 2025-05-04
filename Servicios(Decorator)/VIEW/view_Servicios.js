const Controlador_Servicios = require('../CONTROLLER/Controlador_Servicios');
const View_Menu = require('../../Menu/View/View_Menu');
const View_Menu = require('../../Menu(Bridge)/VIEW/view_Menu')

class View_Servicios {
    constructor() {
        this.controladorServicios = new Controlador_Servicios();
        this.viewMenu = new View_Menu();
    }

    mostrarMenuPrincipal() {
        console.log("\n=== SISTEMA DE SERVICIOS ===");
        console.log("1. Crear Servicio Básico");
        console.log("2. Agregar Espacio a Servicio");
        console.log("3. Agregar Comida a Servicio");
        console.log("4. Agregar Barra Fría a Servicio");
        console.log("5. Agregar Promoción a Servicio");
        console.log("6. Mostrar Servicio Actual");
        console.log("7. Salir");
    }

    async iniciar() {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let servicioActual = null;
        let opcion;

        do {
            this.mostrarMenuPrincipal();
            opcion = await new Promise(resolve => {
                readline.question("Seleccione una opción: ", resolve);
            });

            switch(opcion) {
                case '1':
                    servicioActual = this.crearServicioBasico();
                    break;
                case '2':
                    servicioActual = this.agregarEspacio(servicioActual);
                    break;
                case '3':
                    servicioActual = await this.agregarComida(servicioActual);
                    break;
                case '4':
                    servicioActual = await this.agregarBarraFria(servicioActual);
                    break;
                case '5':
                    servicioActual = await this.agregarPromocion(servicioActual, readline);
                    break;
                case '6':
                    this.mostrarServicioActual(servicioActual);
                    break;
                case '7':
                    console.log("Saliendo del sistema de servicios...");
                    break;
                default:
                    console.log("Opción no válida");
            }
        } while(opcion !== '7');

        readline.close();
    }

    crearServicioBasico() {
        console.log("\nServicio básico creado");
        return this.controladorServicios.crearServicioBasico();
    }

    agregarEspacio(servicio) {
        if (!servicio) {
            console.log("Primero debe crear un servicio básico");
            return servicio;
        }
        console.log("\nEspacio agregado al servicio");
        return this.controladorServicios.agregarEspacio(servicio);
    }

    async agregarComida(servicio) {
        if (!servicio) {
            console.log("Primero debe crear un servicio básico");
            return servicio;
        }

        console.log("\n=== SELECCIONAR MENÚ COMIDA ===");
        // En una implementación real, aquí se listarían los menús disponibles
        // Por ahora usamos uno de ejemplo
        class MenuComidaEjemplo extends require('../../Menu/Model/IMenu_Platillo') {
            obtenerNombre() { return "Menú Ejecutivo"; }
            obtenerCostoBase() { return 550; }
        }

        return this.controladorServicios.agregarComida(servicio, new MenuComidaEjemplo());
    }

    async agregarBarraFria(servicio) {
        if (!servicio) {
            console.log("Primero debe crear un servicio básico");
            return servicio;
        }

        console.log("\n=== SELECCIONAR MENÚ BARRA FRÍA ===");
        // Menú de ejemplo
        class MenuBarraFriaEjemplo extends require('../../Menu/Model/IMenu_Alimento') {
            obtenerNombre() { return "Cocteles Clásicos"; }
            obtenerCostoBase() { return 350; }
        }

        return this.controladorServicios.agregarBarraFria(servicio, new MenuBarraFriaEjemplo());
    }

    async agregarPromocion(servicio, readline) {
        if (!servicio) {
            console.log("Primero debe crear un servicio básico");
            return servicio;
        }

        const descripcion = await new Promise(resolve => {
            readline.question("Descripción de la promoción: ", resolve);
        });

        const descuento = await new Promise(resolve => {
            readline.question("Porcentaje de descuento (ej. 0.1 para 10%): ", resolve);
        });

        return this.controladorServicios.agregarPromocion(
            servicio, 
            descripcion, 
            parseFloat(descuento)
        );
    }

    mostrarServicioActual(servicio) {
        if (!servicio) {
            console.log("\nNo hay servicio creado");
            return;
        }

        console.log("\n=== SERVICIO ACTUAL ===");
        console.log("Descripción:", servicio.obtenerDescripcion());
        console.log("Costo total: $", servicio.calcularCosto());
    }
}

module.exports = View_Servicios;

// Para ejecutar directamente desde este archivo
if (require.main === module) {
    const view = new View_Servicios();
    view.iniciar();
}
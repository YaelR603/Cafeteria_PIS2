// Importaciones (en un entorno real usaríamos módulos ES6 o CommonJS)
// const Controlador_Servicios = require('../Controller/Controlador_Servicios');

class ServiciosView {
    constructor(controlador) {
        this.controlador = controlador;
    }

    mostrarServicios() {
        // Crear servicios base y decorados
        const servicioBase = this.controlador.crearServicioBasico();
        
        const servicioConEspacio = this.controlador.agregarEspacio(servicioBase);
        
        const menuBarraFria = {
            nombre: "Básico",
            obtenerCostoBase: () => 300
        };
        const servicioConBarraFria = this.controlador.agregarBarraFria(servicioBase, menuBarraFria);
        
        const menuComida = {
            nombre: "Ejecutivo",
            obtenerCostoBase: () => 700
        };
        const servicioConComida = this.controlador.agregarComida(servicioBase, menuComida);
        
        const servicioCompleto = this.controlador.agregarEspacio(servicioBase);
        const servicioCompletoConBarra = this.controlador.agregarBarraFria(servicioCompleto, menuBarraFria);
        const servicioCompletoConComida = this.controlador.agregarComida(servicioCompletoConBarra, menuComida);
        const servicioConPromocion = this.controlador.agregarPromocion(
            servicioCompletoConComida, 
            "Descuento por apertura", 
            0.15
        );

        // Obtener información de los servicios
        const servicios = [
            { nombre: "Servicio Base", servicio: servicioBase },
            { nombre: "Servicio con Espacio", servicio: servicioConEspacio },
            { nombre: "Servicio con Barra Fría", servicio: servicioConBarraFria },
            { nombre: "Servicio con Comida", servicio: servicioConComida },
            { nombre: "Servicio Completo con Promoción", servicio: servicioConPromocion }
        ];

        // Mostrar en el HTML
        const container = document.getElementById('servicios-container');
        
        servicios.forEach(item => {
            const servicioDiv = document.createElement('div');
            servicioDiv.className = 'servicio';
            
            const nombre = document.createElement('h3');
            nombre.textContent = item.nombre;
            
            const descripcion = document.createElement('p');
            descripcion.textContent = `Descripción: ${item.servicio.obtenerDescripcion()}`;
            
            const costo = document.createElement('p');
            costo.textContent = `Costo: $${item.servicio.calcularCosto().toFixed(2)}`;
            
            servicioDiv.appendChild(nombre);
            servicioDiv.appendChild(descripcion);
            servicioDiv.appendChild(costo);
            
            container.appendChild(servicioDiv);
        });
    }
}

// Uso en la vista
document.addEventListener('DOMContentLoaded', () => {
    // En un entorno real, importaríamos el controlador adecuadamente
    const controlador = new Controlador_Servicios();
    const view = new ServiciosView(controlador);
    view.mostrarServicios();
});
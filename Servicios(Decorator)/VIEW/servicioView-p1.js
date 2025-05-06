console.log("ServiciosView.js cargado correctamente"); // Verifica que el archivo se carga

class ServiciosView {
    constructor(controlador) {
        /*
        this.controlador = controlador;
        this.menuViewPlatillos = new MenuView('platillos');
        this.menuViewAlimentos = new MenuView('alimentos');*/
        
        console.log("Creando instancia de ServiciosView");
        
        try {
            this.controlador = controlador;
            this.menuViewPlatillos = new MenuView('platillos');
            this.menuViewAlimentos = new MenuView('alimentos');
            console.log("Dependencias cargadas correctamente");
        } catch (error) {
            console.error("Error al cargar dependencias:", error);
        }

        this.serviciosData = [
            {
                id: 'espacios',
                title: 'Espacios',
                icon: '🏢',
                backContent: this.generateEspaciosBackContent(),
                showModal: true
            },
            {
                id: 'barra-fria',
                title: 'Barra Fría',
                icon: '🍹',
                backContent: '<div id="barra-fria-content"></div>'
            },
            {
                id: 'comida',
                title: 'Comida',
                icon: '🍽️',
                backContent: '<div id="comida-content"></div>'
            },
            {
                id: 'promociones',
                title: 'Promociones',
                icon: '🎁',
                backContent: this.generatePromocionesBackContent()
            }
        ];
    }

    generateEspaciosBackContent() {
        return '<p>Haz clic en el título para ver los espacios disponibles</p>';
    }

    generatePromocionesBackContent() {
        return `
            <div class="promocion-item">
                <h3>Viernes 2X1</h3>
                <p>Paga una comida y adquiere otra gratis.</p>
            </div>
            <div class="promocion-item">
                <h3>Combo Desayuno</h3>
                <p>Café + Panadería por solo $99 los martes y jueves.</p>
            </div>
            <div class="promocion-item">
                <h3>Happy Hour</h3>
                <p>20% de descuento en barra fría de 4:00 PM a 6:00 PM.</p>
            </div>
        `;
    }

    renderAsientosModal() {
        const modal = document.getElementById('modal-espacios');
        const asientosContainer = document.getElementById('asientos-container');
        const btnVolver = document.getElementById('btn-volver-espacios');

        // Generar los asientos
        asientosContainer.innerHTML = '';
        for (let i = 1; i <= 48; i++) {
            const asiento = document.createElement('div');
            asiento.className = 'asiento';
            asiento.textContent = i;
            asientosContainer.appendChild(asiento);
        }

        // Configurar eventos del modal
        btnVolver.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        return modal;
    }

    /*
    renderMenuPlatillos() {
        this.menuViewPlatillos.render();
        const menuHTML = document.getElementById('appPla').innerHTML;
        document.getElementById('comida-content').innerHTML = menuHTML;
    }

    renderMenuAlimentos() {
        //this.menuViewAlimentos.render();
        this.menuViewAlimentos.render();
        const menuHTML = document.getElementById('appAli').innerHTML;
        document.getElementById('barra-fria-content').innerHTML = menuHTML;
    }
        */

    renderMenuPlatillos() {
        try {
            const menu = this.menuViewPlatillos.menus.platillos;
            if (!menu) {
                this.menuViewPlatillos.crearMenus();
                menu = this.menuViewPlatillos.menus.platillos;
            }
            
            let html = `
                <div class="menu-container">
                    <h2>Menú de Platillos</h2>
                    ${menu.items.map(item => `
                        <div class="menu-item platillo">
                            ${item.nombre} ($${item.precio})
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('comida-content').innerHTML = html;
        } catch (error) {
            console.error("Error renderizando platillos:", error);
            document.getElementById('comida-content').innerHTML = 
                '<p>Error cargando el menú de platillos</p>';
        }
    }

    renderMenuAlimentos() {
        try {
            const menu = this.menuViewAlimentos.menus.alimentos;
            if (!menu) {
                this.menuViewAlimentos.crearMenus();
                menu = this.menuViewAlimentos.menus.alimentos;
            }
            
            let html = `
                <div class="menu-container">
                    <h2>Menú de Alimentos</h2>
                    ${menu.items.map(item => `
                        <div class="menu-item alimento">
                            ${item.nombre} ($${item.precio})
                        </div>
                    `).join('')}
                </div>
            `;
            
            document.getElementById('barra-fria-content').innerHTML = html;
        } catch (error) {
            console.error("Error renderizando alimentos:", error);
            document.getElementById('barra-fria-content').innerHTML = 
                '<p>Error cargando el menú de alimentos</p>';
        }
    }

    mostrarServicios() {
        const container = document.getElementById('servicios-container');
        
        this.serviciosData.forEach(servicio => {
            const card = document.createElement('div');
            card.className = 'servicio-card';
            card.id = `card-${servicio.id}`;
            
            // Front content
            const front = document.createElement('div');
            front.className = 'card-front';
            front.innerHTML = `
                <div class="servicio-icon">${servicio.icon}</div>
                <h2 class="servicio-title">${servicio.title}</h2>
            `;
            
            // Back content
            const back = document.createElement('div');
            back.className = 'card-back';
            back.innerHTML = servicio.backContent;
            
            card.appendChild(front);
            card.appendChild(back);
            
            // Event listeners
            if (servicio.showModal) {
                const modal = this.renderAsientosModal();
                front.addEventListener('click', () => {
                    modal.style.display = 'flex';
                });
            } else {
                card.addEventListener('click', () => {
                    card.classList.toggle('flipped');
                    // Renderizar los menús cuando se muestran
                    if (servicio.id === 'comida' && card.classList.contains('flipped')) {
                        this.renderMenuPlatillos();
                    } else if (servicio.id === 'barra-fria' && card.classList.contains('flipped')) {
                        this.renderMenuAlimentos();
                    }
                });
            }
            
            container.appendChild(card);
        });
    }
}

// Uso en la vista
/*
document.addEventListener('DOMContentLoaded', () => {
    const controlador = new Controlador_Servicios();
    const view = new ServiciosView(controlador);
    view.mostrarServicios();
});*/
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente cargado");
    try {
        const controlador = new Controlador_Servicios();
        const view = new ServiciosView(controlador);
        view.mostrarServicios();
    } catch (error) {
        console.error("Error al inicializar:", error);
    }
});
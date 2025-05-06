class ServiciosView {
    constructor(controlador) {
        this.controlador = controlador;
        this.menuViewAlimentos = new MenuView('alimentos');
        this.menuViewPlatillos = new MenuView('platillos');
        
        this.menuViewAlimentos.crearMenus();
        this.menuViewPlatillos.crearMenus();
        
        this.serviciosData = [
            {
                id: 'espacios',
                title: 'Espacios',
                icon: '🏢',
                backContent: this.generateEspaciosBackContent(),
                showModal: 'espacios'
            },
            {
                id: 'barra-fria',
                title: 'Barra Fría',
                icon: '🍹',
                backContent: '<p>Haz clic en el título para ver el menú de la barra fría</p>',
                showModal: 'barra-fria'
            },
            {
                id: 'comida',
                title: 'Comida',
                icon: '🍽️',
                backContent: '<p>Haz clic en el título para ver el menú de comidas</p>',
                showModal: 'comida'
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
                });
            }
            
            container.appendChild(card);
        });
    }
    */

    renderModal(modalId, contentId, title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = modalId;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-menu-content';
        modalContent.id = contentId;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn-volver';
        closeBtn.textContent = 'Volver';
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        modalContent.innerHTML = `<h2>${title}</h2>`;
        modalContent.appendChild(content);
        modalContent.appendChild(closeBtn);
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        return modal;
    }

    /*
    setupModals() {
        // Modal para espacios (ya existente)
        this.renderAsientosModal();
        
        // Modal para barra fría (alimentos)
        const barraFriaContent = document.createElement('div');
        barraFriaContent.innerHTML = this.menuViewAlimentos.renderMenuAlimentos();
        this.renderModal(
            'modal-barra-fria',
            'barra-fria-content',
            'Menú de Barra Fría',
            barraFriaContent
        );
        
        // Modal para comida (platillos)
        const comidaContent = document.createElement('div');
        comidaContent.innerHTML = this.menuViewPlatillos.renderMenuPlatillos();
        this.renderModal(
            'modal-comida',
            'comida-content',
            'Menú de Comidas',
            comidaContent
        );
    }
    */

        setupModals() {
        // Modal para espacios
        this.renderAsientosModal();
        
        // Modal para barra fría (alimentos)
        const barraFriaModal = document.createElement('div');
        barraFriaModal.className = 'modal';
        barraFriaModal.id = 'modal-barra-fria';
        barraFriaModal.innerHTML = `
            <div class="modal-menu-content">
                <h2>Menú de Barra Fría</h2>
                <div id="barra-fria-content"></div>
                <button class="btn-volver">Volver a Servicios</button>
            </div>
        `;
        document.body.appendChild(barraFriaModal);
        
        // Modal para comida (platillos)
        const comidaModal = document.createElement('div');
        comidaModal.className = 'modal';
        comidaModal.id = 'modal-comida';
        comidaModal.innerHTML = `
            <div class="modal-menu-content">
                <h2>Menú de Comidas</h2>
                <div id="comida-content"></div>
                <button class="btn-volver">Volver a Servicios</button>
            </div>
        `;
        document.body.appendChild(comidaModal);

        // Configurar eventos de cierre
        this.setupCloseButtons();
        
        // Renderizar los menús después de que los modales existen en el DOM
        setTimeout(() => {
            document.getElementById('barra-fria-content').innerHTML = 
                this.menuViewAlimentos.renderMenuAlimentos();
            document.getElementById('comida-content').innerHTML = 
                this.menuViewPlatillos.renderMenuPlatillos();
            
            // Configurar eventos de los botones volver
            document.querySelectorAll('.modal .btn-volver').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });
        }, 100);
    }

    
    setupCloseButtons() {
        // Configurar eventos para todos los botones "Volver"
        document.querySelectorAll('.modal .btn-volver').forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                modal.style.display = 'none';
            });
        });

        // También cerrar haciendo clic fuera del contenido
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    mostrarServicios() {
        this.setupModals();
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
                front.addEventListener('click', () => {
                    document.getElementById(`modal-${servicio.id}`).style.display = 'flex';
                });
            } else {
                card.addEventListener('click', () => {
                    card.classList.toggle('flipped');
                });
            }
            
            container.appendChild(card);
        });
    }
}

// Uso en la vista
document.addEventListener('DOMContentLoaded', () => {
    const controlador = new Controlador_Servicios();
    const view = new ServiciosView(controlador);
    view.mostrarServicios();
});
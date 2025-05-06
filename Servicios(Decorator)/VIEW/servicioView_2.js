class ServiciosView {
    constructor(controlador) {
        this.controlador = controlador;
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
                backContent: '<p>Selecciona un horario: <select><option>9:00 AM</option><option>11:00 AM</option><option>1:00 PM</option></select> <button>Confirmar</button></p><p>Variedad de bebidas refrescantes</p>'
            },
            {
                id: 'comida',
                title: 'Comida',
                icon: '🍽️',
                backContent: '<p>Menú del día:</p><ul><li>Ensalada César</li><li>Sopa del día</li><li>Pasta Alfredo</li><li>Postre: Flan</li></ul>'
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
}

// Uso en la vista
document.addEventListener('DOMContentLoaded', () => {
    const controlador = new Controlador_Servicios();
    const view = new ServiciosView(controlador);
    view.mostrarServicios();
});
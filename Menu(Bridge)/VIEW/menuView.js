class MenuView {
    constructor(menuType = 'productos') {
        this.controladorInventario = new ControladorInventario();
        //this.controladorInventario = ControladorInventario;
        this.controladorMenu = new Controlador_Menu(this.controladorInventario);
        this.cargarDatosIniciales();
        this.menus = {
            alimentos: null,
            platillos: null,
            productos: null
        };
        this.menuType = menuType;
    }

    cargarDatosIniciales() {
        // Agregar insumos al inventario
        this.controladorInventario.agregarInsumoComida('Pollo en salsa verde, arroz, sopa de pasta y frijoles', 10);
        this.controladorInventario.agregarInsumoComida('Picadillo, arroz, sopa de verduras y frijoles', 10);
        this.controladorInventario.agregarInsumoComida('Bistec en salsa de guajillo, arroz, consome y frijoles', 10);
        this.controladorInventario.agregarInsumoBebida('Refresco', 22);
        this.controladorInventario.agregarInsumoBebida('Jugo', 18);
        this.controladorInventario.agregarInsumoAlimento('Cheescake de queso con zarzamora', 35);
        this.controladorInventario.agregarInsumoAlimento('Hotdogs', 30);
    }

    crearMenus() {
        // Obtener todos los items del inventario
        const inventario = this.controladorInventario.obtenerInventario();

        // Verificar que hay inventario
        if (!inventario || inventario.length === 0) {
            console.error('No hay items en el inventario');
            return;
        }
        
        // Menú de Alimentos (snacks y bebidas)
        class ImplementadorAlimentos extends Implementador_Menu {
            creationMenu() {
                const alimentos = inventario.filter(item => 
                    //item.tipo === 'bebida' || item.tipo === 'alimentos'
                    item.tipo !== 'comida'
                );
                
                return {
                    tipo: 'alimentos',
                    items: alimentos.map(item => ({
                        nombre: item.nombre,
                        precio: item.cantidad, // Asumimos que cantidad = precio
                        //tipo: item.tipo
                        tipo: 'alimento'
                    }))
                };
            }
        }

        // Menú de Platillos (solo comidas)
        class ImplementadorPlatillos extends Implementador_Menu {
            creationMenu() {
                const platillos = inventario.filter(item => 
                    item.tipo === 'comida'
                );
                
                return {
                    tipo: 'platillos',
                    items: platillos.map(item => ({
                        nombre: item.nombre,
                        precio: item.cantidad,
                        tipo: 'platillo'
                    }))
                };
            }
        }

        // Menú de Productos (todo el inventario)
        class ImplementadorProductos extends Implementador_Menu {
            creationMenu() {
                return {
                    tipo: 'productos',
                    items: inventario.map(item => ({
                        nombre: item.nombre,
                        precio: item.cantidad,
                        tipo: item.tipo === 'comida' ? 'platillo' : 'alimento'
                    }))
                };
            }
        }

        this.menus.alimentos = this.controladorMenu.crearMenuAlimento(ImplementadorAlimentos);
        this.menus.platillos = this.controladorMenu.crearMenuPlatillo(ImplementadorPlatillos);
        this.menus.productos = this.controladorMenu.crearMenuAlimento(ImplementadorProductos);
    }

    render() {
        if (!this.menus.alimentos) {
            this.crearMenus();
        }

        const appPla = document.getElementById('appPla');
        const appAli = document.getElementById('appAli');
        const appPro = document.getElementById('appPro');
        let html = '';

        switch(this.menuType) {
            case 'alimentos':
                html = this.renderMenuAlimentos();
                appAli.innerHTML = html
                break;
            case 'platillos':
                html = this.renderMenuPlatillos();
                appPla.innerHTML = html
                break;
            case 'productos':
                html = this.renderMenuProductos();
                appPro.innerHTML = html
                break;
            default:
                html = this.renderMenuProductos();
                appPro.innerHTML = html
        }

        //app.innerHTML = html;
        this.addEventListeners();
    }


    renderMenuAlimentos() {
        const menu = this.menus.alimentos;
        return `
            <div class="menu-container">
                <!--<h1>Menú de Alimentos</h1>-->
                ${menu.items.map(item => `
                    <div class="menu-item ${item.tipo}">
                        ${item.nombre} ($${item.precio})
                    </div>
                `).join('')}
                <button class="comprar-btn" data-menu-type="alimentos">Comprar</button>
            </div>
        `;
    }

    renderMenuPlatillos() {
        const menu = this.menus.platillos;
        return `
            <div class="menu-container">
                <!--<h1>Menú de Platillos</h1>-->
                ${menu.items.map(item => `
                    <div class="menu-item ${item.tipo}">
                        ${item.nombre} ($${item.precio})
                    </div>
                `).join('')}
                <button class="comprar-btn" data-menu-type="platillos">Comprar</button>
            </div>
        `;
    }

    renderMenuProductos() {
        const menu = this.menus.productos;
        return `
            <div class="menu-container">
                <h1>Menú de Productos</h1>
                ${menu.items.map(item => `
                    <div class="menu-item ${item.tipo}">
                        <span class="item-type">${this.capitalize(item.tipo)}</span> ${item.nombre} ($${item.precio})
                        <button class="item-btn" data-item="${item.nombre}">Seleccionar</button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    addEventListeners() {
        // Botón Comprar
        const comprarBtn = document.querySelector('.comprar-btn');
        if (comprarBtn) {
            comprarBtn.addEventListener('click', () => {
                window.location.href = "../../Compras(Whole-Part)/VIEW/index.html";
            });
        }

        // Botones de items (solo en menú de productos)
        const itemBtns = document.querySelectorAll('.item-btn');
        itemBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-item');
                console.log(`Producto seleccionado: ${itemName}`);
                // Aquí puedes añadir más funcionalidad si es necesario
            });
        });
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Uso en diferentes páginas:
// Para mostrar solo el menú de alimentos:
// const menuView = new MenuView('alimentos');
// menuView.render();

// Para mostrar solo el menú de platillos:
// const menuView = new MenuView('platillos');
// menuView.render();

// Para mostrar todos los productos:
// const menuView = new MenuView('productos');
// menuView.render();
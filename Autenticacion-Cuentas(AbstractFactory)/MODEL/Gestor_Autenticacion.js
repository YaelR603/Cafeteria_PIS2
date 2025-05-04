const FabricaConcretaCuentaUsu = require('../SERVICES/FabricaConcretaCuentaUsu');
const FabricaConcretaCuentaAdm = require('../SERVICES/FabricaConcretaCuentaAdm');

class GestorAutenticacion {
  constructor() {
    this.fabricaUsuario = new FabricaConcretaCuentaUsu();
    this.fabricaAdmin = new FabricaConcretaCuentaAdm();
  }

  async crearCuenta(tipo, nombre, email, password) {
    let cuenta;
    
    if (tipo === 'usuario') {
      cuenta = this.fabricaUsuario.crearCuenta(nombre, email, password);
    } else if (tipo === 'administrador') {
      cuenta = this.fabricaAdmin.crearCuenta(nombre, email, password);
    } else {
      throw new Error('Tipo de cuenta no válido');
    }

    await cuenta.guardarEnBD();
    return cuenta;
  }

  async autenticar(tipo, email, password) {
    let cuenta;
    
    if (tipo === 'usuario') {
      cuenta = this.fabricaUsuario.crearCuenta('', email, password);
    } else if (tipo === 'administrador') {
      cuenta = this.fabricaAdmin.crearCuenta('', email, password);
    } else {
      throw new Error('Tipo de cuenta no válido');
    }

    return await cuenta.autenticar();
  }
}

module.exports = GestorAutenticacion;
const FabricaAbstractaCuenta = require('./FabricaAbstractaCuenta');
const CuentaUsuario = require('./CuentaUsuario');

class FabricaConcretaCuentaUsu extends FabricaAbstractaCuenta {
  crearCuenta(nombre, email, password) {
    return new CuentaUsuario(nombre, email, password);
  }
}

module.exports = FabricaConcretaCuentaUsu;
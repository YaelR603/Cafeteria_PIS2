const FabricaAbstractaCuenta = require('./FabricaAbstractaCuenta');
const CuentaAdministrador = require('./CuentaAdministrador');

class FabricaConcretaCuentaAdm extends FabricaAbstractaCuenta {
  crearCuenta(nombre, email, password) {
    return new CuentaAdministrador(nombre, email, password);
  }
}

module.exports = FabricaConcretaCuentaAdm;
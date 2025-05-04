class FabricaAbstractaCuenta {
  crearCuenta() {
    throw new Error('Método crearCuenta() debe ser implementado por fábricas concretas');
  }
}

module.exports = FabricaAbstractaCuenta;
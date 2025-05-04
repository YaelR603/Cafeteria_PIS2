class Cuenta {
    constructor(tipo, nombre, email, password) {
      this.tipo = tipo;
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.fechaCreacion = new Date();
    }
  
    autenticar() {
      throw new Error('Método autenticar() debe ser implementado por subclases');
    }
  
    guardarEnBD() {
      throw new Error('Método guardarEnBD() debe ser implementado por subclases');
    }
  }
  
  module.exports = Cuenta;
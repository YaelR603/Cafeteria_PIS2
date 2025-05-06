const Cuenta = require('./Cuenta');
const usuarios = require('./usuarioDB');

class CuentaUsuario extends Cuenta {
  constructor(nombre, email, password) {
    super('usuario', nombre, email, password);
    this.preferencias = {};
  }

  async autenticar() {
    const usuario = usuarios.find(u => u.email === this.email && u.password === this.password && u.tipo === 'usuario');
    return usuario !== undefined;
  }

  static obtenerPorEmail(email) {
    return usuarios.find(u => u.email === email);
  }

  static obtenerTodos() {
    return usuarios;
  }
}

module.exports = CuentaUsuario;
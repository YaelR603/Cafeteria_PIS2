const Cuenta = require('./Cuenta');
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  tipo: { type: String, default: 'usuario' },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  preferencias: { type: Object, default: {} }
});

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

class CuentaUsuario extends Cuenta {
  constructor(nombre, email, password) {
    super('usuario', nombre, email, password);
    this.preferencias = {};
  }

  async autenticar() {
    const usuario = await UsuarioModel.findOne({ email: this.email, password: this.password });
    return usuario !== null;
  }

  async guardarEnBD() {
    const nuevoUsuario = new UsuarioModel({
      nombre: this.nombre,
      email: this.email,
      password: this.password
    });
    return await nuevoUsuario.save();
  }

  setPreferencias(preferencias) {
    this.preferencias = preferencias;
  }
}

module.exports = CuentaUsuario;
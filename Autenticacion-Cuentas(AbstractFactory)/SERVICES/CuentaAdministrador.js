const Cuenta = require('./Cuenta');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  tipo: { type: String, default: 'administrador' },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  nivelAcceso: { type: Number, default: 1 }
});

const AdminModel = mongoose.model('Administrador', adminSchema);

class CuentaAdministrador extends Cuenta {
  constructor(nombre, email, password) {
    super('administrador', nombre, email, password);
    this.nivelAcceso = 1;
  }

  async autenticar() {
    const admin = await AdminModel.findOne({ email: this.email, password: this.password });
    return admin !== null;
  }

  async guardarEnBD() {
    const nuevoAdmin = new AdminModel({
      nombre: this.nombre,
      email: this.email,
      password: this.password
    });
    return await nuevoAdmin.save();
  }

  setNivelAcceso(nivel) {
    this.nivelAcceso = nivel;
  }
}

module.exports = CuentaAdministrador;
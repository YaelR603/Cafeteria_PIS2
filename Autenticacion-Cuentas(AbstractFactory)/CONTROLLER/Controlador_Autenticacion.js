const GestorAutenticacion = require('../MODEL/gestor_autenticacion');
const connectDB = require('../../config/database');

// Conectar a la base de datos al iniciar
connectDB();

const gestor = new GestorAutenticacion();

class ControladorAutenticacion {
  static async crearCuenta(tipo, nombre, email, password) {
    try {
      const cuenta = await gestor.crearCuenta(tipo, nombre, email, password);
      console.log(`Cuenta de ${tipo} creada exitosamente`);
      return cuenta;
    } catch (error) {
      console.error('Error al crear cuenta:', error.message);
      throw error;
    }
  }

  static async autenticar(tipo, email, password) {
    try {
      const autenticado = await gestor.autenticar(tipo, email, password);
      if (autenticado) {
        console.log(`Autenticación exitosa para ${email}`);
      } else {
        console.log('Credenciales incorrectas');
      }
      return autenticado;
    } catch (error) {
      console.error('Error al autenticar:', error.message);
      throw error;
    }
  }
}

module.exports = ControladorAutenticacion;
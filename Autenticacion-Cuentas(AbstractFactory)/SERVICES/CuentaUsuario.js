// model/CuentaUsuario.js
class CuentaUsuario {
  constructor(id, nombre, email, password, tipo = 'usuario') {
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.tipo = tipo;
  }

  // Base de datos local de usuarios
  static usuarios = [
      new CuentaUsuario(1, 'Admin', 'admin@example.com', 'admin123', 'administrador'),
      new CuentaUsuario(2, 'Usuario Normal', 'usuario@example.com', 'user123'),
      new CuentaUsuario(3, 'Gio Mendoza', 'giomendoz20@gmail.com', '080124')
  ];

  autenticar() {
      return CuentaUsuario.usuarios.some(
          user => user.email === this.email && user.password === this.password
      );
  }

  static obtenerPorEmail(email) {
      return CuentaUsuario.usuarios.find(user => user.email === email);
  }
}

module.exports = CuentaUsuario;
// API/controllers/AuthController.js
class AuthController {
  static async login(req, res) {
      try {
          const { tipo, email, password } = req.body;
          
          const usuario = await AuthModel.autenticar(tipo, email, password);
          
          if (!usuario) {
              return res.status(401).json({ 
                  success: false, 
                  message: 'Credenciales incorrectas' 
              });
          }
          
          // Crear sesión/token
          const token = jwt.sign(
              { id: usuario.id, tipo: usuario.tipo },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
          );
          
          // Determinar redirección basada en tipo de usuario
          let redirectPath = '';
          switch(usuario.tipo) {
              case 'administrador':
                  redirectPath = '/admin/dashboard';
                  break;
              case 'usuario':
                  redirectPath = '/user/dashboard';
                  break;
              default:
                  redirectPath = '/';
          }
          
          res.json({ 
              success: true,
              token,
              redirect: redirectPath,
              user: {
                  id: usuario.id,
                  nombre: usuario.nombre,
                  email: usuario.email,
                  tipo: usuario.tipo
              }
          });
          
      } catch (error) {
          res.status(500).json({ 
              success: false, 
              message: error.message 
          });
      }
  }
}
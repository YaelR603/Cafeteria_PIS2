// API/models/AuthModel.js
class AuthModel {
    constructor() {
        // Usuarios predefinidos
        this.predefinedUsers = [
            {
                id: '1',
                tipo: 'administrador',
                nombre: 'Admin Principal',
                email: 'admin@example.com',
                password: 'admin123', // En producción, usa siempre contraseñas hasheadas
                nivel_acceso: 3
            },
            {
                id: '2',
                tipo: 'usuario',
                nombre: 'Usuario Normal',
                email: 'giomendoz13@gmail.com',
                password: '123',
                preferencias: {}
            }
        ];
    }

    async autenticar(tipo, email, password) {
        try {
            // Buscar en usuarios predefinidos primero
            const usuarioPredefinido = this.predefinedUsers.find(
                user => user.email === email && user.tipo === tipo
            );
            
            if (usuarioPredefinido && usuarioPredefinido.password === password) {
                return usuarioPredefinido;
            }
            
            // Si no está en predefinidos, buscar en la base de datos
            const tabla = (tipo === 'administrador') ? 'administradores' : 'usuarios';
            const usuario = await this.db.query(
                `SELECT * FROM ${tabla} WHERE email = $1`, 
                [email]
            );
            
            if (usuario && await bcrypt.compare(password, usuario.password_hash)) {
                return usuario;
            }
            
            return false;
        } catch (error) {
            throw error;
        }
    }
}
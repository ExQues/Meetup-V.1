// Sistema de autenticação simples temporário
const ADMIN_EMAIL = 'admin@meetuptrae.com';
const ADMIN_PASSWORD = 'F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT';

export const simpleAuth = {
  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Simular delay de rede
      setTimeout(() => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const token = `simple-token-${Date.now()}`;
          const user = {
            id: 'admin-1',
            email: ADMIN_EMAIL,
            nome: 'Administrador',
            role: 'admin'
          };
          
          resolve({
            token,
            user,
            message: 'Login realizado com sucesso'
          });
        } else {
          reject(new Error('Email ou senha incorretos'));
        }
      }, 500); // Simular delay de 500ms
    });
  },
  
  logout() {
    localStorage.removeItem('admin_token');
  }
};
import express from 'express';
import { body, validationResult } from 'express-validator';
import { generateToken } from '../middleware/auth';

const router = express.Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT';

// Rota de login
router.post('/login', [
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória')
], async (req, res) => {
  try {
    // Validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: errors.array() 
      });
    }

    const { password } = req.body;

    // Verificar senha
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gerar token JWT
    const token = generateToken({ 
      role: 'admin',
      timestamp: Date.now()
    });

    res.json({ 
      message: 'Login realizado com sucesso',
      token,
      user: { role: 'admin' }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Erro ao processar login'
    });
  }
});

// Rota de logout (opcional, já que usamos JWT)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout realizado com sucesso' });
});

// Rota para verificar se o token é válido
router.get('/verify', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false, error: 'Token não fornecido' });
  }

  const { verifyToken } = await import('../middleware/auth.js');
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(403).json({ valid: false, error: 'Token inválido ou expirado' });
  }

  res.json({ valid: true, user: decoded });
});

export default router;

import express from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { submissionService } from '../services/supabase';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Rate limiter específico para formulário (máximo 3 envios por IP por hora)
const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // limite de 3 envios por IP
  message: {
    error: 'Muitas tentativas de envio',
    message: 'Você atingiu o limite de envios. Tente novamente mais tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rota para criar uma nova submissão (pública)
router.post('/submit', formSubmissionLimiter, [
  body('nome')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras e espaços'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email não pode ter mais de 100 caracteres'),
  body('telefone')
    .trim()
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^\d{10,11}$/)
    .withMessage('Telefone deve ter 10 ou 11 dígitos'),
  body('discord')
    .trim()
    .notEmpty()
    .withMessage('Discord é obrigatório')
    .matches(/^[a-zA-Z0-9_.#]+$/)
    .withMessage('Usuário Discord inválido (use apenas letras, números, _ e #)')
    .isLength({ min: 2, max: 50 })
    .withMessage('Discord deve ter entre 2 e 50 caracteres')
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

    const { nome, email, telefone, discord } = req.body;

    // Verificar se já existe submissão com este email
    const existingSubmission = await submissionService.findByEmail(email);
    if (existingSubmission) {
      return res.status(409).json({ 
        error: 'Este email já foi cadastrado',
        message: 'Você já enviou seu formulário anteriormente'
      });
    }

    // Criar nova submissão
    const submission = await submissionService.create({
      nome: nome.trim(),
      email: email.toLowerCase().trim(),
      telefone: telefone.replace(/\D/g, ''), // Remove caracteres não numéricos
      discord: discord.trim(),
      ip_address: req.ip,
      user_agent: req.get('User-Agent') || undefined
    });

    res.status(201).json({
      message: 'Formulário enviado com sucesso!',
      submission: {
        id: submission.id,
        nome: submission.nome,
        email: submission.email,
        createdAt: submission.created_at
      }
    });

  } catch (error: any) {
    console.error('Erro ao salvar submissão:', error);
    
    if (error.message.includes('Este email já foi cadastrado')) {
      return res.status(409).json({ 
        error: 'Este email já foi cadastrado',
        message: 'Você já enviou seu formulário anteriormente'
      });
    }
    
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Erro ao processar formulário'
    });
  }
});

// Rotas protegidas (requerem autenticação)

// Listar todas as submissões (admin)
router.get('/submissions', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    const result = await submissionService.findAll({ page, limit });

    res.json(result);

  } catch (error: any) {
    console.error('Erro ao buscar submissões:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Erro ao buscar submissões'
    });
  }
});

// Estatísticas (admin)
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await submissionService.getStats();
    res.json(stats);

  } catch (error: any) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Erro ao buscar estatísticas'
    });
  }
});

// Exportar dados (admin)
router.get('/export', authenticateToken, async (req, res) => {
  try {
    const result = await submissionService.findAll({ page: 1, limit: 10000 }); // Buscar todos os dados para exportação
    const submissions = result.submissions;

    const csvData = submissions.map(sub => ({
      Nome: sub.nome,
      Email: sub.email,
      Telefone: sub.telefone,
      Discord: sub.discord,
      'Data de Envio': new Date(sub.created_at).toLocaleString('pt-BR'),
      'Endereço IP': sub.ip_address || 'N/A',
      'User Agent': sub.user_agent || 'N/A'
    }));

    res.json({
      data: csvData,
      count: csvData.length,
      exportedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Erro ao exportar dados:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Erro ao exportar dados'
    });
  }
});

// Limpar todas as submissões (admin)
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    const result = await submissionService.deleteAll();
    
    res.json({
      message: 'Todas as submissões foram removidas',
      deletedCount: result.deletedCount
    });

  } catch (error: any) {
    console.error('Erro ao limpar submissões:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Erro ao limpar dados'
    });
  }
});

export default router;
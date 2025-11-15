import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    maxlength: [100, 'Email não pode ter mais de 100 caracteres']
  },
  telefone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    trim: true,
    match: [/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos'],
    maxlength: [11, 'Telefone não pode ter mais de 11 dígitos']
  },
  discord: {
    type: String,
    required: [true, 'Discord é obrigatório'],
    trim: true,
    maxlength: [50, 'Discord não pode ter mais de 50 caracteres']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: false
  },
  userAgent: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  collection: 'submissions'
});

// Índices para melhorar performance
submissionSchema.index({ email: 1 });
submissionSchema.index({ createdAt: -1 });

export const Submission = mongoose.model('Submission', submissionSchema);
// tests/auth.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn()
}));

jest.mock('../models/PasswordReset', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  destroy: jest.fn()
}));

const User = require('../models/User');

describe('Testes de Autenticação - Unitário', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Cadastro de usuário', () => {
    test('Deve cadastrar um usuário com sucesso', async () => {
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: 1,
        nome: 'João',
        sobrenome: 'Silva',
        email: 'joao@teste.com',
        tipo_usuario: 'prestador'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          nome: 'João',
          sobrenome: 'Silva',
          email: 'joao@teste.com',
          senha: '123456',
          tipo_usuario: 'prestador',
          whatsapp: '(11) 99999-9999'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    test('Não deve cadastrar com email duplicado', async () => {
      User.findOne.mockResolvedValue({ id: 1, email: 'joao@teste.com' });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          nome: 'João',
          sobrenome: 'Silva',
          email: 'joao@teste.com',
          senha: '123456',
          tipo_usuario: 'prestador',
          whatsapp: '(11) 99999-9999'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email já cadastrado');
    });

    test('Deve retornar erro se faltar campos obrigatórios', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          nome: 'João'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
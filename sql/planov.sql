CREATE DATABASE IF NOT EXISTS planov
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE planov;

-- =====================================================
-- TABELA DE USUÁRIOS
-- Prestadores e Empresas
-- =====================================================

CREATE TABLE usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,

    tipo_usuario VARCHAR(20) NOT NULL,
    -- prestador ou empresa

    endereco VARCHAR(255),

    cidade VARCHAR(100),
    estado VARCHAR(2),

    foto_perfil VARCHAR(255),

    -- CAMPOS DO PRESTADOR
    experiencia TEXT,
    disponibilidade BOOLEAN DEFAULT TRUE,
    whatsapp VARCHAR(20),

    -- CAMPOS DA EMPRESA
    nicho VARCHAR(100),
    cultivo VARCHAR(100),
    regiao VARCHAR(100),

    -- SOBRE
    sobre TEXT,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SERVIÇOS
-- Serviços oferecidos pelos prestadores
-- =====================================================

CREATE TABLE servicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT UNSIGNED NOT NULL,

    nome_servico VARCHAR(100) NOT NULL,

    categoria VARCHAR(50),
    -- serviço ou maquinário

    descricao TEXT,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);

-- =====================================================
-- AGENDA / AGENDAMENTOS
-- =====================================================

CREATE TABLE agenda (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    prestador_id INT UNSIGNED NOT NULL,

    empresa_id INT UNSIGNED NOT NULL,

    tipo_servico VARCHAR(100) NOT NULL,

    descricao TEXT,

    inicio DATETIME NOT NULL,
    fim DATETIME NOT NULL,

    status VARCHAR(30) DEFAULT 'agendado',
    -- agendado, concluido, cancelado

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (prestador_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE,

    FOREIGN KEY (empresa_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);

-- =====================================================
-- AVALIAÇÕES
-- =====================================================

CREATE TABLE avaliacoes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    avaliador_id INT UNSIGNED NOT NULL,

    avaliado_id INT UNSIGNED NOT NULL,

    nota INT NOT NULL,

    comentario TEXT,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (avaliador_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE,

    FOREIGN KEY (avaliado_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);

-- =====================================================
-- RECUPERAÇÃO DE SENHA
-- =====================================================

CREATE TABLE recuperacao_senha (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT UNSIGNED NOT NULL,

    token VARCHAR(255) NOT NULL,

    expiracao DATETIME NOT NULL,

    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE
);

-- =====================================================
-- ÍNDICES IMPORTANTES
-- =====================================================

CREATE INDEX idx_usuario_tipo
ON usuarios(tipo_usuario);

CREATE INDEX idx_usuario_cidade
ON usuarios(cidade);

CREATE INDEX idx_servicos_usuario
ON servicos(usuario_id);

CREATE INDEX idx_agenda_prestador
ON agenda(prestador_id);

CREATE INDEX idx_agenda_empresa
ON agenda(empresa_id);

CREATE INDEX idx_avaliacoes_avaliado
ON avaliacoes(avaliado_id);

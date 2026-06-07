
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
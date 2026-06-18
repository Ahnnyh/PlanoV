// Simulando a função de validação que está no frontend
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validarSenha(senha) {
  return senha.length >= 6;
}

describe('Testes de Validação do Frontend', () => {
  test('Email válido deve passar', () => {
    expect(validarEmail('joao@teste.com')).toBe(true);
    expect(validarEmail('maria.silva@email.com.br')).toBe(true);
    expect(validarEmail('usuario@dominio.com')).toBe(true);
  });

  test('Email inválido deve falhar', () => {
    expect(validarEmail('')).toBe(false);
    expect(validarEmail('joao')).toBe(false);
    expect(validarEmail('joao@')).toBe(false);
    expect(validarEmail('joao@teste')).toBe(false);
    expect(validarEmail('joao teste.com')).toBe(false);
  });

  test('Senha deve ter pelo menos 6 caracteres', () => {
    expect(validarSenha('123456')).toBe(true);
    expect(validarSenha('senha123')).toBe(true);
    expect(validarSenha('12345')).toBe(false);
    expect(validarSenha('')).toBe(false);
  });
});
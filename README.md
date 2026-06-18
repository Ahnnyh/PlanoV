# PlanoV

PlanoV é um aplicativo mobile que conecta empresas do agronegócio a prestadores de serviços agrícolas qualificados.  
A plataforma funciona como um diretório inteligente de profissionais do campo: prestadores divulgam seus serviços e empresas encontram exatamente o que precisam, podendo entrar em contato diretamente e agendar serviços de forma prática.

---

## Tecnologias utilizadas

### Frontend
- HTML5, CSS3, JavaScript (vanilla)
- [Capacitor](https://capacitorjs.com/) – para gerar aplicativo Android/iOS
- Google Fonts (Poppins)
- Tema claro/escuro com persistência em `localStorage`

### Backend
- Node.js + Express
- Sequelize (ORM) com MySQL
- JSON Web Token (JWT) para autenticação
- bcrypt para hash de senhas
- Recuperação de senha **simplificada** (sem dependência de envio de email – gera token e redireciona diretamente)

### Testes
- **Jest** + **Supertest** – testes unitários do backend
- **Playwright** – testes de interface (E2E)

---

## Funcionalidades

- Cadastro e login de usuários (prestadores, empresas)
- Gerenciamento de perfil com foto (upload em base64)
- Busca por empresas (para prestadores) e por prestadores (para empresas)
- Perfil público com avaliações (sistema de estrelas e comentários)
- Agendamento de serviços com calendário interativo
- Agenda de compromissos (visualização e gerenciamento)
- Recuperação de senha **simplificada** – o sistema gera um token e redireciona o usuário para a página de redefinição, sem necessidade de servidor SMTP
- Menu lateral adaptado ao tipo de usuário
- Temas claro/escuro
- Geração de APK via Capacitor

---

## Pré‑requisitos

- Node.js (v16 ou superior)
- MySQL (local ou remoto, ex: TiDB Cloud)
- Git

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/planov.git
cd planov
```

### 2. Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=planov
JWT_SECRET=uma_chave_muito_secreta
```

> **Nota:** A recuperação de senha não depende mais de serviço de email; portanto, as variáveis `EMAIL_*` são opcionais. Se desejar usar envio de email, configure-as conforme seu provedor SMTP.

Inicie o servidor:

```bash
npm start
```

O backend estará disponível em `http://localhost:3000`.

### 3. Frontend

Os arquivos HTML, CSS e JS estão na pasta `planov-mobile/www` (estrutura do Capacitor).  
Para desenvolvimento, utilize um servidor local:

```bash
cd planov-mobile/www
npx serve . -p 5500
```

Acesse `http://localhost:5500`.

### 4. Banco de dados

Crie o banco manualmente ou utilize o Sequelize com `sync({ alter: true })` (o que já cria as tabelas automaticamente).  
As principais tabelas são:

- `usuarios` – todos os usuários (prestadores, empresas)
- `servicos` – serviços/maquinários oferecidos
- `agenda` – agendamentos entre empresas e prestadores
- `avaliacoes` – avaliações e comentários
- `recuperacao_senha` – tokens para redefinição de senha

---

## Testes

O projeto possui dois conjuntos de testes:

### Unitários (Jest)
Testam funções isoladas do backend (validação de email, cadastro de usuário, etc.).

```bash
cd backend
npm test
```

---

## Estrutura de pastas (resumida)

```
planov/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/                 # Jest unit tests
│   ├── playwright-tests/      # Playwright E2E tests
│   └── server.js
├── planov-mobile/
│   └── www/                   # Frontend (HTML, CSS, JS, imagens)
└── README.md
```

---

## Comandos úteis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor backend |
| `npm test` | Roda os testes unitários (Jest) |
| `npx playwright test` | Roda os testes de interface (Playwright) |
| `npx cap open android` | Abre o projeto Android no Android Studio |
| `npx cap sync` | Sincroniza alterações do frontend com o Capacitor |

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request


---

**Desenvolvido com 💚 para o agronegócio.**
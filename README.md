# 🌾 PlanoV

PlanoV é um aplicativo mobile que conecta empresas do agronegócio a prestadores de serviços agrícolas qualificados.  
A plataforma funciona como um diretório inteligente de profissionais do campo: prestadores divulgam seus serviços e empresas encontram exatamente o que precisam, podendo entrar em contato diretamente.

---

## 📱 Tecnologias utilizadas

### Frontend
- HTML5, CSS3, JavaScript (vanilla)
- [Capacitor](https://capacitorjs.com/) – para gerar aplicativo Android/iOS
- Google Fonts (Poppins)

### Backend
- Node.js + Express
- Sequelize (ORM)
- MySQL
- JSON Web Token (JWT) para autenticação
- bcrypt para hash de senhas
- Nodemailer para envio de emails (recuperação de senha)

---

## Funcionalidades

- Cadastro e login de usuários (prestadores, empresas, produtores rurais)
- Gerenciamento de perfil com foto (upload em base64)
- Busca por empresas (para prestadores) e por prestadores (para empresas)
- Perfil público com avaliações (sistema de estrelas e comentários)
- Agendamento de serviços (empresa contrata prestador)
- Agenda de compromissos (calendário interativo)
- Recuperação de senha por email
- Menu lateral responsivo e adaptado ao tipo de usuário
- Geração de APK via Capacitor

---

## 📦 Pré‑requisitos

- Node.js (v14 ou superior)
- MySQL (local ou remoto)
- Git

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/planov.git
cd planov


2. Backend
bash
cd backend
npm install dotenv
npm install
Atualize o arquivo .env na pasta backend com o seguinte conteúdo:

env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=planov
JWT_SECRET=uma_chave_muito_secreta
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
Nota: Para o envio de emails funcionar, utilize uma senha de aplicativo do Gmail (ou configure outro servidor SMTP).

Execute as migrações (criação das tabelas):

bash
npm start
O servidor iniciará em http://localhost:3000.

3. Frontend
Os arquivos HTML, CSS e JS estão na raiz do projeto.
Para desenvolvimento, utilize um servidor local como o Live Server do VS Code ou o http-server:

bash
npx http-server . -p 5500
Acesse http://localhost:5500.

4. Banco de dados
Crie o banco manualmente (ou use o Sequelize sync({ alter: true }), que já cria as tabelas automaticamente).
O script SQL completo está disponível no arquivo database.sql (se você tiver).
As principais tabelas são:

usuarios – armazena todos os usuários (prestadores, empresas, produtores)

servicos – serviços/maquinários oferecidos por prestadores

agenda – agendamentos entre empresas e prestadores

avaliacoes – avaliações de usuários sobre empresas/prestadores

recuperacao_senha – tokens para redefinição de senha
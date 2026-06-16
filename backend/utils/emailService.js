const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const enviarEmail = async (to, subject, html) => {
  try {
    console.log(`📧 Enviando email para ${to}...`);
    const info = await transporter.sendMail({
      from: `"PlanoV" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`✅ Email enviado: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error('❌ Erro ao enviar email:', err);
    throw err; // repassa para o controller tratar
  }
};

const nodemailer = require('nodemailer');

// Verifica se as variáveis de ambiente estão definidas
if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('⚠️ Variáveis de email não configuradas!');
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true para 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Opção para evitar timeouts
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

module.exports = { enviarEmail };
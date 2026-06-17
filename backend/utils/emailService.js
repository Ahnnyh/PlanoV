const nodemailer = require('nodemailer');

if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Variáveis de email não configuradas!');
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // false para porta 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // 🔥 FORÇA IPv4 – resolve o ENETUNREACH
  family: 4,
  // Aumenta timeouts
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const enviarEmail = async (to, subject, html) => {
  try {
    console.log(`Enviando email para ${to}...`);
    const info = await transporter.sendMail({
      from: `"PlanoV" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`Email enviado: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    throw err;
  }
};

module.exports = { enviarEmail };
const { Resend } = require('resend');

if (!process.env.RESEND_API_KEY) {
  console.error('⚠️ RESEND_API_KEY não configurada!');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmail = async (to, subject, html) => {
  try {
    console.log(`Enviando email para ${to} via Resend...`);
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev', // domínio padrão – não precisa verificar!
      to,
      subject,
      html,
    });
    if (error) throw new Error(error.message);
    console.log(`Email enviado: ${data.id}`);
    return data;
  } catch (err) {
    console.error('Erro ao enviar email via Resend:', err);
    throw err;
  }
};

module.exports = { enviarEmail };
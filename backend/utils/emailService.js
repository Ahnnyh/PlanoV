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
  await transporter.sendMail({
    from: `"PlanoV" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = { enviarEmail };

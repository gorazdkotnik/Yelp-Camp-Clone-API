const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// Mailgun Transporter Config
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// Nodemailer Mailgun SMTP Config
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Exports
module.exports = {
  nodemailerMailgun,
  transporter
};
const { transporter } = require('./mailConfig');

const sendMail = (to, text) => {
  const options = {
    from: 'gorazdkotnik05@gmail.com',
    to,
    subject: 'Sending Email',
    text
  }

  transporter.sendMail(options, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log(`Email sent: + ${info.response}`);
  });
}

sendMail('gorazdkotnik11@gmail.com', 'Hello');







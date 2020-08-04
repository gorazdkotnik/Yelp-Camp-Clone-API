const { nodemailerMailgun } = require('./mailConfig');

const sendMail = (to, text) => {
  const options = {
    from: 'gorazdkotnik05@gmail.com',
    to,
    subject: 'Hey you, awesome!',
    text,
  }

  nodemailerMailgun.sendMail(options, (err, info) => {
    if (err) {
      return console.log(`Error: ${err}`);
    }

    console.log(`Response: ${info}`);
  });
}

sendMail('gorazdkotnik11@gmail.com', 'Hello');

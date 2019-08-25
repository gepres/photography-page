const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

let url = "smtps://birdingIca@gmail.com:Matthews23@smtp.gmail.com:465";
let transporter = nodemailer.createTransport(url);

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let remite = req.body['remite'];
    let asunto = req.body['asunto'];
    let destino = req.body['destino']; // lista de e-mails destino separados por ,
    let cuerpo = req.body['cuerpo'];

    let email = {
      from: `"${remite}"<remite@test.com>`,
      to: '"gepresdesign"<gepresdesign@gmail.com>',
      subject: asunto,
      text: cuerpo
    };

    transporter.sendMail(email, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Mensagem %s enviada: %s', info.messageId, info.response);
    });
  });
});
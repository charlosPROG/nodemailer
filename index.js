const nodemailer = require('nodemailer')

const user = 'user@dominio.com' //email
const pass = 'password' //senha

const remetent = nodemailer.createTransport({
   host: 'server.accessdomain.com', //servidor do email
   port: 465, //porta do email
   secure: true, //segurança
   auth: { user, pass } //autenticação
})

const sendEmail = {
   from: user, //remetente
   to: 'exemplo@dominio.com', //destinatário - para vários emails, separar por virgula
   bcc: 'exemplo@dominio.com', //com cópia oculta
   cc: 'exemplo@dominio.com', //com cópia
   subject: 'NoReply', //assunto
   html: '<h1>Man, é só teste. Fica tranquilo</h1>' //corpo do email em HTML, se for texto, uso text
}


remetent.sendMail(sendEmail, (err, info) => {
   if (err) {
      console.log(err) //exibe erro
   } else {
      console.log(info) //exibe email enviado
   }
})
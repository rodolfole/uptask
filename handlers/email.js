const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

// let transport = nodemailer.createTransport({
//     host: emailConfig.host,
//     port: emailConfig.port,
//     auth: {
//         user: emailConfig.user,
//         pass: emailConfig.pass
//     }
// });

// let mailOptions = {
//     from: 'UpTask <no-reply@uptask.com>', // sender address
//     to: 'correo@correo.com', // list of receivers
//     subject: 'pASSWORD rESET', // Subject line
//     text: 'HOLA', // plain text body
//     html: '<b>Hola</b>' // html body
// };

// transport.sendMail(mailOptions)

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}
exports.enviar = async(opciones) => {
        
        const html = generarHTML(opciones.archivo, opciones);
        const text = htmlToText.fromString(html);
        
        let info = await transport.sendMail({
            from: 'UpTask <no-reply@uptask.com>', // sender address
            to: opciones.usuario.email, // list of receivers
            subject: opciones.subject, // Subject line
            text, // plain text body
            html
        });

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

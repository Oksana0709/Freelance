const nodemailer = require('nodemailer');

const FROM_MAIL = 'rainbow_002@mail.ru';

const sendEmail = (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru', 
        port: 465, 
        secure: true, 
        auth: {
            user: FROM_MAIL, 
            pass: 'ZnjjZ0idaV1DfyyLwbnM', 
        },
    });

    
    const mailOptions = {
        from: FROM_MAIL,
        to,
        subject,
        html,
    };

  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Письмо успешно отправлено: ' + to);
        }
    });
};

module.exports = sendEmail;

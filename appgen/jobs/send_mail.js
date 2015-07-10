// Contrab to send emails and make call to the creator of app
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'userpass'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: '[Helath AppGenerator] Your .APK is ready!', // Subject line
    text: 'Hi there, Your .APK is available and you can download.', // plaintext body
    html: '<p>Hi there!</p><p>Your .APK is available and you can download.', // html body
    attachments:[{
            // file on disk as an attachment
            filename: 'APP.apk',
            path: './builds/to/apk.apk' // stream this file
      }
    ]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

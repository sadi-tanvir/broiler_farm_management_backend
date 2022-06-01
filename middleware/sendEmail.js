const nodemailer = require("nodemailer")
const sendEmail = (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'programmingcommunity100@gmail.com',
            pass: 'qrcecskabjyjssci'
        }
    });

    const mailOptions = {
        from: 'programmingcommunity100@gmail.com',
        to: email,
        subject: 'Sending Email using node js',
        html: `To activate your Twilio Account, please verify your email address. 
                <br/>
                Your account will not be created until your email address is confirmed.
                <br/>
                <br/>
                <br/>
                <a href="https://tanvirhossainsadi.herokuapp.com/activeAccount/${token}">Confirm Your Email</a>`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

};

module.exports = sendEmail
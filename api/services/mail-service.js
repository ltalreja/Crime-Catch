require('dotenv').load();
const nodemailer = require('nodemailer');
// const accountSid = `${process.env.DB_ACC_SID}`;
// const authToken = `${process.env.DB_SMS_AUTH_TOKEN}`;
// const adminPhnNo = `${process.env.DB_PHN_NO}`;
// const client = require('twilio')(accountSid, authToken);

let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

module.exports.sendMail = function (userInfo, reqBody, callback) {
    // create reusable transporter object using the default SMTP transport
    if (reqBody.message === undefined) {
        reqBody.message = "Help Me";
    }
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: `${process.env.DB_SOSMAIL}`, // generated ethereal user
            pass: `${process.env.DB_SOSPWD}` // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: `"Admin" ${process.env.DB_SOSMAIL}"`, // sender address
        to: `${userInfo.emergencyContact.email}`, // list of receivers
        subject: 'Help ✔', // Subject line
        text: '', // plain text body
        html: `<!DOCTYPE html>
               <html>
                <head>
                </head>
                <body>
                    <h1>${reqBody.message}</h1>
                    <h2>${userInfo.name.firstName} ${userInfo.name.lastName}is in Trouble</h2>
                    <h2>Current Location :</h2>
                    <h3>Lat : ${reqBody.Lat}</h3>
                    <h3>Long : ${reqBody.Long}</h3>
                    <a  href= "https://www.google.com/maps/search/?api=1&query=${reqBody.Lat},${reqBody.Long}"> Location Track</a>
                    <img src="http://maps.googleapis.com/maps/api/staticmap?center=${reqBody.Lat},${reqBody.Long}&size=800x600&key=${process.env.DB_API_KEY}"/>
                </body>
        </html>`
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throwError(error);
        } else {
            callback(info);
        }
    });

    //For sms purpose
    // client.messages
    //     .create({
    //         body: `${reqBody.message} ${userInfo.name.firstName} ${userInfo.name.lastName}is in Trouble
    //         Current Location : Lat : ${reqBody.Lat} Long : ${reqBody.Long}`,
    //         from: adminPhnNo,
    //         to: `${userInfo.emergencyContact.phoneNo}`
    //     })
    //     .then(message => console.log(message.sid))
    //     .done();
};


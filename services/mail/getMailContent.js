require('dotenv').config()

const SENDER_EMAIL = process.env.SENDER_EMAIL

function getMailContent(name, email, password) {

    const mailTemplate = {
        to: email, // Change to your recipient
        from: SENDER_EMAIL, // Change to your verified sender
        subject: 'The Book Store - Welcome Mail',
        html: 
        `<h4>Dear ${name},</h4>
        <br/>
        <h4>Congratulations and welcome to our team. Please use the below credentials to login in to our portal.</h4>
        <h5>Username: ${email}</h5>
        <h5>Password: ${password}</h5>
        <br/>
        <h5>Kindly reset your password after first login.</h5>
        <br/>
        <br/>
        <h5>Please contact us in case of any issue/concerns</h5>
        <br/>
        <br/>
        <h6>Regards,</h6>
        <h6>The Book Store<h6>`,
      }

    return mailTemplate

}

module.exports = getMailContent
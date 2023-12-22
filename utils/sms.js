const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendSms(phone_number, sub) {
    const message = await client.messages.create({
        body: sub,
        to: `+91${phone_number}`,
        from: process.env.TWILIO_PHONE_NUMBER,
    })
    return message;
}

module.exports = sendSms;
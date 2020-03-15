import rollbar from './rollbar';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNo = process.env.TWILIO_PHONE_NO;
const client = require('twilio')(accountSid, authToken);

export async function sendSMS({ body, to }) {
  try {
    const result = await client.messages.create({
      body,
      from: phoneNo,
      to,
    });
    if (process.env.NODE_ENV === 'development') console.log(result);
    return result;
  } catch (error) {
    rollbar.error('sendSMS: ' + error);
  }
}

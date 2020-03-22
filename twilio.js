import rollbar from './rollbar';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNo = process.env.TWILIO_PHONE_NO;
const client = require('twilio')(accountSid, authToken);

export async function sendSMS({ body, to, id, whatsApp }) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log({ body, to, id });
      return {};
    }
    if (to === '+4599999999') return {};

    // Set whatsApp prefix in case of whatsApp message
    to = (whatsApp) ? "whatsapp:" += to : to

    const result = await client.messages.create({
      body,
      from: phoneNo,
      to,
    });
    if (process.env.NODE_ENV === 'development') console.log(result);
    return result;
  } catch (error) {
    rollbar.error('sendSMS: ' + error.message.replace(to, '[scrubbed phone no]') + ` (user id: ${id})`);
    return false;
  }
}

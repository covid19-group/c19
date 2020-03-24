import rollbar from './rollbar';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNo = process.env.TWILIO_PHONE_NO;
const client = require('twilio')(accountSid, authToken);

export async function sendSMS({ body, to, id }) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log({ body, to, id });
      return {};
    }
    if (to === '+4599999999') return {};
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

export async function sendBulk({ body, numbers }) {
  try {
    const service = client.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);
    const bindings = numbers.map(number => {
      return JSON.stringify({ binding_type: 'sms', address: number });
    });
    await service.notifications.create({
      toBinding: bindings,
      body: body,
    });
  } catch (error) {
    rollbar.error('Send Bulk: ', error, { body, numbers });
    return false;
  }
}

import rollbar from './rollbar';

const authToken = process.env.SINCH_BEARER_TOKEN;
const phoneNo = process.env.SINCH_PHONE_NO;
const servicePlanId = process.env.SINCH_SERVICE_PLAN_ID;
const fetch = require('node-fetch');

export async function sendSMS({ body, to }) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log({ body, to });
      return {};
    }
    if (to === '+4599999999') return {};
    const result = await fetch('https://sms.api.sinch.com/xms/v1/' + servicePlanId + '/batches', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: phoneNo,
        to: [to.slice(1)], //don't include +
        body,
      }),
    });
    if (process.env.NODE_ENV === 'development') console.log(await result.json());
    return result;
  } catch (error) {
    rollbar.error('sinch sendSMS: ' + error);
    return false;
  }
}

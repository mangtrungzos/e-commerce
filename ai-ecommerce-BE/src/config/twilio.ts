import twilio from 'twilio';

export const client = twilio(process.env.TWILIO_ACC_SID, process.env.TWILIO_AUTH_TOKEN);

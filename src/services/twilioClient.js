// initialize twilio connection
// creates the Twilio client connection and provides functions to send whatsapp messages back to users

import twilio from 'twilio';
import { env } from '../config/env.js';

const accountSid = env.twilioAccountSID;
const authToken = env.twilioAuthToken;
const client = twilio(accountSid, authToken);
const twilioSandbox = `whatsapp:${env.twilioPhoneNumber}`; 
const personalPhone = `whatsapp:${env.personalPhoneNumber}`;

export async function sendWhatsAppMsg(to, body) {
    try {
        const message = await client.messages.create({
            from: twilioSandbox,
            to: to,
            body: body,
        })
    console.log("Message sent:", message.body);
    return message
    } catch (error) {
        console.error("Twilio error:", error.message);
        if (error.code) {
            console.error("Error code:", error.code)
        }
        throw error;
    }
}

export async function createMessage() {
    console.log('hi')
    const message = await client.messages.create({ // sends a POST req to Twilios /message API -> forward to whats
        contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
        contentVariables: JSON.stringify({
            1: "Jan 12 2026",
            2: "Hello!"
        }),
        from: `whatsapp:${twilioSandbox}`,
        to: `whatsapp:${personalPhone}`,
        body,
    });

    console.log(message.body);
}
// endpoints the "interface"
// receive msgs, send responses
// handler plugged into the server - decides what to do when I request hits here

import express from 'express';
import twilio from 'twilio';
const { twiml } = twilio;
const MessagingResponse = twiml.MessagingResponse; // destructured the specific TwiMl response type
import { sendWhatsAppMsg } from '../services/twilioClient.js';

// this handle POST to /whatsapp/webhook
const router = express.Router();
const check = "✅";

router.post('/webhook', async (req, res) => {
    const incomingMsg = req.body.Body;
    const from = req.body.From;

    console.log("Message from:", from);
    console.log("Message body:", incomingMsg);

    const twiml = new MessagingResponse();

    try {
        // reply to webhook
        twiml.message(`${check} Message received!`);
        await sendWhatsAppMsg(from, `You said: ${incomingMsg}`);
 
    } catch (error) {
        console.error("Webhook error:", error);
        twiml.message("Something went wrong. Try again.");
    }

    // sets the content-type of HTTP res to XML
    // send() declared that youre done with the req
    res.status(200)
        . type('text/xml')
        .send(twiml.toString());
});

export default router;
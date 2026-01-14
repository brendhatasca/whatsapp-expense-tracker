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

router.post('/webhook', async (req, res) => {
    const incomingMsg = req.body.Body;
    const from = req.body.From;

    console.log("Message from:", from);
    console.log("Message body:", incomingMsg);

    const twiml = new MessagingResponse();
    twiml.message('Message received!');

    await sendWhatsAppMsg(from, `You said: ${incomingMsg}`)

    res.type('text/xml').send(twiml.toString())
});

export default router;
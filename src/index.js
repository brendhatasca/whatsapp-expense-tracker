import 'dotenv/config';
import express from 'express';
import whatsappRoutes from './routes/whatsapp.js';
import bodyParser from 'body-parser';
import { env } from './config/env.js';
import twilio from 'twilio';

const PORT = env.port;
const app = express();

// .use() mounts the specficic middleware function ;; parsing is part of what a middleware does
// express.urlencoded parses incoming req with urlencoded payloads
app.use(express.urlencoded({ extended: false })) // properties tells the function to use simple parser

app.use('/whatsapp', whatsappRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
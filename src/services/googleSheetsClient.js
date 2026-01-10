import { format } from 'date-fns';
import { env } from '../config/env.js';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
// import creds from './config/client_secret.json';

export async function accessSpreadsheet() {
    const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets'
    ];

    // Create a JWT-authenticated service account client with scoped access to the Google Sheets API
    const serviceAccountAuth = new JWT({
        email: env.googleClientEmail,
        key: env.googlePrivateKey,
        scopes: SCOPES // explicitily declaring what this client is allowed to do (req permission to access the spreadsheets scope)
    });

    // when passing the second argument, we plug the authentication clent into the spreadhseet
    // library so every future req is automatically signed
    const doc = new GoogleSpreadsheet(env.googleSheetID, serviceAccountAuth);

    //fetch data
    await doc.loadInfo();
    console.log('✅ Connected to:', doc.title)

    // get first sheet
    const sheet = doc.sheetsByIndex[0];
    console.log('Sheet name:', sheet.title);
    
    return {
        doc,
        sheet
    }
}

async function appendRow() {
    const date = format(new Date(), 'MMM d yyyy')
    const month = format(new Date, 'MMMM')

    try {
        const { doc, sheet } = await accessSpreadsheet(); // load sheet + get first sheet
        // append row
        // await sheet.addRow({
        //     Date: date,
        //     Month: month,
        //     Amount: 120,
        //     Type: 'Expense',
        //     Category: 'Groceries',
        //     Description: 'FoodBasics'
        // });

        // console.log('✅ Added test transaction.')

        // read rows
        const rows = await sheet.getRows();
        console.log('Total rows:', rows.length);
        console.log('Last transaction:', rows[rows.length-1]._rawData)
        console.log(rows[0].get('Date'));
        console.log(rows[0].get('Category'));

        await rows[rows.length-1].delete();
        console.log('Last transaction deleted.')

    } catch (error) {
        console.error('❌ Error:', error.message)
    }
}


appendRow()
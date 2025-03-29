import { emailSender } from "../boundary/emailAccess";
import { dateToString, GetOpenTicketByTicketID, GetUserEmail } from "./databaseControl.js";


function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function NewTicketNotification(ticketID:number) {
    const subject = `New ticket ${ticketID}`
    const res = await GetOpenTicketByTicketID(ticketID)
    console.log(typeof res?.ticketEndTime)
    if (res === null) {
        console.error(`No existing ticket with ID: ${ticketID}`);
        return;
    } 
    const text =    `You have create a new ticket with ID: ${ticketID}.\n
                    The Carpark is 
                    The ticket ends on ${new Date(res.ticketEndTime)}.`
    const email = await GetUserEmail(res.userID)
    if (email === null) {
        console.error(`No existing email found for user ID: ${res.userID}`);
        return;
    } 
    console.log(email,subject,text)
    emailSender(email as string,subject,text);            
}
    
function ExpiryNotification() {}

function ExpiryChecker() {}
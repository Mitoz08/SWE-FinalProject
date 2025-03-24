import { emailSender } from "../boundary/emailAccess.js";
import { GetOpenTicketByTicketID, GetUserEmail } from "./databaseControl.js";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function NewTicketNotification(ticketID) {
    const subject = `New ticket ${ticketID}`;
    const res = await GetOpenTicketByTicketID(ticketID);
    if (res === null) {
        console.error(`No existing ticket with ID: ${ticketID}`);
        return;
    }
    const text = `You have create a new ticket with ID: ${ticketID}.\n
                    The Carpark is 
                    The ticket ends on ${res.ticketEndTime}.`;
    const email = await GetUserEmail(res.userID);
    if (email === null) {
        console.error(`No existing email found for user ID: ${res.userID}`);
        return;
    }
    emailSender(email, subject, text);
}
function ExpiryNotification() { }
function ExpiryChecker() { }

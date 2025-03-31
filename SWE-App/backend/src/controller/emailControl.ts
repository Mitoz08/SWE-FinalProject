import { emailSender } from "../boundary/emailAccess";
import { dateToString, GetCarparkAddress, GetOpenTicketByTicketID, GetUserEmail } from "./databaseControl.js";
import { getOpenTicketByTicketID } from "./serverControl";


export async function NewTicketNotification(ticketID:number) {
    const subject = `New ticket created with ID: ${ticketID}`
    const res = getOpenTicketByTicketID(ticketID)
    // console.log(typeof res?.ticketEndTime)
    if (res == null) {
        console.error(`No existing ticket with ID: ${ticketID}`);
        return false;
    } 
    const text =    
`Dear Customer,

    You have create a new ticket with ID: ${ticketID}.\n
    The Carpark is ${await GetCarparkAddress(res.parkingLotID)}
    The ticket ends on ${new Date(res.ticketEndTime)}.`
    const email = await GetUserEmail(res.userID)
    if (email == null) {
        console.error(`No existing email found for user ID: ${res.userID}`);
        return false;
    } 
    console.log(email,subject,text)
    return emailSender(email as string,subject,text);           
}
    
export async function ExpiryNotification(ticketID:number) {
    const subject = `Expiration alert for ticket ID: ${ticketID}`
    const res = getOpenTicketByTicketID(ticketID)
    if (res == null) {
        console.error(`No existing ticket with ID: ${ticketID}`);
        return false;
    } 
    const text =    
`Dear Customer,

    You have ticket that is expiring soon. Ticket ID: ${ticketID}.
    The Carpark is ${await GetCarparkAddress(res.parkingLotID)}
    The ticket ends on ${new Date(res.ticketEndTime)}.`
    const email = await GetUserEmail(res.userID)
    if (email == null) {
        console.error(`No existing email found for user ID: ${res.userID}`);
        return false;
    } 
    console.log(email,subject,text)
    return emailSender(email as string,subject,text); 
}


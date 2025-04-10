import { serverEntity } from "../entity/serverEntity";
import { OpenTicket } from "../entity/databaseTypes";
import dataBaseControl from "./databaseControl";
import { ExpiryNotification } from "./emailControl";
import { CONNREFUSED } from "dns";

var interval: NodeJS.Timeout;

const TIMEZONE_OFFSET = 8 * 60 * 60 * 1000;
const CHECK_INTERVAL = 0.25 * 60 * 1000;
// const EXPIRY_THRESHOLD = 15 * 60 * 1000;
const EXPIRY_THRESHOLD = 60 * 60 * 1000 + TIMEZONE_OFFSET; // Set to 60 Minutes for testing purposes 


export default function expiryInitialiser() {
    clockStart()
}

// Function to run the function continuously the function

function clockStart() {
    interval = setInterval(expiryNotificationSender,CHECK_INTERVAL)
}


function expiryTerminate() {
    clearInterval(interval)
}

// Function to check and send notification
async function expiryNotificationSender() {
    const tickets = serverEntity.getTicket()
    // console.log("Checking expiry")
    for( const ticket of tickets) {
        // console.log(ticket.ticketEndTime.getTime() - new Date().getTime() > EXPIRY_THRESHOLD)
        // console.log(ticket.ticketEndTime)
        // console.log(new Date())
        // console.log(ticket.ticketEndTime.toString())
        if (ticket.ticketEndTime.getTime() - new Date().getTime() <= EXPIRY_THRESHOLD && ticket.notified == false) {
            // Send email
            if (await ExpiryNotification(ticket.ticketID)) {
                    // Set notified to true
                ticket.notified = true
                console.log(ticket)
                // Update database
                dataBaseControl.UpdateOpenTicketNotified( { ticketID:ticket.ticketID, value:true } )

                console.log("Expiry warning sent")
            }
        }
    }
}
import { serverEntity } from "../entity/serverEntity";
import { AddNewUser, GetOpenTicket, GetOpenTicketByTicketID } from "./databaseControl";
import expiryInitialiser from "./expiryControl";


export default async function serverInitialiser() {
    const res = await GetOpenTicket()

    if(res != null) serverEntity.setTickets(await res)
    
    console.log(serverEntity.getTicket())
    // Call the expiry function
    expiryInitialiser()
}

export function getOpenTicketByTicketID(ticketID:number) {
    for (const ticket of serverEntity.getTicket()){
        if (ticket.ticketID == ticketID) return ticket;
        return null;
    }
}

export function getOpenTicketByUserID(userID:number) {
    for (const ticket of serverEntity.getTicket()){
        if (ticket.userID == userID) return ticket;
        return null;
    }
}

export function addOpenTicketToServer(ticketID:number) {
    GetOpenTicketByTicketID(ticketID).then((res) => {
        if (res == null) console.error("Server fail to retrieve open ticket")
        else {
            serverEntity.addTicket(res)
            console.log("New Ticket Added to server")
        }
    })

}
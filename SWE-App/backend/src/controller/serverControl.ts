import { serverEntity } from "../entity/serverEntity";
import { CreateOpenTicket, GetOpenTicket, GetOpenTicketByTicketID, UpdateOpenTicketEndTime } from "./databaseControl";
import expiryInitialiser from "./expiryControl";

export default class serverControl {
    static async serverInitialiser() {
        const res = await GetOpenTicket()
    
        if(res != null) serverEntity.setTickets(await res)
        
        console.log(serverEntity.getTicket())
        // Call the expiry function
        expiryInitialiser()
    }

    static getOpenTicketByTicketID(ticketID:number) {
        for (const ticket of serverEntity.getTicket()){
            if (ticket.ticketID == ticketID) return ticket;
            return null;
        }
    }

    static getOpenTicketByUserID(userID:number) {
        for (const ticket of serverEntity.getTicket()){
            if (ticket.userID == userID) return ticket;
            return null;
        }
    }


    static async createOpenTicket(object:any ) {
        const res = CreateOpenTicket(object).then((res) => {
            if (res == null) console.error("Server fail to create open ticket")
            return res;
        })
        return await res;
    }

    static addOpenTicketToServer(ticketID:number) {
        GetOpenTicketByTicketID(ticketID).then((res) => {
            if (res == null) console.error("Server fail to retrieve open ticket")
            else {
                serverEntity.addTicket(res)
                console.log("New Ticket Added to server")
            }
        })
    }

    static async updateOpenTicketEndTime(object: any) {

        const {ticketID, newEndTime} = object

        if (!ticketID || !newEndTime) {
            console.error("Incorrect data passed into update open ticket")
            return false;
        }
        const res = UpdateOpenTicketEndTime(object).then((res) => {
            if (!res) console.error("Server failed to update database open ticket")
            else {
                const ticket = serverControl.getOpenTicketByTicketID(ticketID)
                console.log(serverControl.getOpenTicketByTicketID(ticketID))
                if (!ticket) console.error("Open ticket does not exist in server")
                else{
                    console.log(newEndTime)
                    ticket.ticketEndTime = newEndTime
                    console.log(serverControl.getOpenTicketByTicketID(ticketID))
                    return true;
                }
            }
            return false;
        })

        return await res;
    }

}



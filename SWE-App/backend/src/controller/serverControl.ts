import { serverEntity } from "../entity/serverEntity";
import dataBaseControl from "./databaseControl";
import expiryInitialiser from "./expiryControl";

export default class serverControl {
    static async serverInitialiser() {
        const res = await dataBaseControl.GetOpenTicket()
    
        if(res != null) serverEntity.setTickets(res)
        
        // console.log(serverEntity.getTicket())
        // Call the expiry function
        expiryInitialiser()
    }

    static getOpenTicketByTicketID(ticketID:number) {
        for (const ticket of serverEntity.getTicket()){
            if (ticket.ticketID == ticketID) return ticket;
        }
        return null
    }

    static getOpenTicketByUserID(userID:number) {
        for (const ticket of serverEntity.getTicket()){
            if (ticket.userID == userID) return ticket;
        }
        return null
    }


    static async createOpenTicket(object:any ) {
        // console.log("creating open ticket")
        const res = await dataBaseControl.CreateOpenTicket(object)
        if (res == null) console.error("Server fail to create open ticket")
        return res;
    }

    static async addOpenTicketToServer(ticketID:number) {
        // console.log("Adding open ticket")
        const res = await dataBaseControl.GetOpenTicketByTicketID(ticketID)

        if (res == null) console.error("Server fail to retrieve open ticket")
        else {
            serverEntity.addTicket(res)
            console.log("New Ticket Added to server")
        }
    }

    static async updateOpenTicketEndTime(object: any) {

        const {ticketID, newEndTime} = object
        // console.log(typeof newEndTime)

        if (!ticketID || !newEndTime) {
            console.error("Incorrect data passed into update open ticket")
            return false;
        }
        const res = dataBaseControl.UpdateOpenTicketEndTime(object).then((res) => {
            if (!res) console.error("Server failed to update database open ticket")
            else {
                const ticket = serverControl.getOpenTicketByTicketID(ticketID)
                // console.log(serverControl.getOpenTicketByTicketID(ticketID))
                if (!ticket) console.error("Open ticket does not exist in server")
                else{
                    // console.log(newEndTime)
                    ticket.ticketEndTime = new Date(newEndTime)
                    // console.log(serverControl.getOpenTicketByTicketID(ticketID))
                    return true;
                }
            }
            return false;
        })

        return await res;
    }

    static async closeTicket(object:any) {

        const {ticketID, closeTime} = object

        if (!ticketID || !closeTime) {
            console.error("Incorrect data passed into update open ticket")
            return false;
        }

        const ticket = serverControl.getOpenTicketByTicketID(ticketID);

        if (!ticket) {
            console.error("No existing open ticket")
            return false;
        }

        (ticket as any).actualEndTime = closeTime

        let res = await dataBaseControl.CreateClosedTicket(ticket)
        
        if (!res) {
            console.error("Fail to create closed ticket")
            return false;
        }

        res = await dataBaseControl.CreateUserClosedTicket(ticket)

        if (!res) {
            console.error("Fail to create user closed ticket")
            return false;
        }

        res = await dataBaseControl.DeleteOpenTicket(ticket.ticketID)

        if (!res) {
            console.error("Fail to delete open ticket")
            return false;
        }

        return true;

    }


}



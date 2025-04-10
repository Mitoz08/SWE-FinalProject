import { mainEntity, OpenTicket } from "../entity/mainEntity";
import mainControl from "./mainControl";


export default class viewTicketControl {
    static async getTicket()  {
        const ticket = mainEntity.getTicket()
        if(!ticket?.ticketID) return {
            ticket: null,
            address: null
        };
        const res = await fetch(`http://localhost:3000/CarparkAddress?carparkID=${ticket.parkingLotID}`)
        const {carparkAddress} = await res.json() 
        const returnObj = {
            ticket: ticket,
            address: carparkAddress 
        }
        return returnObj;
    }

    static async addTime(ticketID: number, newEndTime: Date) {
        const parameter = {
            ticketID: ticketID,
            newEndTime: newEndTime
        }

        const res = await fetch(`http://localhost:3000/OpenTicket`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(parameter)
        })

        const {boolean} = await res.json()

        if (boolean) mainControl.UpdateTicket(ticketID)

    }
}


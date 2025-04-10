import { mainEntity } from "../entity/mainEntity";
export default class viewTicketControl {
    static async getTicket() {
        const ticket = mainEntity.getTicket();
        if (!ticket)
            return null;
        const res = await fetch(`http://localhost:3000/CarparkAddress?carparkID=${ticket.parkingLotID}`);
        const { carparkAddress } = await res.json();
        const returnObj = {
            ticket: ticket,
            address: carparkAddress
        };
        return returnObj;
    }
}

import { OpenTicket } from "./databaseTypes";

class ServerEntity {
    
    private openTickets: OpenTicket[];

    constructor() {
        this.openTickets = [];
    }

    public setTickets(openTickets: OpenTicket[]) {
        this.openTickets = openTickets.sort((a:OpenTicket,b:OpenTicket) => {
            return a.ticketEndTime.valueOf() -  b.ticketEndTime.valueOf() ;
        })
    }

    public getTicket() {
        return this.openTickets
    }

    public addTicket (openTicket:OpenTicket) {
        this.openTickets.push(openTicket)
        this.openTickets.sort((a:OpenTicket,b:OpenTicket) => {
            return a.ticketEndTime.valueOf() -  b.ticketEndTime.valueOf() ;
        })
    }

    public removeTicket (ticketID: number) {
        var index = -1;
        var curIndex = 0;
        for (const ticket of this.openTickets){
            if (ticket.ticketID == ticketID) index = curIndex;
            curIndex++;
        }
        if (index > -1) {
            this.openTickets = this.openTickets.splice(index,1);
        }
    }
}

export const serverEntity = new ServerEntity()
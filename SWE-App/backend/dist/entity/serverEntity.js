"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverEntity = void 0;
class ServerEntity {
    constructor() {
        this.openTickets = [];
    }
    setTickets(openTickets) {
        this.openTickets = openTickets.sort((a, b) => {
            return a.ticketEndTime.valueOf() - b.ticketEndTime.valueOf();
        });
    }
    getTicket() {
        return this.openTickets;
    }
    addTicket(openTicket) {
        this.openTickets.push(openTicket);
        this.openTickets.sort((a, b) => {
            return a.ticketEndTime.valueOf() - b.ticketEndTime.valueOf();
        });
    }
    removeTicket(ticketID) {
        var index = -1;
        var curIndex = 0;
        for (const ticket of this.openTickets) {
            if (ticket.ticketID == ticketID)
                index = curIndex;
            curIndex++;
        }
        if (index > -1) {
            this.openTickets = this.openTickets.splice(index, 1);
        }
    }
}
exports.serverEntity = new ServerEntity();

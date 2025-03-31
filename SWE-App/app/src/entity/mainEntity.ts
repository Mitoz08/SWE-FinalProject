export type OpenTicket = {
    "ticketID":number,
    "parkingLotID":string,
    "licensePlate":string,
    "ticketStartTime":Date,
    "ticketEndTime":Date,
    "userID":number,
    "notified":boolean
}

class MainEntity {
    private userInfomation: any; // What to store in the userInformation?
    private openTicket: OpenTicket|{};

    constructor() {
        this.userInfomation = {};
        this.openTicket = {};
    }

    public setTicket(openTicket: OpenTicket) {
        this.openTicket = openTicket
    }

    public getTicket() {
        return this.openTicket
    }

}

export const mainEntity = new MainEntity()
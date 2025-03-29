export type OpenTicket = {
    "ticketID":number,
    "parkingLotID":string,
    "licensePlate":string,
    "ticketStartTime":Date,
    "ticketEndTime":Date,
    "userID":number
}

class MainEntity {
    private userInfomation: any; // What to store in the userInformation?
    private openTicket: OpenTicket|{};

    constructor() {
        this.userInfomation = {};
        this.openTicket = {};
        console.log("MainEntity Constructor")
    }

    public setTicket(openTicket: OpenTicket) {
        this.openTicket = openTicket
    }

    public getTicket() {
        return this.openTicket
    }

}

export const mainEntity = new MainEntity()
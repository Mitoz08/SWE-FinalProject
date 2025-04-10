
export type UserInformation = {
    "userID":number,
    "userEmail": string,
    "firstName": string,
    "lastName": string,
    "userPhoneNo": string
}


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
    private userInformation: UserInformation|null;
    private openTicket: OpenTicket|null;

    constructor() {
        this.userInformation =null;
        this.openTicket =null;
    }

    public setUserInformation(object:UserInformation) {
        this.userInformation = object
    }

    public getUserID() {
        return this.userInformation?.userID ?? null;
    }

    public getUserEmail() {
        return this.userInformation?.userEmail ?? null;
    }

    public getUserFirstName() {
        return this.userInformation?.firstName ?? null;
    }

    public getUserLastName() {
        return this.userInformation?.lastName ?? null;
    }

    public getUserPhoneNo() {
        return this.userInformation?.userPhoneNo ?? null;
    }

    public setTicket(openTicket: OpenTicket) {
        this.openTicket = openTicket
    }

    public getTicket() {
        return this.openTicket
    }

}

export const mainEntity = new MainEntity()
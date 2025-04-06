class MainEntity {
    userInformation;
    openTicket;
    constructor() {
        this.userInformation = null;
        this.openTicket = null;
    }
    setUserInformation(object) {
        this.userInformation = object;
    }
    getUserID() {
        return this.userInformation?.userID ?? null;
    }
    getUserEmail() {
        return this.userInformation?.userEmail ?? null;
    }
    getUserFirstName() {
        return this.userInformation?.firstName ?? null;
    }
    getUserLastName() {
        return this.userInformation?.lastName ?? null;
    }
    getUserPhoneNo() {
        return this.userInformation?.userPhoneNo ?? null;
    }
    setTicket(openTicket) {
        this.openTicket = openTicket;
    }
    getTicket() {
        return this.openTicket;
    }
}
export const mainEntity = new MainEntity();

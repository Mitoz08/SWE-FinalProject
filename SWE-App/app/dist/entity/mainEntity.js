class MainEntity {
    userInformation;
    openTicket;
    constructor() {
        this.userInformation = null;
        this.openTicket = null;
    }
    setUserInformation(object) {
        this.userInformation = object;
        console.log("UserInformation Set: ", this.userInformation);
    }
    getUserID() {
        console.log(this.userInformation);
        return this.userInformation?.userID ?? null;
    }
    getUserEmail() {
        return this.userInformation?.userEmail ?? null;
    }
    getUserName() {
        const name = [this.userInformation?.firstName ?? '', this.userInformation?.lastName ?? ''].join(' ');
        return name.length === 0 ? null : name;
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
        console.log("OpenTicket Set: ", this.openTicket);
    }
    getTicket() {
        console.log(this.openTicket);
        return this.openTicket;
    }
}
export const mainEntity = new MainEntity();

class MainEntity {
    userInfomation;
    openTicket;
    constructor() {
        this.userInfomation = {};
        this.openTicket = {};
    }
    setTicket(openTicket) {
        this.openTicket = openTicket;
    }
    getTicket() {
        return this.openTicket;
    }
}
export const mainEntity = new MainEntity();

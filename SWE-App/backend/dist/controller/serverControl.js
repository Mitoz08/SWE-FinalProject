"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = serverInitialiser;
exports.getOpenTicketByTicketID = getOpenTicketByTicketID;
exports.getOpenTicketByUserID = getOpenTicketByUserID;
exports.addOpenTicketToServer = addOpenTicketToServer;
const serverEntity_1 = require("../entity/serverEntity");
const databaseControl_1 = require("./databaseControl");
const expiryControl_1 = __importDefault(require("./expiryControl"));
function serverInitialiser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseControl_1.GetOpenTicket)();
        if (res != null)
            serverEntity_1.serverEntity.setTickets(yield res);
        console.log(serverEntity_1.serverEntity.getTicket());
        (0, expiryControl_1.default)();
    });
}
function getOpenTicketByTicketID(ticketID) {
    for (const ticket of serverEntity_1.serverEntity.getTicket()) {
        if (ticket.ticketID == ticketID)
            return ticket;
        return null;
    }
}
function getOpenTicketByUserID(userID) {
    for (const ticket of serverEntity_1.serverEntity.getTicket()) {
        if (ticket.userID == userID)
            return ticket;
        return null;
    }
}
function addOpenTicketToServer(ticketID) {
    (0, databaseControl_1.GetOpenTicketByTicketID)(ticketID).then((res) => {
        if (res == null)
            console.error("Server fail to retrieve open ticket");
        else {
            serverEntity_1.serverEntity.addTicket(res);
            console.log("New Ticket Added to server");
        }
    });
}

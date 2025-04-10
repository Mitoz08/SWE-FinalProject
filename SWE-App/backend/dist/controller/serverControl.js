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
const serverEntity_1 = require("../entity/serverEntity");
const databaseControl_1 = require("./databaseControl");
const expiryControl_1 = __importDefault(require("./expiryControl"));
class serverControl {
    static serverInitialiser() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, databaseControl_1.GetOpenTicket)();
            if (res != null)
                serverEntity_1.serverEntity.setTickets(yield res);
            console.log(serverEntity_1.serverEntity.getTicket());
            (0, expiryControl_1.default)();
        });
    }
    static getOpenTicketByTicketID(ticketID) {
        for (const ticket of serverEntity_1.serverEntity.getTicket()) {
            if (ticket.ticketID == ticketID)
                return ticket;
            return null;
        }
    }
    static getOpenTicketByUserID(userID) {
        for (const ticket of serverEntity_1.serverEntity.getTicket()) {
            if (ticket.userID == userID)
                return ticket;
            return null;
        }
    }
    static createOpenTicket(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = (0, databaseControl_1.CreateOpenTicket)(object).then((res) => {
                if (res == null)
                    console.error("Server fail to create open ticket");
                return res;
            });
            return yield res;
        });
    }
    static addOpenTicketToServer(ticketID) {
        (0, databaseControl_1.GetOpenTicketByTicketID)(ticketID).then((res) => {
            if (res == null)
                console.error("Server fail to retrieve open ticket");
            else {
                serverEntity_1.serverEntity.addTicket(res);
                console.log("New Ticket Added to server");
            }
        });
    }
    static updateOpenTicketEndTime(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ticketID, newEndTime } = object;
            if (!ticketID || !newEndTime) {
                console.error("Incorrect data passed into update open ticket");
                return false;
            }
            const res = (0, databaseControl_1.UpdateOpenTicketEndTime)(object).then((res) => {
                if (!res)
                    console.error("Server failed to update database open ticket");
                else {
                    const ticket = serverControl.getOpenTicketByTicketID(ticketID);
                    console.log(serverControl.getOpenTicketByTicketID(ticketID));
                    if (!ticket)
                        console.error("Open ticket does not exist in server");
                    else {
                        console.log(newEndTime);
                        ticket.ticketEndTime = newEndTime;
                        console.log(serverControl.getOpenTicketByTicketID(ticketID));
                        return true;
                    }
                }
                return false;
            });
            return yield res;
        });
    }
}
exports.default = serverControl;

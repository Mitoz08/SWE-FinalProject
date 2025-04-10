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
exports.NewTicketNotification = NewTicketNotification;
exports.ExpiryNotification = ExpiryNotification;
const emailAccess_1 = require("../boundary/emailAccess");
const databaseControl_1 = __importDefault(require("./databaseControl"));
const serverControl_1 = __importDefault(require("./serverControl"));
function NewTicketNotification(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = `New ticket created with ID: ${ticketID}`;
        const res = serverControl_1.default.getOpenTicketByTicketID(ticketID);
        if (res == null) {
            console.error(`No existing ticket with ID: ${ticketID}`);
            return false;
        }
        const text = `Dear Customer,

    You have create a new ticket with ID: ${ticketID}.\n
    The Carpark is ${yield databaseControl_1.default.GetCarparkAddress(res.parkingLotID)}
    The ticket ends on ${res.ticketEndTime.toISOString().replace("T", " ").substr(0, 19)}.`;
        const email = yield databaseControl_1.default.GetUserEmail(res.userID);
        if (email == null) {
            console.error(`No existing email found for user ID: ${res.userID}`);
            return false;
        }
        console.log(email, subject, text);
        return (0, emailAccess_1.emailSender)(email, subject, text);
    });
}
function ExpiryNotification(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = `Expiration alert for ticket ID: ${ticketID}`;
        const res = serverControl_1.default.getOpenTicketByTicketID(ticketID);
        if (res == null) {
            console.error(`No existing ticket with ID: ${ticketID}`);
            return false;
        }
        const text = `Dear Customer,

    You have ticket that is expiring soon. Ticket ID: ${ticketID}.
    The Carpark is ${yield databaseControl_1.default.GetCarparkAddress(res.parkingLotID)}
    The ticket ends on ${res.ticketEndTime.toISOString().replace("T", " ").substr(0, 19)}.`;
        const email = yield databaseControl_1.default.GetUserEmail(res.userID);
        if (email == null) {
            console.error(`No existing email found for user ID: ${res.userID}`);
            return false;
        }
        console.log(email, subject, text);
        return (0, emailAccess_1.emailSender)(email, subject, text);
    });
}

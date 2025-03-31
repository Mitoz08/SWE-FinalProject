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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTicketNotification = NewTicketNotification;
exports.ExpiryNotification = ExpiryNotification;
const emailAccess_1 = require("../boundary/emailAccess");
const databaseControl_js_1 = require("./databaseControl.js");
const serverControl_1 = require("./serverControl");
function NewTicketNotification(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = `New ticket created with ID: ${ticketID}`;
        const res = (0, serverControl_1.getOpenTicketByTicketID)(ticketID);
        if (res == null) {
            console.error(`No existing ticket with ID: ${ticketID}`);
            return false;
        }
        const text = `Dear Customer,

    You have create a new ticket with ID: ${ticketID}.\n
    The Carpark is ${yield (0, databaseControl_js_1.GetCarparkAddress)(res.parkingLotID)}
    The ticket ends on ${new Date(res.ticketEndTime)}.`;
        const email = yield (0, databaseControl_js_1.GetUserEmail)(res.userID);
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
        const res = (0, serverControl_1.getOpenTicketByTicketID)(ticketID);
        if (res == null) {
            console.error(`No existing ticket with ID: ${ticketID}`);
            return false;
        }
        const text = `Dear Customer,

    You have ticket that is expiring soon. Ticket ID: ${ticketID}.
    The Carpark is ${yield (0, databaseControl_js_1.GetCarparkAddress)(res.parkingLotID)}
    The ticket ends on ${new Date(res.ticketEndTime)}.`;
        const email = yield (0, databaseControl_js_1.GetUserEmail)(res.userID);
        if (email == null) {
            console.error(`No existing email found for user ID: ${res.userID}`);
            return false;
        }
        console.log(email, subject, text);
        return (0, emailAccess_1.emailSender)(email, subject, text);
    });
}

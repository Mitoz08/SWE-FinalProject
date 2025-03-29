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
const emailAccess_1 = require("../boundary/emailAccess");
const databaseControl_js_1 = require("./databaseControl.js");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function NewTicketNotification(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = `New ticket ${ticketID}`;
        const res = yield (0, databaseControl_js_1.GetOpenTicketByTicketID)(ticketID);
        console.log(typeof (res === null || res === void 0 ? void 0 : res.ticketEndTime));
        if (res === null) {
            console.error(`No existing ticket with ID: ${ticketID}`);
            return;
        }
        const text = `You have create a new ticket with ID: ${ticketID}.\n
                    The Carpark is 
                    The ticket ends on ${new Date(res.ticketEndTime)}.`;
        const email = yield (0, databaseControl_js_1.GetUserEmail)(res.userID);
        if (email === null) {
            console.error(`No existing email found for user ID: ${res.userID}`);
            return;
        }
        console.log(email, subject, text);
        (0, emailAccess_1.emailSender)(email, subject, text);
    });
}
function ExpiryNotification() { }
function ExpiryChecker() { }

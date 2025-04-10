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
exports.default = expiryInitialiser;
const serverEntity_1 = require("../entity/serverEntity");
const databaseControl_1 = __importDefault(require("./databaseControl"));
const emailControl_1 = require("./emailControl");
var interval;
const TIMEZONE_OFFSET = 8 * 60 * 60 * 1000;
const CHECK_INTERVAL = 0.25 * 60 * 1000;
const EXPIRY_THRESHOLD = 60 * 60 * 1000 + TIMEZONE_OFFSET;
function expiryInitialiser() {
    clockStart();
}
function clockStart() {
    interval = setInterval(expiryNotificationSender, CHECK_INTERVAL);
}
function expiryTerminate() {
    clearInterval(interval);
}
function expiryNotificationSender() {
    return __awaiter(this, void 0, void 0, function* () {
        const tickets = serverEntity_1.serverEntity.getTicket();
        for (const ticket of tickets) {
            if (ticket.ticketEndTime.getTime() - new Date().getTime() <= EXPIRY_THRESHOLD && ticket.notified == false) {
                if (yield (0, emailControl_1.ExpiryNotification)(ticket.ticketID)) {
                    ticket.notified = true;
                    console.log(ticket);
                    databaseControl_1.default.UpdateOpenTicketNotified({ ticketID: ticket.ticketID, value: true });
                    console.log("Expiry warning sent");
                }
            }
        }
    });
}

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
exports.E_AddNewUser = E_AddNewUser;
exports.E_GetUserID = E_GetUserID;
exports.E_DeleteUser = E_DeleteUser;
exports.E_AddUserInfo = E_AddUserInfo;
exports.E_GetUserInfo = E_GetUserInfo;
exports.E_GetUserEmail = E_GetUserEmail;
exports.E_UpdateUserInfo = E_UpdateUserInfo;
exports.E_CreateOpenTicket = E_CreateOpenTicket;
exports.E_GetOpenTicketByUserID = E_GetOpenTicketByUserID;
exports.E_GetOpenTicketByTicketID = E_GetOpenTicketByTicketID;
exports.E_UpdateOpenTicketEndTime = E_UpdateOpenTicketEndTime;
exports.E_DeleteOpenTicket = E_DeleteOpenTicket;
exports.E_CreateClosedTicket = E_CreateClosedTicket;
exports.E_GetClosedTicket = E_GetClosedTicket;
exports.E_CreateUserClosedTicket = E_CreateUserClosedTicket;
exports.E_GetUserClosedTicket = E_GetUserClosedTicket;
exports.E_GetCarparkAddress = E_GetCarparkAddress;
exports.E_GetRate = E_GetRate;
const databaseControl_1 = require("./databaseControl");
const emailControl_1 = require("./emailControl");
const serverControl_1 = __importDefault(require("./serverControl"));
function E_AddNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userFirebaseID } = req.body;
        if (!userFirebaseID) {
            res.status(400).json({ message: "userFirebaseID is required." });
            return;
        }
        const request = yield (0, databaseControl_1.AddNewUser)(userFirebaseID);
        if (request == null)
            res.status(500).json({ message: "Failed to add new user." });
        else {
            res.status(201).json({
                message: "User added sucessfully",
                userID: request
            });
        }
    });
}
function E_GetUserID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userFirebaseID } = req.query;
        if (!userFirebaseID) {
            res.status(400).json({ message: "userFirebaseID is required." });
            return;
        }
        const request = yield (0, databaseControl_1.GetUserID)(userFirebaseID);
        if (request == null)
            res.status(500).json({ message: "Failed to get user ID." });
        else {
            res.status(200).json({
                message: "User ID sucessfully returned",
                userID: request
            });
        }
    });
}
function E_DeleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID } = req.body;
        if (!userID) {
            res.status(400).json({ message: "userID is required." });
            return;
        }
        const request = yield (0, databaseControl_1.DeleteUser)(userID);
        if (request == null)
            res.status(500).json({ message: "Failed to delete user ID." });
        else {
            res.status(200).json({
                message: "User ID sucessfully deleted",
                boolean: request
            });
        }
    });
}
function E_AddUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = req.body;
        if (!object) {
            res.status(400).json({ message: "object is required." });
            return;
        }
        const request = yield (0, databaseControl_1.AddUserInfo)(object);
        if (request == null)
            res.status(500).json({ message: "Failed to add new user information." });
        else {
            res.status(201).json({
                message: "User information added sucessfully",
                userInfo: request
            });
        }
    });
}
function E_GetUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID } = req.query;
        if (!userID) {
            res.status(400).json({ message: "userID is required." });
            return;
        }
        const request = yield (0, databaseControl_1.GetUserInfo)(Number(userID));
        if (request == null)
            res.status(500).json({ message: "Failed to get user information." });
        else {
            res.status(200).json({
                message: "User information sucessfully returned",
                userInfo: request
            });
        }
    });
}
function E_GetUserEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID } = req.query;
        if (!userID) {
            res.status(400).json({ message: "userID is required." });
            return;
        }
        const request = yield (0, databaseControl_1.GetUserEmail)(Number(userID));
        if (request == null)
            res.status(500).json({ message: "Failed to get user email." });
        else {
            res.status(200).json({
                message: "User email sucessfully returned",
                userEmail: request
            });
        }
    });
}
function E_UpdateUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = req.body;
        if (!object) {
            res.status(400).json({ message: "object is required." });
            return;
        }
        const request = yield (0, databaseControl_1.UpdateUserInfo)(object);
        if (request == null)
            res.status(500).json({ message: "Failed to get user email." });
        else {
            res.status(200).json({
                message: "User email sucessfully returned",
                boolean: request
            });
        }
    });
}
function E_CreateOpenTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = req.body;
        if (!object) {
            res.status(400).json({ message: "object is required." });
            return;
        }
        const request = yield serverControl_1.default.createOpenTicket(object);
        if (request == null)
            res.status(500).json({ message: "Failed to create open ticket." });
        else {
            res.status(201).json({
                message: "Open ticket sucessfully created",
                ticketID: request
            });
            yield (0, emailControl_1.NewTicketNotification)(request).then(() => serverControl_1.default.addOpenTicketToServer(request));
        }
    });
}
function E_GetOpenTicketByUserID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID } = req.query;
        if (!userID) {
            res.status(400).json({ message: "userID is required." });
            return;
        }
        if (typeof userID === "string") {
            const request = serverControl_1.default.getOpenTicketByUserID(Number(userID));
            if (request == null) {
                res.status(200).json({
                    message: "Open ticket does not exsist",
                    openTicket: {}
                });
            }
            else {
                res.status(200).json({
                    message: "Open ticket sucessfully returned",
                    openTicket: request
                });
            }
        }
        else {
            res.status(500).json({ message: "Failed to get open ticket." });
        }
    });
}
function E_GetOpenTicketByTicketID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketID } = req.query;
        if (!ticketID) {
            res.status(400).json({ message: "ticketID is required." });
            return;
        }
        if (typeof ticketID === "string") {
            const request = serverControl_1.default.getOpenTicketByTicketID(Number(ticketID));
            if (request == null)
                res.status(500).json({ message: "Failed to get open ticket." });
            else {
                res.status(200).json({
                    message: "Open ticket sucessfully returned",
                    openTicket: request
                });
            }
        }
        else {
            res.status(500).json({ message: "Failed to get open ticket." });
        }
    });
}
function E_UpdateOpenTicketEndTime(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = req.body;
        object.newEndTime = new Date(object.newEndTime);
        if (!object) {
            res.status(400).json({ message: "object is required." });
            return;
        }
        const request = yield serverControl_1.default.updateOpenTicketEndTime(object);
        if (request == null)
            res.status(500).json({ message: "Failed to update open ticket." });
        else {
            res.status(200).json({
                message: "Open ticket sucessfully updated",
                boolean: request
            });
        }
    });
}
function E_DeleteOpenTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketID } = req.body;
        if (!ticketID) {
            res.status(400).json({ message: "ticketID is required." });
            return;
        }
        const request = yield (0, databaseControl_1.GetOpenTicketByTicketID)(ticketID);
        if (request == null)
            res.status(500).json({ message: "Failed to delete open ticket." });
        else {
            res.status(200).json({
                message: "Open ticket sucessfully deleted",
                boolean: request
            });
        }
    });
}
function E_CreateClosedTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = req.body;
        if (!object) {
            res.status(400).json({ message: "object is required." });
            return;
        }
        const request = yield (0, databaseControl_1.CreateClosedTicket)(object);
        if (request == null)
            res.status(500).json({ message: "Failed to create closed ticket." });
        else {
            res.status(201).json({
                message: "Closed ticket sucessfully create",
                boolean: request
            });
        }
    });
}
function E_GetClosedTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketID } = req.query;
        if (!ticketID) {
            res.status(400).json({ message: "ticketID is required." });
            return;
        }
        const request = yield (0, databaseControl_1.GetClosedTicket)(Number(ticketID));
        if (request == null)
            res.status(500).json({ message: "Failed to get closed ticket." });
        else {
            res.status(200).json({
                message: "Closed ticket sucessfully returned",
                closedTicket: request
            });
        }
    });
}
function E_CreateUserClosedTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = req.body;
        if (!object) {
            res.status(400).json({ message: "object is required." });
            return;
        }
        const request = yield (0, databaseControl_1.CreateUserClosedTicket)(object);
        if (request == null)
            res.status(500).json({ message: "Failed to create user closed ticket." });
        else {
            res.status(201).json({
                message: "User closed ticket sucessfully created",
                boolean: request
            });
        }
    });
}
function E_GetUserClosedTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID } = req.query;
        const request = yield (0, databaseControl_1.GetUserClosedTicket)(Number(userID));
        if (request == null)
            res.status(500).json({ message: "Failed to get user closed ticket." });
        else {
            res.status(200).json({
                message: "User closed ticket sucessfully returned",
                clostTicketArray: request
            });
        }
    });
}
function E_GetCarparkAddress(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { carparkID } = req.query;
        const request = yield (0, databaseControl_1.GetCarparkAddress)(carparkID);
        if (request == null)
            res.status(500).json({ message: "Failed to get carpark address." });
        else {
            res.status(200).json({
                message: "Carpark address sucessfully returned",
                carparkAddress: request
            });
        }
    });
}
function E_GetRate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const object = req.query;
        const request = yield (0, databaseControl_1.GetRate)(object);
        if (request == null)
            res.status(500).json({ message: "Failed to get carpark rate." });
        else {
            res.status(200).json({
                message: "Carpark rate sucessfully returned",
                rate: request
            });
        }
    });
}

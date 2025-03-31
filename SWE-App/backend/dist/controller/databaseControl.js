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
exports.AddNewUser = AddNewUser;
exports.GetUserID = GetUserID;
exports.DeleteUser = DeleteUser;
exports.AddUserInfo = AddUserInfo;
exports.GetUserInfo = GetUserInfo;
exports.GetUserEmail = GetUserEmail;
exports.UpdateUserInfo = UpdateUserInfo;
exports.AddUserPayment = AddUserPayment;
exports.GetUserPayment = GetUserPayment;
exports.UpdateUserPayment = UpdateUserPayment;
exports.CreateOpenTicket = CreateOpenTicket;
exports.GetOpenTicketByUserID = GetOpenTicketByUserID;
exports.GetOpenTicketByTicketID = GetOpenTicketByTicketID;
exports.GetOpenTicket = GetOpenTicket;
exports.UpdateOpenTicketEndTime = UpdateOpenTicketEndTime;
exports.UpdateOpenTicketNotified = UpdateOpenTicketNotified;
exports.DeleteOpenTicket = DeleteOpenTicket;
exports.CreateClosedTicket = CreateClosedTicket;
exports.GetClosedTicket = GetClosedTicket;
exports.CreateUserClosedTicket = CreateUserClosedTicket;
exports.GetUserClosedTicket = GetUserClosedTicket;
exports.dateToString = dateToString;
exports.dateOffsetPlus = dateOffsetPlus;
exports.GetCarparkAddress = GetCarparkAddress;
exports.GetRate = GetRate;
const databaseAccess_1 = require("../boundary/databaseAccess");
var feeTypes;
(function (feeTypes) {
    feeTypes[feeTypes["motorcycle"] = 0.65] = "motorcycle";
    feeTypes[feeTypes["car_CP"] = 1.2] = "car_CP";
    feeTypes[feeTypes["car_NCP"] = 0.6] = "car_NCP";
    feeTypes[feeTypes["heavy_vehicle"] = 1.2] = "heavy_vehicle";
})(feeTypes || (feeTypes = {}));
function ErrorMsg_MySQL() {
    console.error("MySQL Error");
    return null;
}
function ErrorMsg_NoEntry() {
    console.error("Entry does not exist");
    return null;
}
function ErrorMsg_DeletionFailed() {
    console.error("Entry does not exist");
    return null;
}
function AddNewUser(userFirebaseID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Create)(databaseAccess_1.TableNames_App.UserID, {
            [databaseAccess_1.ColumnNames_App.userFirebaseID]: userFirebaseID
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return res.insertId;
    });
}
function GetUserID(userFirebaseID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.UserID, {
            [databaseAccess_1.ColumnNames_App.userFirebaseID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: userFirebaseID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0][databaseAccess_1.ColumnNames_App.userID];
    });
}
function DeleteUser(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Delete)(databaseAccess_1.TableNames_App.UserID, {
            [databaseAccess_1.ColumnNames_App.userID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function AddUserInfo(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, userEmail, firstName, lastName, userPhoneNo } = object;
        if (userPhoneNo.length != 8) {
            console.error("Phone number not 8 characters long");
            return null;
        }
        if (!isValidEmail(userEmail)) {
            console.error("Email does not follow the right regex");
            return null;
        }
        const res = yield (0, databaseAccess_1.Create)(databaseAccess_1.TableNames_App.UserInformation, {
            [databaseAccess_1.ColumnNames_App.userID]: userID,
            [databaseAccess_1.ColumnNames_App.userEmail]: userEmail,
            [databaseAccess_1.ColumnNames_App.firstName]: firstName,
            [databaseAccess_1.ColumnNames_App.lastName]: lastName,
            [databaseAccess_1.ColumnNames_App.userPhoneNo]: userPhoneNo
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetUserInfo(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.UserInformation, {
            [databaseAccess_1.ColumnNames_App.userID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0];
    });
}
function GetUserEmail(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.UserInformation, {
            [databaseAccess_1.ColumnNames_App.userID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0].userEmail;
    });
}
function UpdateUserInfo(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, userEmail, firstName, lastName, userPhoneNo } = object;
        if (userPhoneNo.length != 8) {
            console.error("Phone number not 8 characters long");
            return null;
        }
        if (!isValidEmail(userEmail)) {
            console.error("Email does not follow the right regex");
            return null;
        }
        const res = yield (0, databaseAccess_1.Update)(databaseAccess_1.TableNames_App.UserInformation, {
            "set": {
                [databaseAccess_1.ColumnNames_App.userEmail]: userEmail,
                [databaseAccess_1.ColumnNames_App.firstName]: firstName,
                [databaseAccess_1.ColumnNames_App.lastName]: lastName,
                [databaseAccess_1.ColumnNames_App.userPhoneNo]: userPhoneNo
            },
            "where": {
                [databaseAccess_1.ColumnNames_App.userID]: {
                    [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                    [databaseAccess_1.ConditionVariable.values]: userID
                }
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res.affectedRows) {
            return ErrorMsg_NoEntry();
        }
        return true;
    });
}
function AddUserPayment(userID, customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Create)(databaseAccess_1.TableNames_App.UserPayment, {
            [databaseAccess_1.ColumnNames_App.userID]: userID,
            [databaseAccess_1.ColumnNames_App.customerID]: customerID
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetUserPayment(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.UserPayment, {
            [databaseAccess_1.ColumnNames_App.userID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0][databaseAccess_1.ColumnNames_App.customerID];
    });
}
function UpdateUserPayment(userID, customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Update)(databaseAccess_1.TableNames_App.UserPayment, {
            "set": {
                [databaseAccess_1.ColumnNames_App.customerID]: customerID
            },
            "where": {
                [databaseAccess_1.ColumnNames_App.userID]: {
                    [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                    [databaseAccess_1.ConditionVariable.values]: userID
                }
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res.affectedRows === 0) {
            return ErrorMsg_NoEntry();
        }
        return true;
    });
}
function CreateOpenTicket(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { parkingLotID, licensePlate, ticketStartTime, ticketEndTime, userID } = object;
        const res = yield (0, databaseAccess_1.Create)(databaseAccess_1.TableNames_App.OpenTickets, {
            [databaseAccess_1.ColumnNames_App.parkingLotID]: parkingLotID,
            [databaseAccess_1.ColumnNames_App.licensePlate]: licensePlate,
            [databaseAccess_1.ColumnNames_App.ticketStartTime]: dateToString(new Date(ticketStartTime)),
            [databaseAccess_1.ColumnNames_App.ticketEndTime]: dateToString(new Date(ticketEndTime)),
            [databaseAccess_1.ColumnNames_App.userID]: Number(userID)
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return res.insertId;
    });
}
function GetOpenTicketByUserID(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.OpenTickets, {
            [databaseAccess_1.ColumnNames_App.userID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        const ticket = res[0];
        ticket.ticketEndTime = dateOffsetPlus(ticket.ticketEndTime);
        ticket.ticketStartTime = dateOffsetPlus(ticket.ticketStartTime);
        return ticket;
    });
}
function GetOpenTicketByTicketID(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.OpenTickets, {
            [databaseAccess_1.ColumnNames_App.ticketID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: ticketID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        const ticket = res[0];
        ticket.ticketEndTime = dateOffsetPlus(ticket.ticketEndTime);
        ticket.ticketStartTime = dateOffsetPlus(ticket.ticketStartTime);
        return ticket;
    });
}
function GetOpenTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.OpenTickets);
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        const tickets = res;
        for (const ticket of tickets) {
            const ticket = res[0];
            ticket.ticketEndTime = dateOffsetPlus(ticket.ticketEndTime);
            ticket.ticketStartTime = dateOffsetPlus(ticket.ticketStartTime);
        }
        return res;
    });
}
function UpdateOpenTicketEndTime(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketID, ticketEndTime } = object;
        const res = yield (0, databaseAccess_1.Update)(databaseAccess_1.TableNames_App.OpenTickets, {
            "set": {
                [databaseAccess_1.ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime)
            },
            "where": {
                [databaseAccess_1.ColumnNames_App.ticketID]: {
                    [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                    [databaseAccess_1.ConditionVariable.values]: ticketID
                }
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res.affectedRows === 0) {
            return ErrorMsg_NoEntry();
        }
        return true;
    });
}
function UpdateOpenTicketNotified(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketID, value } = object;
        const res = yield (0, databaseAccess_1.Update)(databaseAccess_1.TableNames_App.OpenTickets, {
            "set": {
                [databaseAccess_1.ColumnNames_App.notified]: value
            },
            "where": {
                [databaseAccess_1.ColumnNames_App.ticketID]: {
                    [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                    [databaseAccess_1.ConditionVariable.values]: ticketID
                }
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res.affectedRows === 0) {
            return ErrorMsg_NoEntry();
        }
        return true;
    });
}
function DeleteOpenTicket(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Delete)(databaseAccess_1.TableNames_App.OpenTickets, {
            [databaseAccess_1.ColumnNames_App.ticketID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: ticketID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function CreateClosedTicket(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketID, parkingLotID, licensePlate, ticketStartTime, ticketEndTime, actualEndTime } = object;
        const res = yield (0, databaseAccess_1.Create)(databaseAccess_1.TableNames_App.ClosedTickets, {
            [databaseAccess_1.ColumnNames_App.ticketID]: ticketID,
            [databaseAccess_1.ColumnNames_App.parkingLotID]: parkingLotID,
            [databaseAccess_1.ColumnNames_App.licensePlate]: licensePlate,
            [databaseAccess_1.ColumnNames_App.ticketStartTime]: dateToString(ticketStartTime),
            [databaseAccess_1.ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime),
            [databaseAccess_1.ColumnNames_App.actualEndTime]: dateToString(actualEndTime)
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetClosedTicket(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.ClosedTickets, {
            [databaseAccess_1.ColumnNames_App.ticketID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: ticketID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0];
    });
}
function CreateUserClosedTicket(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ticketID, userID } = object;
        const res = yield (0, databaseAccess_1.Create)(databaseAccess_1.TableNames_App.UserClosedTickets, {
            [databaseAccess_1.ColumnNames_App.userID]: userID,
            [databaseAccess_1.ColumnNames_App.ticketID]: ticketID
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetUserClosedTicket(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_App.UserClosedTickets, {
            [databaseAccess_1.ColumnNames_App.userID]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res;
    });
}
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function dateToString(date) {
    date.setSeconds(0);
    const TimeZoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - TimeZoneOffset).toISOString().replace('T', " ").slice(0, 19);
}
function dateOffsetPlus(date) {
    const TimeZoneOffset = 8 * 60 * 60000;
    return new Date(date.getTime() + TimeZoneOffset);
}
function GetCarparkAddress(carparkID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_HDBInfo.HDBCarpark, {
            [databaseAccess_1.ColumnNames_HDBInfo.carparkNo]: {
                [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                [databaseAccess_1.ConditionVariable.values]: carparkID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0].address;
    });
}
function GetRate(object) {
    return __awaiter(this, void 0, void 0, function* () {
        const { carparkID, vehType } = object;
        if (vehType == "M")
            return feeTypes.motorcycle;
        else if (vehType == "HV")
            return feeTypes.heavy_vehicle;
        else if (vehType == "C") {
            const res = yield (0, databaseAccess_1.Read)(databaseAccess_1.TableNames_HDBInfo.WithinCtrlArea, {
                [databaseAccess_1.ColumnNames_HDBInfo.carparkNo]: {
                    [databaseAccess_1.ConditionVariable.operator]: databaseAccess_1.Operator.EqualTo,
                    [databaseAccess_1.ConditionVariable.values]: carparkID
                }
            });
            if (res === null) {
                return ErrorMsg_MySQL();
            }
            if (res[0] === undefined) {
                return feeTypes.car_NCP;
            }
            else
                return feeTypes.car_CP;
        }
        return null;
    });
}

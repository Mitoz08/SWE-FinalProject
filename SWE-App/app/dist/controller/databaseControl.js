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
exports.AddUserEmail = AddUserEmail;
exports.GetUserID = GetUserID;
exports.GetUserEmail = GetUserEmail;
exports.UpdateUserEmail = UpdateUserEmail;
exports.DeleteUser = DeleteUser;
exports.AddUserInfo = AddUserInfo;
exports.GetUserPhoneNo = GetUserPhoneNo;
exports.UpdateUserPhoneNo = UpdateUserPhoneNo;
exports.AddUserPayment = AddUserPayment;
exports.GetUserPayment = GetUserPayment;
exports.UpdateUserPayment = UpdateUserPayment;
exports.CreateOpenTicket = CreateOpenTicket;
exports.GetOpenTicketByUserID = GetOpenTicketByUserID;
exports.GetOpenTicketByTicketID = GetOpenTicketByTicketID;
exports.UpdateOpenTicketEndTime = UpdateOpenTicketEndTime;
exports.DeleteOpenTicket = DeleteOpenTicket;
exports.CreateClosedTicket = CreateClosedTicket;
exports.GetClosedTicket = GetClosedTicket;
exports.CreateUserClosedTicket = CreateUserClosedTicket;
exports.GetUserClosedTicket = GetUserClosedTicket;
exports.dateToString = dateToString;
exports.GetCarparkAddress = GetCarparkAddress;
exports.GetRate = GetRate;
const databaseAccess_js_1 = require("../boundary/databaseAccess.js");
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
function AddUserEmail(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Create)(databaseAccess_js_1.TableNames_App.UserID, {
            [databaseAccess_js_1.ColumnNames_App.userEmail]: userEmail
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return res.insertId;
    });
}
function GetUserID(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.UserID, {
            [databaseAccess_js_1.ColumnNames_App.userEmail]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: userEmail
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0][databaseAccess_js_1.ColumnNames_App.userID];
    });
}
function GetUserEmail(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.UserID, {
            [databaseAccess_js_1.ColumnNames_App.userID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0][databaseAccess_js_1.ColumnNames_App.userEmail];
    });
}
function UpdateUserEmail(userID, userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Update)(databaseAccess_js_1.TableNames_App.UserID, {
            "set": {
                [databaseAccess_js_1.ColumnNames_App.userEmail]: userEmail
            },
            "where": {
                [databaseAccess_js_1.ColumnNames_App.userID]: {
                    [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                    [databaseAccess_js_1.ConditionVariable.values]: userID
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
function DeleteUser(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Delete)(databaseAccess_js_1.TableNames_App.UserID, {
            [databaseAccess_js_1.ColumnNames_App.userID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function AddUserInfo(userID, userPhoneNo) {
    return __awaiter(this, void 0, void 0, function* () {
        if (userPhoneNo.length != 8) {
            throw new Error("Phone number is not 8 characters long");
        }
        const res = yield (0, databaseAccess_js_1.Create)(databaseAccess_js_1.TableNames_App.UserInformation, {
            [databaseAccess_js_1.ColumnNames_App.userID]: userID,
            [databaseAccess_js_1.ColumnNames_App.userPhoneNo]: userPhoneNo
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetUserPhoneNo(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.UserInformation, {
            [databaseAccess_js_1.ColumnNames_App.userID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0][databaseAccess_js_1.ColumnNames_App.userPhoneNo];
    });
}
function UpdateUserPhoneNo(userID, userPhoneNo) {
    return __awaiter(this, void 0, void 0, function* () {
        if (userPhoneNo.length != 8) {
            throw new Error("Phone number is not 8 characters long");
        }
        const res = yield (0, databaseAccess_js_1.Update)(databaseAccess_js_1.TableNames_App.UserInformation, {
            "set": {
                [databaseAccess_js_1.ColumnNames_App.userPhoneNo]: userPhoneNo
            },
            "where": {
                [databaseAccess_js_1.ColumnNames_App.userID]: {
                    [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                    [databaseAccess_js_1.ConditionVariable.values]: userID
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
        const res = yield (0, databaseAccess_js_1.Create)(databaseAccess_js_1.TableNames_App.UserPayment, {
            [databaseAccess_js_1.ColumnNames_App.userID]: userID,
            [databaseAccess_js_1.ColumnNames_App.customerID]: customerID
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetUserPayment(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.UserPayment, {
            [databaseAccess_js_1.ColumnNames_App.userID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: userID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        if (res[0] === undefined) {
            return ErrorMsg_NoEntry();
        }
        return res[0][databaseAccess_js_1.ColumnNames_App.customerID];
    });
}
function UpdateUserPayment(userID, customerID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Update)(databaseAccess_js_1.TableNames_App.UserPayment, {
            "set": {
                [databaseAccess_js_1.ColumnNames_App.customerID]: customerID
            },
            "where": {
                [databaseAccess_js_1.ColumnNames_App.userID]: {
                    [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                    [databaseAccess_js_1.ConditionVariable.values]: userID
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
function CreateOpenTicket(parkingLotID, licensePlate, ticketStartTime, ticketEndTime, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Create)(databaseAccess_js_1.TableNames_App.OpenTickets, {
            [databaseAccess_js_1.ColumnNames_App.parkingLotID]: parkingLotID,
            [databaseAccess_js_1.ColumnNames_App.licensePlate]: licensePlate,
            [databaseAccess_js_1.ColumnNames_App.ticketStartTime]: dateToString(ticketStartTime),
            [databaseAccess_js_1.ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime),
            [databaseAccess_js_1.ColumnNames_App.userID]: userID
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return res.insertId;
    });
}
function GetOpenTicketByUserID(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.OpenTickets, {
            [databaseAccess_js_1.ColumnNames_App.userID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: userID
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
function GetOpenTicketByTicketID(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.OpenTickets, {
            [databaseAccess_js_1.ColumnNames_App.ticketID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: ticketID
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
function UpdateOpenTicketEndTime(ticketID, ticketEndTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Update)(databaseAccess_js_1.TableNames_App.OpenTickets, {
            "set": {
                [databaseAccess_js_1.ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime)
            },
            "where": {
                [databaseAccess_js_1.ColumnNames_App.ticketID]: {
                    [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                    [databaseAccess_js_1.ConditionVariable.values]: ticketID
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
        const res = yield (0, databaseAccess_js_1.Delete)(databaseAccess_js_1.TableNames_App.OpenTickets, {
            [databaseAccess_js_1.ColumnNames_App.ticketID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: ticketID
            }
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function CreateClosedTicket(ticketID, parkingLotID, licensePlate, ticketStartTime, ticketEndTime, actualEndTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Create)(databaseAccess_js_1.TableNames_App.ClosedTickets, {
            [databaseAccess_js_1.ColumnNames_App.ticketID]: ticketID,
            [databaseAccess_js_1.ColumnNames_App.parkingLotID]: parkingLotID,
            [databaseAccess_js_1.ColumnNames_App.licensePlate]: licensePlate,
            [databaseAccess_js_1.ColumnNames_App.ticketStartTime]: dateToString(ticketStartTime),
            [databaseAccess_js_1.ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime),
            [databaseAccess_js_1.ColumnNames_App.actualEndTime]: dateToString(actualEndTime)
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetClosedTicket(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.ClosedTickets, {
            [databaseAccess_js_1.ColumnNames_App.ticketID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: ticketID
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
function CreateUserClosedTicket(ticketID, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Create)(databaseAccess_js_1.TableNames_App.UserClosedTickets, {
            [databaseAccess_js_1.ColumnNames_App.userID]: userID,
            [databaseAccess_js_1.ColumnNames_App.ticketID]: ticketID
        });
        if (res === null) {
            return ErrorMsg_MySQL();
        }
        return true;
    });
}
function GetUserClosedTicket(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_App.UserClosedTickets, {
            [databaseAccess_js_1.ColumnNames_App.userID]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: userID
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
function dateToString(date) {
    date.setSeconds(0);
    const TimeZoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - TimeZoneOffset).toISOString().replace('T', " ").slice(0, 19);
}
function GetCarparkAddress(carparkID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_HDBInfo.HDBCarpark, {
            [databaseAccess_js_1.ColumnNames_HDBInfo.carparkNo]: {
                [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                [databaseAccess_js_1.ConditionVariable.values]: carparkID
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
function GetRate(carparkID, vehType) {
    return __awaiter(this, void 0, void 0, function* () {
        if (vehType == "MCycle")
            return feeTypes.motorcycle;
        else if (vehType == "HVehicle")
            return feeTypes.heavy_vehicle;
        else {
            const res = yield (0, databaseAccess_js_1.Read)(databaseAccess_js_1.TableNames_HDBInfo.WithinCtrlArea, {
                [databaseAccess_js_1.ColumnNames_HDBInfo.carparkNo]: {
                    [databaseAccess_js_1.ConditionVariable.operator]: databaseAccess_js_1.Operator.EqualTo,
                    [databaseAccess_js_1.ConditionVariable.values]: carparkID
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
    });
}

import { TableNames_App, ColumnNames_App, TableNames_HDBInfo, ColumnNames_HDBInfo, Operator, ConditionVariable, Create, Read, Update, Delete } from "../boundary/databaseAccess.js";
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
export async function AddNewUser(userFirebaseID) {
    const res = await Create(TableNames_App.UserID, {
        [ColumnNames_App.userFirebaseID]: userFirebaseID
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return res.insertId;
}
export async function GetUserID(userFirebaseID) {
    const res = await Read(TableNames_App.UserID, {
        [ColumnNames_App.userFirebaseID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: userFirebaseID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0][ColumnNames_App.userID];
}
export async function DeleteUser(userID) {
    const res = await Delete(TableNames_App.UserID, {
        [ColumnNames_App.userID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: userID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return true;
}
export async function AddUserInfo(userID, userEmail, firstName, lastName, userPhoneNo) {
    if (userPhoneNo.length != 8) {
        console.error("Phone number not 8 characters long");
        return null;
    }
    if (!isValidEmail(userEmail)) {
        console.error("Email does not follow the right regex");
        return null;
    }
    const res = await Create(TableNames_App.UserInformation, {
        [ColumnNames_App.userID]: userID,
        [ColumnNames_App.userEmail]: userEmail,
        [ColumnNames_App.firstName]: firstName,
        [ColumnNames_App.lastName]: lastName,
        [ColumnNames_App.userPhoneNo]: userPhoneNo
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return true;
}
export async function GetUserInfo(userID) {
    const res = await Read(TableNames_App.UserInformation, {
        [ColumnNames_App.userID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: userID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0];
}
export async function GetUserEmail(userID) {
    const res = await Read(TableNames_App.UserInformation, {
        [ColumnNames_App.userID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: userID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0].userEmail;
}
export async function UpdateUserInfo(userID, userEmail, firstName, lastName, userPhoneNo) {
    if (userPhoneNo.length != 8) {
        console.error("Phone number not 8 characters long");
        return null;
    }
    if (!isValidEmail(userEmail)) {
        console.error("Email does not follow the right regex");
        return null;
    }
    const res = await Update(TableNames_App.UserInformation, {
        "set": {
            [ColumnNames_App.userEmail]: userEmail,
            [ColumnNames_App.firstName]: firstName,
            [ColumnNames_App.lastName]: lastName,
            [ColumnNames_App.userPhoneNo]: userPhoneNo
        },
        "where": {
            [ColumnNames_App.userID]: {
                [ConditionVariable.operator]: Operator.EqualTo,
                [ConditionVariable.values]: userID
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
}
export async function AddUserPayment(userID, customerID) {
    const res = await Create(TableNames_App.UserPayment, {
        [ColumnNames_App.userID]: userID,
        [ColumnNames_App.customerID]: customerID
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return true;
}
export async function GetUserPayment(userID) {
    const res = await Read(TableNames_App.UserPayment, {
        [ColumnNames_App.userID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: userID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0][ColumnNames_App.customerID];
}
export async function UpdateUserPayment(userID, customerID) {
    const res = await Update(TableNames_App.UserPayment, {
        "set": {
            [ColumnNames_App.customerID]: customerID
        },
        "where": {
            [ColumnNames_App.userID]: {
                [ConditionVariable.operator]: Operator.EqualTo,
                [ConditionVariable.values]: userID
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
}
export async function CreateOpenTicket(parkingLotID, licensePlate, ticketStartTime, ticketEndTime, userID) {
    const res = await Create(TableNames_App.OpenTickets, {
        [ColumnNames_App.parkingLotID]: parkingLotID,
        [ColumnNames_App.licensePlate]: licensePlate,
        [ColumnNames_App.ticketStartTime]: dateToString(ticketStartTime),
        [ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime),
        [ColumnNames_App.userID]: userID
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return res.insertId;
}
export async function GetOpenTicketByUserID(userID) {
    const res = await Read(TableNames_App.OpenTickets, {
        [ColumnNames_App.userID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: userID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0];
}
export async function GetOpenTicketByTicketID(ticketID) {
    const res = await Read(TableNames_App.OpenTickets, {
        [ColumnNames_App.ticketID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: ticketID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0];
}
export async function UpdateOpenTicketEndTime(ticketID, ticketEndTime) {
    const res = await Update(TableNames_App.OpenTickets, {
        "set": {
            [ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime)
        },
        "where": {
            [ColumnNames_App.ticketID]: {
                [ConditionVariable.operator]: Operator.EqualTo,
                [ConditionVariable.values]: ticketID
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
}
export async function DeleteOpenTicket(ticketID) {
    const res = await Delete(TableNames_App.OpenTickets, {
        [ColumnNames_App.ticketID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: ticketID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return true;
}
export async function CreateClosedTicket(ticketID, parkingLotID, licensePlate, ticketStartTime, ticketEndTime, actualEndTime) {
    const res = await Create(TableNames_App.ClosedTickets, {
        [ColumnNames_App.ticketID]: ticketID,
        [ColumnNames_App.parkingLotID]: parkingLotID,
        [ColumnNames_App.licensePlate]: licensePlate,
        [ColumnNames_App.ticketStartTime]: dateToString(ticketStartTime),
        [ColumnNames_App.ticketEndTime]: dateToString(ticketEndTime),
        [ColumnNames_App.actualEndTime]: dateToString(actualEndTime)
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return true;
}
export async function GetClosedTicket(ticketID) {
    const res = await Read(TableNames_App.ClosedTickets, {
        [ColumnNames_App.ticketID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: ticketID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0];
}
export async function CreateUserClosedTicket(ticketID, userID) {
    const res = await Create(TableNames_App.UserClosedTickets, {
        [ColumnNames_App.userID]: userID,
        [ColumnNames_App.ticketID]: ticketID
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    return true;
}
export async function GetUserClosedTicket(userID) {
    const res = await Read(TableNames_App.UserClosedTickets, {
        [ColumnNames_App.userID]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: userID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res;
}
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
export function dateToString(date) {
    date.setSeconds(0);
    const TimeZoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - TimeZoneOffset).toISOString().replace('T', " ").slice(0, 19);
}
export async function GetCarparkAddress(carparkID) {
    const res = await Read(TableNames_HDBInfo.HDBCarpark, {
        [ColumnNames_HDBInfo.carparkNo]: {
            [ConditionVariable.operator]: Operator.EqualTo,
            [ConditionVariable.values]: carparkID
        }
    });
    if (res === null) {
        return ErrorMsg_MySQL();
    }
    if (res[0] === undefined) {
        return ErrorMsg_NoEntry();
    }
    return res[0].address;
}
export async function GetRate(carparkID, vehType) {
    if (vehType == "MCycle")
        return feeTypes.motorcycle;
    else if (vehType == "HVehicle")
        return feeTypes.heavy_vehicle;
    else {
        const res = await Read(TableNames_HDBInfo.WithinCtrlArea, {
            [ColumnNames_HDBInfo.carparkNo]: {
                [ConditionVariable.operator]: Operator.EqualTo,
                [ConditionVariable.values]: carparkID
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
}

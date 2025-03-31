export type OpenTicket = {
    "ticketID":number,
    "parkingLotID":string,
    "licensePlate":string,
    "ticketStartTime":Date,
    "ticketEndTime":Date,
    "userID":number,
    "notified":boolean
}

export type ClosedTicket = {
    "ticketID":number,
    "parkingLotID":string,
    "licensePlate":string,
    "ticketStartTime":Date,
    "ticketEndTime":Date,
    "actualEndTime":Date,
}

export type UserInformation = {
    "userID":number,
    "userEmail":string,
    "firstName":string,
    "lastName":string,
    "userPhoneNo":string
}
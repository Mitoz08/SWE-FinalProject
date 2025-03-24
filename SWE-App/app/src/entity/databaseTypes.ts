export type OpenTickets = {
    "ticketID":number,
    "parkingLotID":string,
    "licensePlate":string,
    "ticketStartTime":Date,
    "ticketEndTime":Date,
    "userID":number
}

export type UserInformation = {
    "userID":number,
    "userEmail":string,
    "firstName":string,
    "lastName":string,
    "userPhoneNo":string
}
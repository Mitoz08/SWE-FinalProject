CREATE TABLE UserID (
    userID INT AUTO_INCREMENT,
    userFirebaseID VARCHAR(50) UNIQUE,
    PRIMARY KEY (userID, userFirebaseID)
);

CREATE TABLE UserInformation (
    userID INT,
    userEmail VARCHAR(320),
    firstName VARCHAR(40),
    lastName VARCHAR(40),
    userPhoneNo VARCHAR(8) UNIQUE,
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserID(userID) ON DELETE CASCADE
);
-- CREATE TABLE UserLoginDetails (
--     userID INT,
--     userPassword VARCHAR(255),
--     PRIMARY KEY (userID),
--     FOREIGN KEY (userID) REFERENCES UserID(userID) ON DELETE CASCADE
-- );

CREATE TABLE UserPayment (
    userID INT,
    customerID VARCHAR(255),
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES UserID(userID) ON DELETE CASCADE
);

CREATE TABLE OpenTickets (
    ticketID INT AUTO_INCREMENT,
    parkingLotID VARCHAR(10) NOT NULL,
    licensePlate VARCHAR(8) NOT NULL,
    ticketStartTime DATETIME NOT NULL,
    ticketEndTime DATETIME NOT NULL,
    userID INT NOT NULL UNIQUE,
    PRIMARY KEY (ticketID),
    FOREIGN KEY (userID) REFERENCES UserID(userID) ON DELETE CASCADE
);

CREATE TABLE ClosedTickets (
    ticketID INT ,
    parkingLotID VARCHAR(10) NOT NULL,
    licensePlate VARCHAR(8) NOT NULL,
    ticketStartTime DATETIME NOT NULL,
    ticketEndTime DATETIME NOT NULL,
    actualEndTime DATETIME NOT NULL,
    PRIMARY KEY (ticketID)
);

CREATE TABLE UserClosedTickets (
    userID INT,
    ticketID INT,
    PRIMARY KEY (userID,ticketID),
    FOREIGN KEY (userID) REFERENCES UserID(userID) ON DELETE CASCADE,
    FOREIGN KEY (ticketID) REFERENCES ClosedTickets(ticketID) ON DELETE CASCADE
);

CREATE TABLE CarparkType (
	typeID TINYINT,
    category VARCHAR(50)
);

CREATE TABLE CarparkSystemType (
	typeID TINYINT,
    category VARCHAR(50)
);

CREATE TABLE ShortTermParkingType (
	typeID TINYINT,
    category VARCHAR(15)
);

CREATE TABLE FreeParkingType (
	typeID TINYINT,
	category VARCHAR(30)
);

CREATE TABLE HDBCarpark (
    carparkNo VARCHAR(5),
    address VARCHAR(255),
    xCoord FLOAT,
    yCoord FLOAT,
    carparkType TINYINT,
    parkingSystemType TINYINT,
    shortTermParking TINYINT,
    freeParking	TINYINT,
    nightParking CHAR(1),
    carparkDecks TINYINT,
    gantryHeight FLOAT,
    carparkBasement	CHAR(1),
    PRIMARY KEY (carparkNo)
);

CREATE TABLE CarparkWithinCentralArea (
    carparkNo VARCHAR(5),
    PRIMARY KEY (carparkNo)
);
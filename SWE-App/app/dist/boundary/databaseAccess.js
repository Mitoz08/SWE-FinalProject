import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
var TableNames_App;
(function (TableNames_App) {
    TableNames_App["UserID"] = "UserID";
    TableNames_App["UserInformation"] = "UserInformation";
    TableNames_App["UserPayment"] = "UserPayment";
    TableNames_App["OpenTickets"] = "OpenTickets";
    TableNames_App["ClosedTickets"] = "ClosedTickets";
    TableNames_App["UserClosedTickets"] = "UserClosedTickets";
})(TableNames_App || (TableNames_App = {}));
var ColumnNames_App;
(function (ColumnNames_App) {
    ColumnNames_App["userFirebaseID"] = "userFirebaseID";
    ColumnNames_App["firstName"] = "firstName";
    ColumnNames_App["lastName"] = "lastName";
    ColumnNames_App["userID"] = "userID";
    ColumnNames_App["userEmail"] = "userEmail";
    ColumnNames_App["userPhoneNo"] = "userPhoneNo";
    ColumnNames_App["customerID"] = "customerID";
    ColumnNames_App["ticketID"] = "ticketID";
    ColumnNames_App["parkingLotID"] = "parkingLotID";
    ColumnNames_App["licensePlate"] = "licensePlate";
    ColumnNames_App["ticketStartTime"] = "ticketStartTime";
    ColumnNames_App["ticketEndTime"] = "ticketEndTime";
    ColumnNames_App["actualEndTime"] = "actualEndTime";
})(ColumnNames_App || (ColumnNames_App = {}));
var TableNames_HDBInfo;
(function (TableNames_HDBInfo) {
    TableNames_HDBInfo["WithinCtrlArea"] = "CarparkWithinCentralArea";
    TableNames_HDBInfo["CarparkSystemType"] = "CarparkSystemType";
    TableNames_HDBInfo["CarparkType"] = "CarparkType";
    TableNames_HDBInfo["FreeParkingType"] = "FreeParkingType";
    TableNames_HDBInfo["ShortTermParkingType"] = "ShortTermParkingType";
    TableNames_HDBInfo["HDBCarpark"] = "HDBCarpark";
})(TableNames_HDBInfo || (TableNames_HDBInfo = {}));
var ColumnNames_HDBInfo;
(function (ColumnNames_HDBInfo) {
    ColumnNames_HDBInfo["typeID"] = "typeID";
    ColumnNames_HDBInfo["category"] = "category";
    ColumnNames_HDBInfo["carparkNo"] = "carparkNo";
    ColumnNames_HDBInfo["address"] = "address";
    ColumnNames_HDBInfo["xCoord"] = "xCoord";
    ColumnNames_HDBInfo["yCoord"] = "yCoord";
    ColumnNames_HDBInfo["cpType"] = "carparkType";
    ColumnNames_HDBInfo["parkingSysType"] = "parkingSystemType";
    ColumnNames_HDBInfo["stParking"] = "shortTermParking";
    ColumnNames_HDBInfo["freeP"] = "freeParking";
    ColumnNames_HDBInfo["nightP"] = "nightParking";
    ColumnNames_HDBInfo["cpDecks"] = "carparkDecks";
    ColumnNames_HDBInfo["gantryH"] = "gantryHeight";
    ColumnNames_HDBInfo["cpBasment"] = "carparkBasement";
})(ColumnNames_HDBInfo || (ColumnNames_HDBInfo = {}));
var Operator;
(function (Operator) {
    Operator["EqualTo"] = "=";
    Operator["MoreThan"] = ">";
    Operator["LessThan"] = "<";
    Operator["MTorEq"] = ">=";
    Operator["LTorEq"] = "<=";
    Operator["NotEql"] = "<>";
})(Operator || (Operator = {}));
var ConditionVariable;
(function (ConditionVariable) {
    ConditionVariable["operator"] = "operator";
    ConditionVariable["values"] = "values";
})(ConditionVariable || (ConditionVariable = {}));
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}).promise();
async function Create(table, data) {
    const variables = Object.keys(data).join(",");
    const values = Object.values(data);
    const parameter = values.map(() => "?").join(",");
    try {
        const [result] = await pool.execute(`
            INSERT INTO ${[table]} (${variables})
            VALUES (${parameter})
            `, values);
        return result;
    }
    catch (error) {
        return null;
    }
}
async function Read(table, data, by = "AND") {
    const conditionStatment = [];
    const values = [];
    try {
        var whereStatement = "";
        if (typeof data === "object") {
            for (const [column, conditions] of Object.entries(data)) {
                conditionStatment.push(`${column} ${[conditions.operator]} ?`);
                values.push(conditions.values);
            }
            whereStatement = conditionStatment.length ? `WHERE ${conditionStatment.join(` ${by} `)}` : "";
        }
        const [result] = await pool.execute(`
            SELECT * 
            FROM ${[table]}
            ${whereStatement} 
            `, values);
        return result;
    }
    catch (error) {
        return null;
    }
}
async function Update(table, data, by = "AND") {
    const variablesStatement = [];
    const conditionStatment = [];
    const values = [];
    var setStatement = "";
    var whereStatement = "";
    try {
        const setData = data.set;
        const whereData = data.where;
        for (const [column, value] of Object.entries(setData)) {
            variablesStatement.push(`${column} = ?`);
            values.push(value);
        }
        setStatement = `SET ${variablesStatement.join(",")}`;
        if (typeof whereData === "object") {
            for (const [column, conditions] of Object.entries(whereData)) {
                conditionStatment.push(`${column} ${[conditions.operator]} ?`);
                values.push(conditions.values);
            }
            whereStatement = conditionStatment.length ? `WHERE ${conditionStatment.join(` ${by} `)}` : "";
        }
        const [result] = await pool.execute(`
            UPDATE ${[table]}
            ${setStatement}
            ${whereStatement} 
            `, values);
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
async function Delete(table, data, by = "AND") {
    const conditionStatment = [];
    const values = [];
    try {
        var whereStatement = "";
        if (typeof data === "object") {
            for (const [column, conditions] of Object.entries(data)) {
                conditionStatment.push(`${column} ${[conditions.operator]} ?`);
                values.push(conditions.values);
            }
            whereStatement = conditionStatment.length ? `WHERE ${conditionStatment.join(` ${by} `)}` : "";
        }
        const [result] = await pool.execute(`
            DELETE 
            FROM ${[table]}
            ${whereStatement} 
            `, values);
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
function endDBConnection() {
    pool.end();
}
export { TableNames_App, ColumnNames_App, TableNames_HDBInfo, ColumnNames_HDBInfo, Operator, ConditionVariable, Create, Read, Update, Delete, endDBConnection };

import { Request, Response } from "express";
import { AddNewUser, DeleteUser, GetUserID, AddUserInfo, GetUserInfo, GetUserEmail, UpdateUserInfo, GetOpenTicketByTicketID, CreateOpenTicket, GetOpenTicketByUserID, CreateClosedTicket, GetClosedTicket, CreateUserClosedTicket, GetUserClosedTicket, GetCarparkAddress, GetRate } from "./databaseControl";
import { NewTicketNotification } from "./emailControl";
import { addOpenTicketToServer, getOpenTicketByTicketID, getOpenTicketByUserID } from "./serverControl";

export async function E_AddNewUser(req: Request, res:Response) : Promise<void> {
    const {userFirebaseID} = req.body;

    if (!userFirebaseID) {
        res.status(400).json({ message: "userFirebaseID is required." });
    }

    const request = await AddNewUser(userFirebaseID)

    if (request == null) res.status(500).json({message: "Failed to add new user."})
    else {
        res.status(201).json({
                    message: "User added sucessfully",
                    userID: request
        }) 
    }

}

export async function E_GetUserID(req: Request, res:Response) : Promise<void> {
    const {userFirebaseID} = req.query;

    if (!userFirebaseID) {
        res.status(400).json({ message: "userFirebaseID is required." });
    }

    const request = await GetUserID(userFirebaseID as string)
    if (request == null) res.status(500).json({message: "Failed to get user ID."})
    else {
        res.status(200).json({
                    message: "User ID sucessfully returned",
                    userID: request
        }) 
    }

}

export async function E_DeleteUser(req: Request, res:Response) : Promise<void> {
    const {userID} = req.body;

    if (!userID) {
        res.status(400).json({ message: "userID is required." });
    }

    const request = await DeleteUser(userID)
    if (request == null) res.status(500).json({message: "Failed to delete user ID."})
    else {
        res.status(200).json({
                    message: "User ID sucessfully deleted",
                    boolean: request
        }) 
    }

}

export async function E_AddUserInfo(req: Request, res:Response) : Promise<void> {
    const object = req.body;

    if (!object) {
        res.status(400).json({ message: "object is required." });
    }

    const request = await AddUserInfo(object)

    if (request == null) res.status(500).json({message: "Failed to add new user information."})
    else {
        res.status(201).json({
                    message: "User information added sucessfully",
                    userInfo: request
        }) 
    }

}

export async function E_GetUserInfo(req: Request, res:Response) : Promise<void> {
    const {userID} = req.query;

    if (!userID) {
        res.status(400).json({ message: "userID is required." });
    }

    const request = await GetUserInfo(Number(userID as String))

    if (request == null) res.status(500).json({message: "Failed to get user information."})
    else {
        res.status(200).json({
                    message: "User information sucessfully returned",
                    userInfo: request
        }) 
    }

}

export async function E_GetUserEmail(req: Request, res:Response) : Promise<void> {
    const {userID} = req.query;

    if (!userID) {
        res.status(400).json({ message: "userID is required." });
    }

    const request = await GetUserEmail(Number(userID as String))

    if (request == null) res.status(500).json({message: "Failed to get user email."})
    else {
        res.status(200).json({
                    message: "User email sucessfully returned",
                    userEmail: request
        }) 
    }

}

export async function E_UpdateUserInfo(req: Request, res:Response) : Promise<void> {
    const object = req.body;

    if (!object) {
        res.status(400).json({ message: "object is required." });
    }

    const request = await UpdateUserInfo(object)

    if (request == null) res.status(500).json({message: "Failed to get user email."})
    else {
        res.status(200).json({
                    message: "User email sucessfully returned",
                    boolean: request
        }) 
    }
}

export async function E_CreateOpenTicket(req: Request, res:Response) : Promise<void> {
    const object = req.body;

    if (!object) {
        res.status(400).json({ message: "object is required." });
    }

    const request = await CreateOpenTicket(object)

    if (request == null) res.status(500).json({message: "Failed to create open ticket."})
    else {
        res.status(201).json({
                    message: "Open ticket sucessfully created",
                    ticketID: request
        }) 

        await NewTicketNotification(request).then(() => addOpenTicketToServer(request))
    }
}

export async function E_GetOpenTicketByUserID(req: Request, res:Response) : Promise<void> {
    const {userID} = req.query;

    if (!userID) {
        res.status(400).json({ message: "userID is required." });
    }
    if (typeof userID === "string") {
        const request = getOpenTicketByUserID(Number(userID))
        if (request == null)  {
            res.status(200).json({
            message: "Open ticket does not exsist",
            openTicket: {} })      
        }
        else {
            res.status(200).json({
                        message: "Open ticket sucessfully returned",
                        openTicket: request
            }) 
        }
    } else {
        res.status(500).json({message: "Failed to get open ticket."})
    }
}

export async function E_GetOpenTicketByTicketID(req: Request, res:Response) : Promise<void> {
    const {ticketID} = req.query;

    if (!ticketID) {
        res.status(400).json({ message: "ticketID is required." });
    }
    if (typeof ticketID === "string") {
        
        const request = getOpenTicketByTicketID(Number(ticketID))

        if (request == null) res.status(500).json({message: "Failed to get open ticket."})
        else {
            res.status(200).json({
                        message: "Open ticket sucessfully returned",
                        openTicket: request
            }) 
        }
    } else {
        res.status(500).json({message: "Failed to get open ticket."})
    }
}

export async function E_UpdateOpenTicketEndTime(req: Request, res:Response) : Promise<void> {
    const object = req.body;

    if (!object) {
        res.status(400).json({ message: "object is required." });
    }

    const request = await GetOpenTicketByTicketID(object)

    if (request == null) res.status(500).json({message: "Failed to update open ticket."})
    else {
        res.status(200).json({
                    message: "Open ticket sucessfully updated",
                    boolean: request
        }) 
    }
}

export async function E_DeleteOpenTicket(req: Request, res:Response) : Promise<void> {
    const {ticketID} = req.body;

    if (!ticketID) {
        res.status(400).json({ message: "ticketID is required." });
    }

    const request = await GetOpenTicketByTicketID(ticketID)

    if (request == null) res.status(500).json({message: "Failed to delete open ticket."})
    else {
        res.status(200).json({
                    message: "Open ticket sucessfully deleted",
                    boolean: request
        }) 
    }
}

export async function E_CreateClosedTicket(req: Request, res:Response) : Promise<void> {
    const object = req.body;

    if (!object) {
        res.status(400).json({ message: "object is required." });
    }

    const request = await CreateClosedTicket(object)

    if (request == null) res.status(500).json({message: "Failed to create closed ticket."})
    else {
        res.status(201).json({
                    message: "Closed ticket sucessfully create",
                    boolean: request
        }) 
    }
}



export async function E_GetClosedTicket(req: Request, res:Response) : Promise<void> {
    const {ticketID} = req.query;

    if (!ticketID) {
        res.status(400).json({ message: "ticketID is required." });
    }

    const request = await GetClosedTicket(Number(ticketID as String))

    if (request == null) res.status(500).json({message: "Failed to get closed ticket."})
    else {
        res.status(200).json({
                    message: "Closed ticket sucessfully returned",
                    closedTicket: request
        }) 
    }
}

export async function E_CreateUserClosedTicket(req: Request, res:Response) : Promise<void> {
    const object = req.body;

    if (!object) {
        res.status(400).json({ message: "object is required." });
    }

    const request = await CreateUserClosedTicket(object)

    if (request == null) res.status(500).json({message: "Failed to create user closed ticket."})
    else {
        res.status(201).json({
                    message: "User closed ticket sucessfully created",
                    boolean: request
        }) 
    }
}

export async function E_GetUserClosedTicket(req: Request, res:Response) : Promise<void> {
    const {userID} = req.query;

    const request = await GetUserClosedTicket(Number(userID as String))

    if (request == null) res.status(500).json({message: "Failed to get user closed ticket."})
    else {
        res.status(200).json({
                    message: "User closed ticket sucessfully returned",
                    clostTicketArray: request
        }) 
    }
}

export async function E_GetCarparkAddress(req: Request, res:Response) : Promise<void> {
    const {carparkID} = req.query;

    const request = await GetCarparkAddress(carparkID as string)

    if (request == null) res.status(500).json({message: "Failed to get carpark address."})
    else {
        res.status(200).json({
                    message: "Carpark address sucessfully returned",
                    carparkAddress: request
        }) 
    }
}

export async function E_GetRate(req: Request, res:Response) : Promise<void> {
    const object = req.query;

    const request = await GetRate(object)

    if (request == null) res.status(500).json({message: "Failed to get carpark rate."})
    else {
        res.status(200).json({
                    message: "Carpark rate sucessfully returned",
                    rate: request
        }) 
    }
}

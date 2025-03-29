import Express, { Request, Response } from 'express';
import { E_AddNewUser, E_AddUserInfo, E_CreateClosedTicket, E_CreateOpenTicket, E_CreateUserClosedTicket, E_DeleteOpenTicket, E_DeleteUser, E_GetCarparkAddress, E_GetClosedTicket, E_GetOpenTicketByTicketID, E_GetOpenTicketByUserID, E_GetRate, E_GetUserClosedTicket, E_GetUserID, E_UpdateOpenTicketEndTime, E_UpdateUserInfo } from '../controller/userContoller';

const router = Express.Router();

router.post("/UserID", E_AddNewUser)

router.get("/UserID", E_GetUserID)

router.delete("/UserID", E_DeleteUser)

router.post("/UserInfo", E_AddUserInfo)

router.get("/UserInfo", E_GetUserID)

router.get("/UserInfo/Email", E_GetUserID)

router.put("/UserInfo", E_UpdateUserInfo)

router.post("/OpenTicket", E_CreateOpenTicket)

router.get("/OpenTicket/UserID", E_GetOpenTicketByUserID)

router.get("/OpenTicket/TicketID", E_GetOpenTicketByTicketID)

router.put("/OpenTicket", E_UpdateOpenTicketEndTime)

router.delete("/OpenTicket", E_DeleteOpenTicket)

router.post("/ClosedTicket", E_CreateClosedTicket)

router.get("/ClosedTicket", E_GetClosedTicket)

router.post("/UserClosedTicket", E_CreateUserClosedTicket)

router.get("/UserClosedTicket", E_GetUserClosedTicket)

router.get("/CarparkAddress", E_GetCarparkAddress)

router.get("/Rate", E_GetRate)

export { router as userRouter };

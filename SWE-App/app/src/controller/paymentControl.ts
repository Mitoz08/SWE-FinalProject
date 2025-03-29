import { CreateTicketDetails } from "../entity/paymentTypes";
import { mainEntity } from "../entity/mainEntity";

export async function ProcessPayment(createTicketDetails: CreateTicketDetails) {
    const ticketStartTime =  new Date()
    const ticketEndTime = new Date(new Date().setMinutes(ticketStartTime.getMinutes()+createTicketDetails.duration_hour*60 + createTicketDetails.duration_min))
    // Get UserID
    const parameter = {
        parkingLotID: createTicketDetails.carparkNo,
        licensePlate: createTicketDetails.licensePlate,
        ticketStartTime: ticketStartTime,
        ticketEndTime: ticketEndTime,
        userID: 1
    }

    try{
        var response = await fetch(`http://localhost:3000/OpenTicket`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(parameter)

        })
        const {ticketID} = await response.json()

        if (!ticketID) throw new Error("Ticket not create")
        
        var response = await fetch(`http://localhost:3000/OpenTicket/TicketID?ticketID=${ticketID}`, {method: "GET"})
        
        const {openTicket} = await response.json() 

        mainEntity.setTicket(openTicket)
        
    } catch (error) {
        console.log(error)
        return false;
    }
    return true;
}

import { mainEntity } from "../entity/mainEntity";
export async function ProcessPayment(createTicketDetails) {
    const ticketStartTime = new Date();
    const ticketEndTime = new Date(new Date().setMinutes(ticketStartTime.getMinutes() + createTicketDetails.duration_hour * 60 + createTicketDetails.duration_min));
    const userID = mainEntity.getUserID();
    const parameter = {
        parkingLotID: createTicketDetails.carparkNo,
        licensePlate: createTicketDetails.licensePlate,
        ticketStartTime: ticketStartTime,
        ticketEndTime: ticketEndTime,
        userID: userID
    };
    console.log(parameter);
    try {
        const response = await fetch(`http://localhost:3000/OpenTicket`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameter)
        });
        const { ticketID } = await response.json();
        console.log(ticketID);
        if (!ticketID)
            throw new Error("Ticket not created");
        const ticketResponse = await fetch(`http://localhost:3000/OpenTicket/TicketID?ticketID=${ticketID}`, { method: "GET" });
        const { openTicket } = await ticketResponse.json();
        console.log(openTicket);
        mainEntity.setTicket(openTicket);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

import { mainEntity } from "../entity/mainEntity";


// MC1
export function InitaliseUser(UserID:number) {
    // ME1 - Add user ID/ information into the entity
    
    try {
        fetch(`http://localhost:3000/OpenTicket/UserID?userID=${UserID}`,{
            method: "GET"
        }).then(res => res.json()).then((object) => {
            if (object.openTicket != null) mainEntity.setTicket(object.openTicket)
                console.log(object.openTicketss)
        })
    } catch (error) {
        console.error("Fail to load user open ticket")
    }
}
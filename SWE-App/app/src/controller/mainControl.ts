import { mainEntity } from "../entity/mainEntity";


// MC1
export function InitialiseUser(UserID:number) {
    // ME1 - Add user ID/ information into the entity
    
    try {
        fetch(`http://localhost:3000/UserInfo?userID=${UserID}`, {
            method: "GET"
        }).then(res => res.json()).then((object)=> {
            console.log(object)
            if (object.userInfo != null) mainEntity.setUserInformation(object.userInfo)
        })

        fetch(`http://localhost:3000/OpenTicket/UserID?userID=${UserID}`,{
            method: "GET"
        }).then(res => res.json()).then((object) => {
            console.log(object)
            if (object.openTicket != null) mainEntity.setTicket(object.openTicket)
                console.log(object.openTicketss)
        })
    } catch (error) {
        console.error("Fail to load user open ticket")
    }
}
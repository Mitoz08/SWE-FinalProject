import { mainEntity } from "../entity/mainEntity";
export function InitialiseUser(UserID) {
    try {
        fetch(`http://localhost:3000/OpenTicket/UserID?userID=${UserID}`, {
            method: "GET"
        }).then(res => res.json()).then((object) => {
            if (object.openTicket != null)
                mainEntity.setTicket(object.openTicket);
        });
    }
    catch (error) {
        console.error("Fail to load user open ticket");
    }
}

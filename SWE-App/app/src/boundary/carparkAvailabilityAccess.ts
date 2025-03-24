import { where } from 'firebase/firestore';
import carparkData from '../../HDBCarparkInformation.json' with { type: 'json' };
// const carparkData: Carpark[] = carparkDataImport.default;

const API_URL = "https://api.data.gov.sg/v1/transport/carpark-availability";

interface Carpark {
    car_park_no: string;
    address: string;
    x_coord: number;
    y_coord: number;
    car_park_type: string;
    type_of_parking_system: string;
    short_term_parking: string;
    free_parking: string;
    night_parking: string;
    car_park_decks: number;
    gantry_height: number;
    car_park_basement: string;
}
interface info {
    total_lot:string,
    lot_type:string,
    lots_available:string
} 
interface HDBCarpark {
    carpark_info: info[],
    carpark_number: string,
    update_datetime: string
  }

const addressMap: Record<string,string> = {};
carparkData.forEach((item) => {
    addressMap[item.car_park_no.trim()] = item.address.trim();
})

// CC1 Return Array of type HDBCarpark filtered by searchQuery and selectedCarparkType
export default function GetCarparkAvailability( searchQuery:string, selectedCarparkType: "C"|"M"){
    
    const filteredcarparks = fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        return ((data.items[0].carpark_data) as HDBCarpark[]).filter(carpark => {
            const carparkAddress = addressMap[carpark.carpark_number.trim()];
            return (
                carparkAddress && carparkAddress !== 'N/A' &&
                carpark.carpark_number.toLowerCase().includes(searchQuery.toLowerCase()) &&
                carpark.carpark_info.some(info => info.lot_type === selectedCarparkType)
            )
        });
    })
    return filteredcarparks;
}


console.log(await GetCarparkAvailability("Y","C"))
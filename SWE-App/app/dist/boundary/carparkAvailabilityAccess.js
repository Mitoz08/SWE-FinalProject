import carparkData from '../../dist/HDBCarparkInformation.json' with { type: 'json' };
const API_URL = "https://api.data.gov.sg/v1/transport/carpark-availability";
const addressMap = {};
carparkData.forEach((item) => {
    addressMap[item.car_park_no.trim()] = item.address.trim();
});
function determineCarparkType(vehicleDetails) {
    return vehicleDetails.toLowerCase().includes("motorcycle") ? "M" : "C";
}
export default function GetCarparkAvailability(searchQuery, vehicleDetails) {
    const selectedCarparkType = determineCarparkType(vehicleDetails);
    const filteredcarparks = fetch(API_URL)
        .then(response => response.json())
        .then(data => {
        return (data.items[0].carpark_data).filter(carpark => {
            const carparkAddress = addressMap[carpark.carpark_number.trim()];
            return (carparkAddress && carparkAddress !== 'N/A' &&
                carpark.carpark_number.toLowerCase().includes(searchQuery.toLowerCase()) &&
                carpark.carpark_info.some(info => info.lot_type === selectedCarparkType));
        });
    });
    return filteredcarparks;
}
console.log(await GetCarparkAvailability("Y", "motorcycle"));

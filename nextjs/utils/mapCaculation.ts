//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
export function calcCrow(lat1:number, lon1 : number, lat2 : number , lon2 : number) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
export function toRad(Value : number) 
{
    return Value * Math.PI / 180;
}

export function caculateDeliPricePerDistance(distance : number) {
  return distance * 1000
}

export function findCenter(markers:any) {
  let lat = 0;
  let lng = 0;
  
  for(let i = 0; i < markers.length; ++i) {
      lat += markers[i].lat;
      lng += markers[i].lng;
  }

  lat /= markers.length;
  lng /= markers.length;

  return {lat: lat, lng: lng}
}
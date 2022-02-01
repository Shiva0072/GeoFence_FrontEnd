import { getDistance } from "geolib";
const getDist = (e, location) => {
  // console.log("here");
  let a1 = e.coordinate.latitude;
  let a2 = e.coordinate.longitude;
  let b1 = location.coords.latitude;
  let b2 = location.coords.longitude;

  let dist = getDistance(
    { latitude: a1, longitude: a2 },
    { latitude: b1, longitude: b2 }
  );
  return dist;
};

export default getDist;

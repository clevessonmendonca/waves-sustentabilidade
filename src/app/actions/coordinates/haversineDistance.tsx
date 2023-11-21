import { toRadians } from "./toRadians";

export function haversineDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): string {
  const earthRadius = 6371; // Earth's radius in kilometers
  const deltaLatitude = toRadians(latitude2 - latitude1);
  const deltaLongitude = toRadians(longitude2 - longitude1);
  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(toRadians(latitude1)) *
      Math.cos(toRadians(latitude2)) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = (earthRadius * c).toFixed(2);

  return distance;
}
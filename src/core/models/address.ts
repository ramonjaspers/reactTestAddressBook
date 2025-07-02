
export default function transformAddress(data: any): any {
  const { firstName, lastName, city, houseNumber, lat, lon, postcode, street } =
    data as any[any];

  return {
    city: city || "",
    firstName: firstName || "",
    houseNumber: houseNumber || "",
    id: `${lat || Date.now()}_${lon || Math.random()}`,
    lastName: lastName || "",
    postcode: postcode || "",
    street: street || "",
  } as any[any];
} 
export default function transformAddress(data: any, houseNumber?: string): any {
  const { firstName, lastName, city, lat, lon, postcode, street } = data as any;

  return {
    city: city || "",
    firstName: firstName || "",
    houseNumber: houseNumber || data.houseNumber || "",
    id: `${lat || Date.now()}_${lon || Math.random()}`,
    lastName: lastName || "",
    postcode: postcode || "",
    street: street || "",
  } as any;
}
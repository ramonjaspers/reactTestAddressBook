import { AddressType } from "components/Address/Address";
import { z } from "zod";

export const AddressApiResponseSchema = z.object({
  houseNumber: z.string(),
  details: z.array(z.object({
    street: z.string(),
    city: z.string(),
    municipality: z.string(),
    province: z.string(),
    postcode: z.string(),
    pnum: z.string(),
    pchar: z.string(),
    rd_x: z.string(),
    rd_y: z.string(),
    lat: z.string(),
    lon: z.string(),
  })),
  status: z.string(),
}).transform((data) => {
  return data.details.map((detail) => {
    const uniqueId = `${data.houseNumber}_${detail.street}_${detail.postcode}_${detail.city}`;
    
    return {
      city: detail.city || "",
      firstName: "",
      houseNumber: data.houseNumber,
      id: uniqueId,
      lastName: "",
      postcode: detail.postcode || "",
      street: detail.street || "",
    } satisfies AddressType;
  });
});

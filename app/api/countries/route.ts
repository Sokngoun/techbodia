import { CountryType } from "@/lib/types/Country";

export async function getAllCountries() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all?fields=name,flags,altSpellings,cca2,cca3,idd`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
  
      const data = await res.json();
      return data as CountryType[];
    } catch (err) {
      console.error("There was a problem with the fetch operation:", err);
      throw err;
    }
  }
  
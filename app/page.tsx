import Image from "next/image";
import Text from "@/components/Text";
import { getAllCountries } from "./api/countries/route";
import CountryList from "@/components/CountryList";

export default async function Home() {
  // const country = await getCountryByName("Nigeria");
  const countryList = await getAllCountries();

  return (
    <main>
      <Text title="Welcome to the Countries App" />
      <CountryList countryList={countryList} />
    </main>
  );
}

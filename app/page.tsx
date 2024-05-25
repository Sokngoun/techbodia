import Image from "next/image";
import Text from "@/components/Text";
import CountryCard from "@/components/CountryCard";
import { getCountryByName } from "./api/countries/name/route";
import { getAllCountries } from "./api/countries/route";
export default async function Home() {
  // const country = await getCountryByName("Nigeria");
  const res = await getAllCountries();
  const countries = res.map(country => {
    const nativeNames = Object.values(country.name.nativeName).map(native => ({
      official: native.official,
      common: native.common,
    }));
  
    return {
      common: country.name.common,
      official: country.name.official,
      nativeNames: nativeNames,
      ... country
    };
  });
  return (
    <main>
      <Text title="Welcome to the Countries App" />
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
          {countries!.map((country, index) => (
            <div key={index}>
              <CountryCard cca2={country.cca2} cca3={country.cca3} flag={country.flags.png} country_name={country.name.official} native_name={country.nativeNames} altSpellings={country.altSpellings} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

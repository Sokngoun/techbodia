import { CountryIddType } from "./CountryIdd"
import { CountryNameType } from "./CountryName"
import { FlagsType } from "./Flags"

export type CountryType = { 
    flags: FlagsType
    name: CountryNameType,
    altSpellings: string[],
    idd: CountryIddType,
    cca2: string,
    cca3: string
}
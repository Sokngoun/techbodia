import { CountryNativeNameType } from "./CountryNativeName"

export type CountryNameType = {
    common: string,
    official: string,   
    nativeName: CountryNativeNameType
}
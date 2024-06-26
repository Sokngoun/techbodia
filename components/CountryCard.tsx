"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { CountryNativeNameType } from "@/lib/types/CountryNativeName";

type CountryCardProps = {
  flag?: string;
  country_name?: string;
  cca2?: string;
  cca3?: string;
  native_name?: {
    official: string;
    common: string;
  }[];
  altSpellings?: string[];
  idd?: string;
};
export default function CountryCard({
  flag,
  country_name,
  cca2,
  cca3,
  native_name,
  altSpellings,
  idd,
}: CountryCardProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:cursor-pointer hover:scale-105 transition ease-in-out duration-200 hover:shadow-lg">
            <CardHeader className="p-0 border-b-[2px] border-b-gray-100">
              <Image
              quality={100}
                src={flag!}
                width={400}
                height={400}
                alt=""
                className="rounded-t-md h-[100px] w-full object-cover"
              />
            </CardHeader>
            <CardContent className="p-1 space-y-2">
              <CardTitle className="text-sm truncate font-medium">
                {country_name}
              </CardTitle>
              {/* Native Name */}
              <div className="flex flex-col">
                <CardDescription className="text-xs truncate font-medium">
                  Native Name:
                </CardDescription>
                {native_name!.slice(0, 1).map((native, index) => (
                  <div className="flex flex-col truncate">
                    <CardDescription className="text-xs truncate">
                      official: {native.official}
                    </CardDescription>
                    <CardDescription className="text-xs truncate">
                      common: {native.common}
                    </CardDescription>
                  </div>
                ))}
              </div>
              {/* Alt Spellings */}
              <div>
                <CardDescription className="text-xs truncate font-medium">
                  Alt Spellings:
                </CardDescription>
                <CardDescription className="text-xs truncate">
                  {altSpellings}
                </CardDescription>
              </div>

              {/* cca2 cca3 */}
              <div className="grid grid-cols-2">
                <CardDescription className="text-xs truncate">
                  <span className="font-medium">cca2:</span> {cca2}
                </CardDescription>
                <CardDescription className="text-xs truncate">
                  <span className="font-medium">cca3:</span> {cca3}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] h-[400px]">
          <Card className="">
            <CardHeader className="p-0 border-b-[2px] border-b-gray-100">
              <Image
              quality={100}
                src={flag!}
                width={400}
                height={400}
                alt=""
                className="rounded-t-md h-[200px] w-full object-cover"
              />
            </CardHeader>
            <CardContent className="p-1 space-y-2">
              <CardTitle className="text-sm truncate font-medium">
                {country_name}
              </CardTitle>
              {/* Native Name */}
              <div className="flex flex-col">
                <CardDescription className="text-xs truncate font-medium">
                  Native Name:
                </CardDescription>
                {native_name!.slice(0, 1).map((native, index) => (
                  <div className="flex flex-col truncate">
                    <CardDescription className="text-xs truncate">
                      official: {native.official}
                    </CardDescription>
                    <CardDescription className="text-xs truncate">
                      common: {native.common}
                    </CardDescription>
                  </div>
                ))}
              </div>
              {/* Alt Spellings */}
              <div>
                <CardDescription className="text-xs truncate font-medium">
                  Alt Spellings:
                </CardDescription>
                <CardDescription className="text-xs truncate">
                  {altSpellings}
                </CardDescription>
              </div>

              {/* cca2 cca3 */}
              <div className="grid grid-cols-2">
                <CardDescription className="text-xs truncate">
                  <span className="font-medium">cca2:</span> {cca2}
                </CardDescription>
                <CardDescription className="text-xs truncate">
                  <span className="font-medium">cca3:</span> {cca3}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}

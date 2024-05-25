"use client";
import CountryCard from "./CountryCard";
import { CountryType } from "@/lib/types/Country";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

type CountryListProps = {
  countryList: CountryType[];
};

export default function CountryList({ countryList }: CountryListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const countries = countryList.map((country) => {
    const nativeNames = Object.values(country.name.nativeName).map(
      (native) => ({
        official: native.official,
        common: native.common,
      })
    );

    return {
      common: country.name.common,
      official: country.name.official,
      nativeNames: nativeNames,
      ...country,
    };
  });

  const currentItems = countries.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
        {currentItems.map((country, index) => (
          <div key={index}>
            <CountryCard
              cca2={country.cca2}
              cca3={country.cca3}
              flag={country.flags.png}
              country_name={country.name.official}
              native_name={country.nativeNames}
              altSpellings={country.altSpellings}
            />
          </div>
        ))}
      </div>
      <PaginationSection
        totalItems={countries.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

type PaginationSectionProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationSectionProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5; // Maximum number of page links to display

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousPage}
            className="hover:cursor-pointer"
          />
        </PaginationItem>
        {visiblePages.map((page) => (
          <PaginationItem
            key={page}
            className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
            onClick={() => setCurrentPage(page)}
          >
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            className="hover:cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

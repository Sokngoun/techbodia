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
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type CountryListProps = {
  countryList: CountryType[];
};

export default function CountryList({ countryList }: CountryListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState<"asc" | "desc">("asc");
  const [filteredCountries, setFilteredCountries] =
    useState<CountryType[]>(countryList);

  useEffect(() => {
    let filtered =
      search === ""
        ? countryList
        : countryList.filter((country) =>
            country.name.official.toLowerCase().includes(search.toLowerCase())
          );
    console.log(sorted);
    filtered = filtered.sort((a, b) => {
      if (sorted === "asc") {
        return a.name.official.localeCompare(b.name.official);
      } else {
        return b.name.official.localeCompare(a.name.official);
      }
    });
    setFilteredCountries(filtered);
  }, [search, countryList, sorted]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const countryItems = filteredCountries.slice(firstItemIndex, lastItemIndex);

  const countries = countryItems.map((country) => {
    const nativeNames = Object.values(country.name.nativeName || {}).map(
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

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Input
          placeholder="Search"
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
        <Sort sorted={sorted} setSorted={setSorted} />
      </div>
      {countries.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10 mb-6">
            {countries.map((country, index) => (
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
            totalItems={filteredCountries.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <div className="text-center">No countries found</div>
      )}
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
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
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
type SortProps = {
  sorted: string;
  setSorted: (value: "asc" | "desc") => void;
};
function Sort({ sorted, setSorted }: SortProps) {
  const sort = ["asc", "desc"];
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex justify-between md:justify-start gap-2 items-center">
      <span>Sort By Name: </span>
      <Select
        open={open}
        onOpenChange={setOpen}
        onValueChange={(value) => setSorted(value as "asc" | "desc")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={sorted.toUpperCase()} />
        </SelectTrigger>
        <SelectContent>
          {sort.map((item, index) => (
            <SelectItem value={item} key={index}>
              {item.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

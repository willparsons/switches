"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch, SwitchTypes } from "@/lib/types";

// TODO: source this properly
const Brands = ["Gateron", "Durock"] as const;
type BrandsT = (typeof Brands)[number];

function populateRecord(searchParams: ReturnType<typeof useSearchParams>): Record<BrandsT, boolean> {
    const brandsInParams = searchParams.getAll("brands");

    return Object.fromEntries(Brands.map((brand) => [brand, brandsInParams.includes(brand)])) as Record<
        BrandsT,
        boolean
    >;
}

function populateTypesRecord(searchParams: ReturnType<typeof useSearchParams>): Record<Switch["Type"], boolean> {
    const typesInParams = searchParams.getAll("types");

    return Object.fromEntries(SwitchTypes.map((type) => [type, typesInParams.includes(type)])) as Record<
        Switch["Type"],
        boolean
    >;
}

export function FilterBar() {
    // TODO: This has no influence
    const [sortBy, setSortBy] = useState("name");

    const [showFilters, setShowFilters] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [brandChecked, setBrandsChecked] = useState(populateRecord(searchParams));
    const [typesChecked, setTypesChecked] = useState(populateTypesRecord(searchParams));

    const params = new URLSearchParams(searchParams);

    const toggleBrandChecked = (brand: BrandsT) => {
        setBrandsChecked((prev) => ({
            ...prev,
            [brand]: !prev[brand],
        }));
    };

    const toggleTypeChecked = (type: Switch["Type"]) => {
        setTypesChecked((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleBrandChange = (brand: BrandsT, checked: boolean) => {
        toggleBrandChecked(brand);

        if (checked) {
            params.append("brands", brand);
        } else {
            params.delete("brands", brand);
        }

        replace(`${pathname}?${params.toString()}`);
    };

    const handleTypeChange = (type: Switch["Type"], checked: boolean) => {
        toggleTypeChecked(type);

        if (checked) {
            params.append("types", type);
        } else {
            params.delete("types", type);
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="lg:w-64 space-y-6">
            <div className="flex items-center justify-between lg:hidden">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? "Hide" : "Show"}
                </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                <div>
                    <h3 className="font-semibold mb-3">Sort By</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name (A-Z)</SelectItem>
                            <SelectItem value="name-rev">Name (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Accordion type="multiple" defaultValue={["brands", "types"]}>
                    <AccordionItem value="brands">
                        <AccordionTrigger>Brands</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {Brands.map((brand) => (
                                    <div key={brand} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`brand-${brand}`}
                                            checked={brandChecked[brand]}
                                            onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                                        />
                                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                                            {brand}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="types">
                        <AccordionTrigger>Switch Types</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-2">
                                {SwitchTypes.map((type) => (
                                    <div key={type} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`type-${type}`}
                                            checked={typesChecked[type]}
                                            onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                                        />
                                        <Label htmlFor={`type-${type}`} className="text-sm">
                                            {type}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}

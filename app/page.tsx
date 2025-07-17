"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Switch } from "@/lib/types";
import { SwitchCard } from "@/components/SwitchCard";
import { NavBar } from "@/components/NavBar";

function getBrand(sw: Switch) {
    return sw["Switch Name"].split(" ")[0];
}

export default function Home() {
    const supabase = createClient();

    const [searchTerm, setSearchTerm] = useState("");
    // TODO: This has no influence
    const [sortBy, setSortBy] = useState("name");
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [switches, setSwitches] = useState<Switch[]>([]);

    const brands = Array.from(new Set(switches.map((s) => getBrand(s))));
    const types = Array.from(new Set(switches.map((s) => s.Type)));

    useEffect(() => {
        async function init() {
            const { data: switches } = await supabase.from("switches").select().limit(5);

            setSwitches(switches ?? []);
        }

        init();
    }, [supabase]);

    const filteredSwitches = switches.filter(
        (sw) =>
            sw["Switch Name"].toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedBrands.length === 0 || selectedBrands.includes(getBrand(sw))) &&
            (selectedTypes.length === 0 || selectedTypes.includes(sw.Type)),
    );

    const handleBrandChange = (brand: string, checked: boolean) => {
        if (checked) {
            setSelectedBrands([...selectedBrands, brand]);
        } else {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        }
    };

    const handleTypeChange = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, type]);
        } else {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <NavBar searchTerm={searchTerm} onChangeSearchTerm={(st) => setSearchTerm(st)} />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
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
                                            {brands.map((brand) => (
                                                <div key={brand} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`brand-${brand}`}
                                                        checked={selectedBrands.includes(brand)}
                                                        onCheckedChange={(checked) =>
                                                            handleBrandChange(brand, checked as boolean)
                                                        }
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
                                            {types.map((type) => (
                                                <div key={type} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`type-${type}`}
                                                        checked={selectedTypes.includes(type)}
                                                        onCheckedChange={(checked) =>
                                                            handleTypeChange(type, checked as boolean)
                                                        }
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

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold">Mechanical Switches</h1>
                            <p className="text-muted-foreground">{filteredSwitches.length} switches found</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredSwitches.map((sw) => (
                                <SwitchCard key={sw.id} sw={sw} />
                            ))}
                        </div>

                        {filteredSwitches.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    No switches found matching your criteria.
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-4 bg-transparent"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedBrands([]);
                                        setSelectedTypes([]);
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

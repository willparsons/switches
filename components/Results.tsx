import { createClient } from "@/lib/supabase/server";
import { SwitchCard } from "./SwitchCard";
import { Button } from "./ui/button";
import { Switch } from "@/lib/types";
import { Suspense } from "react";

export type Filters = {
    brands?: string[];
    types?: Switch["Type"][];
};

export type ResultsProps = {
    filters?: Filters;
    query?: string;
    limit?: number;
};

async function buildQuery({ filters, query, limit }: ResultsProps) {
    const supabase = await createClient();

    let f = supabase.from("switches").select();

    if (filters?.brands && filters.brands.length !== 0) {
        const queries = filters.brands.map((br) => `Switch Name.ilike.${br}%`);
        f = f.or(queries.join(","));
    }

    if (filters?.types && filters.types.length !== 0) {
        f = f.in("Type", filters.types);
    }

    if (query) {
        f = f.ilike("Switch Name", `%${query}%`);
    }

    if (limit) {
        f = f.limit(limit);
    }

    return f;
}

export async function Results({ filters, query, limit = 5 }: ResultsProps) {
    const { data } = await buildQuery({ filters, query, limit });

    const switches = data ?? [];

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Results</h1>
                <p className="text-muted-foreground">{switches.length} switches found</p>
            </div>

            <Suspense fallback={<p>Loading...</p>}>
                {switches.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No switches found matching your criteria.</p>
                        <Button variant="outline" className="mt-4 bg-transparent">
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {switches?.map((sw) => (
                            <SwitchCard key={sw.id} sw={sw} />
                        ))}
                    </div>
                )}
            </Suspense>
        </div>
    );
}

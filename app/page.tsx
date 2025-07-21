import { NavBar } from "@/components/NavBar";
import { Results } from "@/components/Results";
import { FilterBar } from "@/components/FilterBar";
import { Suspense } from "react";
import { Switch } from "@/lib/types";

type SearchParams = {
    query?: string;
    brands?: string | string[];
    types?: Switch["Type"][] | Switch["Type"];
};

function forceArray<T extends string>(types: T | T[] | undefined): T[] {
    if (!types) {
        return [];
    }

    if (typeof types === "string") {
        return [types];
    }

    return types;
}

export default async function Home(props: { searchParams?: Promise<SearchParams> }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query;

    const types = forceArray<Switch["Type"]>(searchParams?.types);
    const brands = forceArray<string>(searchParams?.brands);

    return (
        <div className="min-h-screen bg-background">
            <NavBar />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <FilterBar />

                    <Suspense key={query} fallback={<p>Loading...</p>}>
                        <Results query={query} filters={{ types, brands }} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

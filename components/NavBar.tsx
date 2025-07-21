"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function NavBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(st: string) {
        const params = new URLSearchParams(searchParams);
        if (st) {
            params.set("query", st);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-2xl font-bold">
                            Switches
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/" className="font-medium">
                                Catalogue
                            </Link>
                            <p className="text-muted-foreground">Brands</p>
                            <p className="text-muted-foreground">Guides</p>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search switches..."
                                defaultValue={searchParams.get("query")?.toString()}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="mt-4 md:hidden">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search switches..."
                            defaultValue={searchParams.get("query")?.toString()}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

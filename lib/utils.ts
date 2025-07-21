import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Switch } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// TODO: I might eventually update the data to separate name from brand
export function getBrand(sw: Switch) {
    return sw["Switch Name"].split(" ")[0];
}

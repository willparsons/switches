import { type Database, Constants } from "@/database.types";

export type Switch = Database["public"]["Tables"]["switches"]["Row"];

export const Types = Constants.public.Enums.Type;
export const TypesNoUnknown = Types.filter((t) => t !== "Unknown");

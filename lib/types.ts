import { type Database, Constants } from "@/database.types";

export type Switch = Database["public"]["Tables"]["switches"]["Row"];

export const SwitchTypes = Constants.public.Enums.Type;
export const SwitchTypesNoUnknown = SwitchTypes.filter((t) => t !== "Unknown");

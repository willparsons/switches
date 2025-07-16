import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import type { Database } from "@/database.types";

type Switch = Database["public"]["Tables"]["switches"]["Row"];

export type SwitchCardProps = {
    name: Switch["Switch Name"];
    type: Switch["Type"];
    actuationForce: Switch["Act. Weight"];
    travelDistance: Switch["Total Travel Dist."];
};

export function SwitchCard({ name, type, actuationForce, travelDistance }: SwitchCardProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <Image
                    src="https://preview-keyboard-switch-catalogue-kzmk05fydn8xdaqqzjp0.vusercontent.net/placeholder.svg"
                    width={0}
                    height={0}
                    className="w-full h-[250px] object-cover rounded-xl mb-4"
                    alt="the switch"
                />

                <div className="flex flex-row justify-between">
                    <CardTitle>{name}</CardTitle>
                    <Badge variant="default">{type}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-between mt-4">
                    <p className="font-bold">
                        Force: <span className="font-normal">{actuationForce}</span>
                    </p>
                    <p className="font-bold">
                        Travel: <span className="font-normal">{travelDistance}</span>
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Details
                </Button>
            </CardFooter>
        </Card>
    );
}

import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import { Switch } from "@/lib/types";

export type SwitchCardProps = {
    sw: Switch;
};

function getTypeColor(type: Switch["Type"]) {
    switch (type) {
        case "Linear":
            return "bg-red-100 text-red-800";
        case "Tactile":
            return "bg-blue-100 text-blue-800";
        case "Clicky":
            return "bg-green-100 text-green-800";
        case "Hall Effect":
            return "bg-purple-100 text-purple-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

export function SwitchCard({ sw }: SwitchCardProps) {
    return (
        <Card>
            <CardHeader>
                <Image
                    src="https://preview-keyboard-switch-catalogue-kzmk05fydn8xdaqqzjp0.vusercontent.net/placeholder.svg"
                    width={0}
                    height={0}
                    className="w-full h-[250px] object-cover rounded-xl mb-4"
                    alt="the switch"
                />

                <div className="flex flex-row justify-between">
                    <CardTitle>{sw["Switch Name"]}</CardTitle>
                    <Badge variant="default" className={getTypeColor(sw["Type"])}>
                        {sw["Type"]}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-between mt-4">
                    <p className="font-bold">
                        Force: <span className="font-normal">{sw["Act. Weight"]}</span>
                    </p>
                    <p className="font-bold">
                        Travel: <span className="font-normal">{sw["Total Travel Dist."]}</span>
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

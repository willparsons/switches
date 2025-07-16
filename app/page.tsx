import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SwitchCard } from "@/components/SwitchCard";

export default async function Home() {
    const supabase = await createClient();
    const { data: switches } = await supabase.from("switches").select().limit(5);

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 w-full flex flex-col justify-between">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                        <div className="flex gap-5 items-center font-semibold">
                            <Link href={"/"}>Switches</Link>
                        </div>
                        <AuthButton />
                    </div>
                </nav>

                <div className="p-6 w-full flex flex-row flex-wrap gap-4">
                    {switches!.map((sw) => (
                        <SwitchCard
                            key={sw.id}
                            name={sw["Switch Name"]}
                            type={sw.Type}
                            actuationForce={sw["Act. Weight"]}
                            travelDistance={sw["Total Travel Dist."]}
                        />
                    ))}
                </div>

                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                    <p>
                        Powered by{" "}
                        <a
                            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                            target="_blank"
                            className="font-bold hover:underline"
                            rel="noreferrer"
                        >
                            Supabase
                        </a>
                    </p>
                    <ThemeSwitcher />
                </footer>
            </div>
        </main>
    );
}

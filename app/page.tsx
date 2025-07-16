import { DeployButton } from "@/components/deploy-button";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
    const supabase = await createClient();
    const { data: switches } = await supabase.from("switches").select().limit(20);

    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                        <div className="flex gap-5 items-center font-semibold">
                            <Link href={"/"}>Next.js Supabase Starter</Link>
                            <div className="flex items-center gap-2">
                                <DeployButton />
                            </div>
                        </div>
                        <AuthButton />
                    </div>
                </nav>
                <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
                    <main className="max-h-96 overflow-scroll border border-white rounded-xl p-4">
                        <pre>{JSON.stringify(switches, null, 2)}</pre>
                    </main>
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

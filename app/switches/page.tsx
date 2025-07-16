import { createClient } from "@/lib/supabase/server";

export default async function Switches() {
  const supabase = await createClient();
  const { data: switches } = await supabase.from("switches").select().limit(20);

  return <pre>{JSON.stringify(switches, null, 2)}</pre>;
}

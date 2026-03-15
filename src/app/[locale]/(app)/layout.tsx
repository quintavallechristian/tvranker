import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SidebarNav } from "@/components/SidebarNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex h-screen bg-bg-primary">
      <SidebarNav
        username={profile?.username ?? "user"}
        avatarUrl={profile?.avatar_url ?? null}
      />
      <main className="flex-1 overflow-y-auto pt-12 md:pt-0">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

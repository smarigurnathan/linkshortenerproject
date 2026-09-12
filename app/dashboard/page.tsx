import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight text-white">Link Shortener</div>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton>
                <Button variant="outline" size="sm" className="rounded-full border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800">
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button size="sm" className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200">
                  Sign up
                </Button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton
                appearance={{
                  variables: {
                    colorPrimary: "#a78bfa",
                    colorBackground: "#111114",
                    colorForeground: "#f4f4f5",
                    colorMutedForeground: "#a1a1aa",
                    colorNeutral: "#3f3f46",
                    borderRadius: "0.75rem",
                  },
                  elements: {
                    userButtonPopoverCard: "border border-white/10 bg-[#111114] shadow-2xl shadow-black/40",
                    userButtonPopoverActionButton: "text-zinc-200 hover:bg-white/5",
                    userButtonPopoverActionButtonText: "text-zinc-200",
                    userButtonPopoverFooter: "border-t border-white/10",
                  },
                }}
              />
            </Show>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
      </main>
    </div>
  );
}

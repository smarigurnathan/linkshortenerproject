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
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight">Link Shortener</div>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton>
                <Button variant="outline" size="sm" className="rounded-full border-zinc-300 text-zinc-900 hover:bg-zinc-100">
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button size="sm" className="rounded-full bg-zinc-900 text-white hover:bg-zinc-700">
                  Sign up
                </Button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Dashboard</h1>
      </main>
    </div>
  );
}

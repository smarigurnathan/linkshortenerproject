import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <header className="border-b border-white/10 bg-[#111114]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-tight text-white">
            LinkShortenerProject
          </div>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton>
                <Button variant="outline" size="sm" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5">
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button size="sm" className="rounded-full bg-white text-black hover:bg-zinc-200">
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

      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
        <span className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-200 shadow-sm">
          Welcome to your link-shortening app
        </span>

        <h1 className="max-w-4xl text-4xl font-black tracking-[-0.06em] text-white sm:text-7xl">
          Shorten links, grow faster, and keep every click under control.
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-zinc-300">
          Create clean, shareable links and manage your account with a clear
          sign-in and sign-up flow built with Clerk.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Show when="signed-out">
            <SignUpButton>
              <Button size="lg" className="rounded-full bg-white text-black hover:bg-zinc-200">
                Create account
              </Button>
            </SignUpButton>

            <SignInButton>
              <Button variant="outline" size="lg" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5">
                Sign in
              </Button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <div className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
              You are signed in
            </div>
          </Show>
        </div>
      </main>
    </div>
  );
}
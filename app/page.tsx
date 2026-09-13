import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  BarChart3,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthRedirect } from "@/components/auth-redirect";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    icon: Link2,
    title: "Smart link creation",
    description:
      "Turn long, messy URLs into clean, memorable short links in seconds.",
  },
  {
    icon: BarChart3,
    title: "Clear performance insights",
    description:
      "See how many people click, where they come from, and what content is working.",
  },
  {
    icon: ShieldCheck,
    title: "Safe by default",
    description:
      "Keep your shared links protected with a secure, authenticated workflow.",
  },
];

const steps = [
  "Create a branded short URL",
  "Share it across social, email, and campaigns",
  "Track clicks and optimize what converts",
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <AuthRedirect />
      <header className="border-b border-white/10 bg-[#111114]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-black text-black">
              L
            </span>
            LinkShortener
          </Link>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton forceRedirectUrl="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
                >
                  Sign in
                </Button>
              </SignInButton>

              <SignUpButton forceRedirectUrl="/dashboard">
                <Button
                  size="sm"
                  className="rounded-full bg-pink-500 text-white hover:bg-pink-600"
                >
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

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-zinc-200">
                <Sparkles className="h-4 w-4 text-violet-300" />
                Built for faster sharing
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-[-0.07em] text-white sm:text-5xl lg:text-7xl">
                Turn long links into memorable moments.
              </h1>

              <p className="mt-6 max-w-xl text-lg text-zinc-300">
                Shorten, track, and manage every link in one place with a polished,
                secure workflow designed to move your content faster.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
                <Show when="signed-out">
                  <SignUpButton forceRedirectUrl="/dashboard">
                    <Button size="lg" className="rounded-full bg-pink-500 px-6 text-base text-white hover:bg-pink-600">
                      Create account
                    </Button>
                  </SignUpButton>

                  <SignInButton forceRedirectUrl="/dashboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full border-white/15 bg-transparent px-6 text-base text-white hover:bg-white/5"
                    >
                      Sign in
                    </Button>
                  </SignInButton>
                </Show>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-zinc-400">
                <div>
                  <div className="text-2xl font-bold text-white">2.4k+</div>
                  <div>links created</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">98.4%</div>
                  <div>click reliability</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div>sharing workflow</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 p-4 shadow-2xl shadow-violet-950/30 ring-1 ring-violet-500/20">
                <div className="rounded-2xl border border-white/10 bg-[#111114] p-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-sm text-zinc-400">Recent links</p>
                      <h2 className="mt-1 text-xl font-semibold text-white">Campaign dashboard</h2>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                      Live
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      ["Short link", "lnk.sh/launch"],
                      ["Clicks", "1,284"],
                      ["Top source", "Instagram"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-3 py-3"
                      >
                        <span className="text-sm text-zinc-400">{label}</span>
                        <span className="font-medium text-white">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
                    <div className="flex items-center justify-between text-sm text-violet-100">
                      <span>Click performance</span>
                      <span>+32.8%</span>
                    </div>
                    <div className="mt-4 flex h-16 items-end gap-2">
                      {[35, 48, 52, 68, 80, 92].map((bar, index) => (
                        <div
                          key={bar}
                          className="flex-1 rounded-t-lg bg-gradient-to-t from-violet-400 to-violet-200"
                          style={{ height: `${bar}%`, opacity: 0.45 + index * 0.08 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0f0f13]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
                Why teams use it
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built to make sharing easier and more effective.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featureCards.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-lg shadow-black/10"
                >
                  <div className="inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-300 ring-1 ring-violet-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-300">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A simple workflow for smarter link sharing.
              </h2>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-semibold text-violet-200 ring-1 ring-violet-500/20">
                    0{index + 1}
                  </div>
                  <p className="text-lg text-zinc-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0f0f13]">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to share smarter?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-zinc-300">
              Launch your polished link-shortening workflow and keep every click within reach.
            </p>

            <Show when="signed-out">
              <SignUpButton>
                <Button
                  size="lg"
                  className="mt-8 rounded-full bg-pink-500 px-6 text-base text-white hover:bg-pink-600"
                >
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignUpButton>
            </Show>
          </div>
        </section>
      </main>
    </div>
  );
}
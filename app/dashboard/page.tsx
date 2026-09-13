import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowUpRight, Link2, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { getLinksForUser } from "@/data/links";
import { CreateLinkDialog } from "./create-link-dialog";
import { LinkItemActions } from "./link-item-actions";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const links = await getLinksForUser(userId);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <header className="border-b border-white/10 bg-[#111114]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-black text-black">
              L
            </span>
            LinkShortener
          </div>

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
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-200">
              <Sparkles className="h-4 w-4" />
              Your workspace
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">
              Short links
            </h1>
          </div>

          <CreateLinkDialog />
        </div>

        {links.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-zinc-950/60 p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-300">
              <Link2 className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">No links yet</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Create your first short link and it will appear here.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {links.map((link) => (
              <li
                key={link.id}
                className="rounded-2xl border border-white/10 bg-[#111114] p-5 shadow-lg shadow-black/20"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm text-violet-300">
                      <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 font-medium">
                        {link.shortCode}
                      </span>
                      <span className="text-zinc-400">
                        {new Intl.DateTimeFormat("en", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(link.createdAt))}
                      </span>
                    </div>

                    <p className="mt-3 truncate text-lg font-semibold text-white">
                      {link.originalUrl}
                    </p>
                  </div>

                  
                  <div className="flex items-center gap-2 self-start">
                    <LinkItemActions link={link} />
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
                    >
                      Visit link
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
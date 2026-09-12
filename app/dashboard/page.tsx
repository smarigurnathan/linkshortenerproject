import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { shortLinks, type ShortLink } from "@/db/schema";

const formatDate = (value: Date | string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  let links: ShortLink[] = [];

  try {
    links = await db
      .select()
      .from(shortLinks)
      .where(eq(shortLinks.userId, userId))
      .orderBy(desc(shortLinks.createdAt));
  } catch (error) {
    console.error("Failed to load user links", error);
    links = [];
  }

  return (
    <div className="min-h-screen bg-[#02050a] text-white">
      <header className="border-b border-white/10 bg-[#0a0d13]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-[clamp(1.7rem,2vw,2.4rem)] font-black tracking-[-0.06em] text-white">
            Link Shortener
          </div>

          <UserButton
            appearance={{
              variables: {
                colorPrimary: "#8b5cf6",
                colorBackground: "#111827",
                colorForeground: "#f4f4f5",
                colorMutedForeground: "#a1a1aa",
                colorNeutral: "#27272a",
                borderRadius: "9999px",
              },
              elements: {
                userButtonPopoverCard:
                  "border border-white/10 bg-[#111114] shadow-2xl shadow-black/40",
                userButtonPopoverActionButton:
                  "text-zinc-200 hover:bg-white/5",
                userButtonPopoverActionButtonText: "text-zinc-200",
                userButtonPopoverFooter: "border-t border-white/10",
              },
            }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
              Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-white md:text-5xl">
              My Links
            </h1>
          </div>

          <Button
            type="button"
            className="rounded-full border border-white/10 bg-white px-4 py-2 text-base font-medium text-zinc-950 hover:bg-zinc-100"
          >
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New link
            </span>
          </Button>
        </div>

        {links.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111318]/80 p-12 text-center shadow-inner shadow-black/20">
            <p className="text-3xl font-bold tracking-tight text-white">No links yet</p>
            <p className="mt-3 text-lg text-zinc-400">
              Create your first shortened link to get started.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {links.map((link) => (
              <li
                key={link.id}
                className="rounded-2xl border border-white/10 bg-[#111318]/80 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <div className="min-w-0">
                  <p className="text-[1.05rem] font-semibold tracking-tight text-white sm:text-[1.2rem]">
                    {link.shortCode}
                  </p>

                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block break-all text-base text-zinc-300 underline-offset-4 hover:underline"
                  >
                    {link.originalUrl}
                  </a>

                  <div className="mt-4 text-sm text-zinc-500">
                    Created: {formatDate(link.createdAt)}
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

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { shortLinks } from "@/db/schema";

const seedEntries = [
  { originalUrl: "https://github.com/vercel/next.js", shortCode: "gh-nextjs" },
  { originalUrl: "https://www.youtube.com/", shortCode: "yt-home" },
  { originalUrl: "https://tailwindcss.com/docs/installation", shortCode: "tw-docs" },
  { originalUrl: "https://orm.drizzle.team/", shortCode: "drizzle-home" },
  { originalUrl: "https://clerk.com/docs", shortCode: "clerk-guide" },
  { originalUrl: "https://neon.tech/docs/", shortCode: "neon-intro" },
  { originalUrl: "https://react.dev/learn", shortCode: "react-learn" },
  { originalUrl: "https://www.typescriptlang.org/docs/", shortCode: "ts-docs" },
  { originalUrl: "https://vercel.com/docs", shortCode: "vercel-docs" },
  { originalUrl: "https://developer.mozilla.org/", shortCode: "mdn-web" },
] as const;

export async function seedShortLinksForCurrentUser(userId: string) {
  const inserted = await db
    .insert(shortLinks)
    .values(
      seedEntries.map((entry) => ({
        userId,
        originalUrl: entry.originalUrl,
        shortCode: entry.shortCode,
      })),
    )
    .returning();

  console.log("Inserted short links for user:", userId, inserted);

  return inserted;
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const inserted = await seedShortLinksForCurrentUser(userId);

    return NextResponse.json({
      userId,
      count: inserted.length,
      inserted,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database insertion error";

    return NextResponse.json(
      {
        error: "Seed failed. One or more short codes already exist.",
        details: message,
      },
      { status: 409 },
    );
  }
}

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const inserted = await seedShortLinksForCurrentUser(userId);

    return NextResponse.json({
      userId,
      count: inserted.length,
      inserted,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database insertion error";

    return NextResponse.json(
      {
        error: "Seed failed. One or more short codes already exist.",
        details: message,
      },
      { status: 409 },
    );
  }
}

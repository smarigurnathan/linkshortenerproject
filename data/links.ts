import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { shortLinks } from "@/db/schema";

export type CreateLinkData = {
  userId: string;
  originalUrl: string;
  shortCode?: string;
};

export type UpdateLinkData = {
  userId: string;
  linkId: number;
  originalUrl: string;
  shortCode?: string;
};

export type DeleteLinkData = {
  userId: string;
  linkId: number;
};

export async function getLinksForUser(userId: string) {
  return db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.userId, userId))
    .orderBy(desc(shortLinks.createdAt));
}

export async function getLinkByIdForUser(userId: string, linkId: number) {
  const [link] = await db
    .select()
    .from(shortLinks)
    .where(and(eq(shortLinks.userId, userId), eq(shortLinks.id, linkId)))
    .limit(1);

  return link ?? null;
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.shortCode, shortCode))
    .limit(1);

  return link ?? null;
}

export async function createLinkForUser({ userId, originalUrl, shortCode }: CreateLinkData) {
  const [link] = await db
    .insert(shortLinks)
    .values({
      userId,
      originalUrl: originalUrl.trim(),
      shortCode: shortCode?.trim() || generateShortCode(),
    })
    .returning();

  return link;
}

export async function updateLinkForUser({ userId, linkId, originalUrl, shortCode }: UpdateLinkData) {
  const [link] = await db
    .update(shortLinks)
    .set({
      originalUrl: originalUrl.trim(),
      shortCode: shortCode?.trim() || undefined,
      updatedAt: new Date(),
    })
    .where(and(eq(shortLinks.userId, userId), eq(shortLinks.id, linkId)))
    .returning();

  return link ?? null;
}

export async function deleteLinkForUser({ userId, linkId }: DeleteLinkData) {
  const [link] = await db
    .delete(shortLinks)
    .where(and(eq(shortLinks.userId, userId), eq(shortLinks.id, linkId)))
    .returning();

  return link ?? null;
}

function generateShortCode() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let index = 0; index < 8; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return code;
}

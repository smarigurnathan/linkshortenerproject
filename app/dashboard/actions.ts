"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createLinkForUser,
  deleteLinkForUser,
  getLinkByIdForUser,
  getLinkByShortCode,
  updateLinkForUser,
} from "@/data/links";

const baseLinkSchema = z
  .object({
    originalUrl: z
      .string()
      .trim()
      .min(1, "Paste a URL to shorten.")
      .url("Enter a valid URL."),
    shortCode: z
      .string()
      .trim()
      .max(40, "Short code is too long.")
      .optional()
      .transform((value) => (value ? value : undefined)),
  })
  .superRefine((value, ctx) => {
    if (!value.shortCode) {
      return;
    }

    if (!/^[a-zA-Z0-9-]+$/.test(value.shortCode)) {
      ctx.addIssue({
        code: "custom",
        message: "Short code can only contain letters, numbers, and hyphens.",
        path: ["shortCode"],
      });
    }
  });

const linkIdSchema = z.coerce.number().int().positive("Link id is invalid.");

export type CreateLinkActionResult = {
  success: boolean;
  error?: string;
  link?: Awaited<ReturnType<typeof createLinkForUser>>;
};

export type UpdateLinkActionResult = {
  success: boolean;
  error?: string;
  link?: Awaited<ReturnType<typeof updateLinkForUser>>;
};

export type DeleteLinkActionResult = {
  success: boolean;
  error?: string;
  link?: Awaited<ReturnType<typeof deleteLinkForUser>>;
};

export async function createLinkAction(input: {
  originalUrl: string;
  shortCode?: string;
}): Promise<CreateLinkActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "You need to be signed in to create a link.",
    };
  }

  const parsed = baseLinkSchema.safeParse({
    originalUrl: input.originalUrl,
    shortCode: input.shortCode,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Please check your link details.",
    };
  }

  const { originalUrl, shortCode } = parsed.data;

  if (shortCode) {
    const existingLink = await getLinkByShortCode(shortCode);

    if (existingLink) {
      return {
        success: false,
        error: "That short code is already in use. Try a different one.",
      };
    }
  }

  const link = await createLinkForUser({
    userId,
    originalUrl,
    shortCode,
  });

  if (!link) {
    return {
      success: false,
      error: "The link could not be created right now.",
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    link,
  };
}

export async function updateLinkAction(input: {
  linkId: number;
  originalUrl: string;
  shortCode?: string;
}): Promise<UpdateLinkActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "You need to be signed in to update a link.",
    };
  }

  const parsedId = linkIdSchema.safeParse(input.linkId);

  if (!parsedId.success) {
    return {
      success: false,
      error: parsedId.error.issues[0]?.message ?? "Link id is invalid.",
    };
  }

  const parsed = baseLinkSchema.safeParse({
    originalUrl: input.originalUrl,
    shortCode: input.shortCode,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Please check your link details.",
    };
  }

  const existingLink = await getLinkByIdForUser(userId, parsedId.data);

  if (!existingLink) {
    return {
      success: false,
      error: "This link could not be found in your workspace.",
    };
  }

  const { originalUrl, shortCode } = parsed.data;

  if (shortCode && shortCode !== existingLink.shortCode) {
    const codeInUse = await getLinkByShortCode(shortCode);

    if (codeInUse && codeInUse.id !== existingLink.id) {
      return {
        success: false,
        error: "That short code is already in use. Try a different one.",
      };
    }
  }

  const link = await updateLinkForUser({
    userId,
    linkId: parsedId.data,
    originalUrl,
    shortCode,
  });

  if (!link) {
    return {
      success: false,
      error: "The link could not be updated right now.",
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    link,
  };
}

export async function deleteLinkAction(input: { linkId: number }): Promise<DeleteLinkActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "You need to be signed in to delete a link.",
    };
  }

  const parsedId = linkIdSchema.safeParse(input.linkId);

  if (!parsedId.success) {
    return {
      success: false,
      error: parsedId.error.issues[0]?.message ?? "Link id is invalid.",
    };
  }

  const link = await getLinkByIdForUser(userId, parsedId.data);

  if (!link) {
    return {
      success: false,
      error: "This link could not be found in your workspace.",
    };
  }

  const deletedLink = await deleteLinkForUser({ userId, linkId: parsedId.data });

  if (!deletedLink) {
    return {
      success: false,
      error: "The link could not be deleted right now.",
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    link: deletedLink,
  };
}

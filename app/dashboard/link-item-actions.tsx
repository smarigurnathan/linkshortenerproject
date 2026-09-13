"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteLinkAction, updateLinkAction } from "./actions";

type LinkItemActionsProps = {
  link: {
    id: number;
    shortCode: string;
    originalUrl: string;
  };
};

export function LinkItemActions({ link }: LinkItemActionsProps) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const originalUrl = String(formData.get("originalUrl") ?? "");
    const shortCode = String(formData.get("shortCode") ?? "");

    startTransition(async () => {
      const result = await updateLinkAction({
        linkId: link.id,
        originalUrl,
        shortCode: shortCode.trim() || undefined,
      });

      if (result.success) {
        form.reset();
        setError("");
        setIsEditOpen(false);
        router.refresh();
        return;
      }

      setError(result.error ?? "Unable to update the link.");
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteLinkAction({ linkId: link.id });

      if (result.success) {
        setIsDeleteOpen(false);
        router.refresh();
        return;
      }

      setError(result.error ?? "Unable to delete the link.");
      setIsDeleteOpen(false);
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setError("");
            setIsEditOpen(true);
          }}
          className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
          aria-label={`Edit ${link.shortCode}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setError("");
            setIsDeleteOpen(true);
          }}
          className="h-9 w-9 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-200 hover:bg-rose-500/10"
          aria-label={`Delete ${link.shortCode}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {isEditOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111114] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-200">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit short link
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white">Update destination</h2>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setError("");
                  setIsEditOpen(false);
                }}
                className="rounded-full text-zinc-400 hover:bg-white/5 hover:text-white"
                aria-label="Close edit dialog"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor={`edit-originalUrl-${link.id}`} className="text-sm font-medium text-zinc-200">
                  Destination URL
                </label>
                <input
                  id={`edit-originalUrl-${link.id}`}
                  name="originalUrl"
                  type="url"
                  defaultValue={link.originalUrl}
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-[#18181b] px-3 py-2.5 text-base text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`edit-shortCode-${link.id}`} className="text-sm font-medium text-zinc-200">
                  Custom short code
                </label>
                <input
                  id={`edit-shortCode-${link.id}`}
                  name="shortCode"
                  type="text"
                  defaultValue={link.shortCode}
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-[#18181b] px-3 py-2.5 text-base text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setError("");
                    setIsEditOpen(false);
                  }}
                  className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full bg-violet-500 px-4 text-white hover:bg-violet-400"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isDeleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111114] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-xs font-medium text-rose-200">
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete short link
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white">Are you sure?</h2>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setError("");
                  setIsDeleteOpen(false);
                }}
                className="rounded-full text-zinc-400 hover:bg-white/5 hover:text-white"
                aria-label="Close delete dialog"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-300">
              This will permanently remove the short link <span className="font-semibold text-white">/{link.shortCode}</span> and its redirect.
            </p>

            {error ? (
              <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setError("");
                  setIsDeleteOpen(false);
                }}
                className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isPending}
                onClick={handleDelete}
                className="rounded-full bg-rose-500 px-4 text-white hover:bg-rose-400"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

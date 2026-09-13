"use client";

import { useState, useTransition } from "react";
import { Loader2, Link2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createLinkAction } from "./actions";

export function CreateLinkDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const originalUrl = String(formData.get("originalUrl") ?? "");
    const shortCode = String(formData.get("shortCode") ?? "");

    startTransition(async () => {
      const result = await createLinkAction({
        originalUrl,
        shortCode: shortCode.trim() || undefined,
      });

      if (result.success) {
        form.reset();
        setError("");
        setIsOpen(false);
        router.refresh();
        return;
      }

      setError(result.error ?? "Unable to create the link.");
    });
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-white px-4 text-black hover:bg-zinc-200"
      >
        + create link
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111114] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-200">
                  <Link2 className="h-3.5 w-3.5" />
                  Create short link
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white">Add a new destination</h2>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setError("");
                  setIsOpen(false);
                }}
                className="rounded-full text-zinc-400 hover:bg-white/5 hover:text-white"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="originalUrl" className="text-sm font-medium text-zinc-200">
                  Destination URL
                </label>
                <input
                  id="originalUrl"
                  name="originalUrl"
                  type="url"
                  placeholder="https://example.com"
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-[#18181b] px-3 py-2.5 text-base text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="shortCode" className="text-sm font-medium text-zinc-200">
                  Custom short code (optional)
                </label>
                <input
                  id="shortCode"
                  name="shortCode"
                  type="text"
                  placeholder="launch-campaign"
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
                    setIsOpen(false);
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
                      Creating...
                    </>
                  ) : (
                    "Create link"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

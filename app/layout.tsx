import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clerkAppearance = {
  variables: {
    colorPrimary: "#a78bfa",
    colorBackground: "#09090b",
    colorInputBackground: "#18181b",
    colorInputText: "#f4f4f5",
    colorText: "#f4f4f5",
    colorTextSecondary: "#a1a1aa",
    colorNeutral: "#3f3f46",
    colorSuccess: "#22c55e",
    colorDanger: "#ef4444",
    borderRadius: "0.875rem",
    shadowSm: "0 10px 30px rgba(24, 24, 27, 0.45)",
    shadowMd: "0 20px 40px rgba(24, 24, 27, 0.6)",
  },
  elements: {
    rootBox: "bg-[#09090b]",
    card: "border border-white/10 bg-[#111114] shadow-2xl shadow-black/40",
    headerTitle: "text-white",
    headerSubtitle: "text-zinc-400",
    socialButtonsBlockButton: "border border-white/10 bg-[#18181b] text-white hover:bg-[#27272a]",
    socialButtonsBlockButtonText: "text-white",
    formButtonPrimary: "bg-violet-500 text-white hover:bg-violet-400",
    formFieldInput: "border border-white/10 bg-[#18181b] text-white placeholder:text-zinc-500",
    formFieldLabel: "text-zinc-200",
    footerActionLink: "text-violet-300 hover:text-violet-200",
    formFieldInputShowPasswordButton: "text-zinc-300",
    identityPreview: "border border-white/10 bg-[#18181b]",
    dividerRow: "border-zinc-700",
    dividerText: "text-zinc-400",
    otpCodeFieldInput: "border border-white/10 bg-[#18181b] text-white",
    formResendCodeLink: "text-violet-300",
    alertText: "text-zinc-200",
    modalBackdrop: "bg-black/70",
    modalContent: "border border-white/10 bg-[#111114]",
  },
};

export const metadata: Metadata = {
  title: "Link Shortener",
  description: "A dark-themed link shortener app built with Clerk.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#09090b] text-white antialiased">
        <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
import { SignIn } from "@clerk/nextjs";

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
  },
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-4">
      <SignIn appearance={clerkAppearance} />
    </div>
  );
}

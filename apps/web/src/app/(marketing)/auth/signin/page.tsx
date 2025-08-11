import AuthButtons from "@/components/auth/AuthButtons.client";

export default function SignInPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="w-full max-w-sm border rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Logg inn</h1>
        <p className="text-sm opacity-70">Bruk GitHub for å logge inn.</p>
        <AuthButtons />
      </div>
    </main>
  );
}

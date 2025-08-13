import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function MarketingPage() {
  const features = [
    { icon: <Sparkles size={18} />, title: "Rask start", desc: "Next.js + Tailwind + auth koblet riktig." },
    { icon: <Server size={18} />, title: "API og OpenAPI", desc: "Swagger UI og typed endpoints." },
    { icon: <ShieldCheck size={18} />, title: "Sikkerhet", desc: "Best practices for auth og miljøvariabler." },
  ];

  return (
    <section className="grid gap-12">
      <header className="text-center grid gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight">Bygg raskere på Twofold</h1>
        <p className="text-lg opacity-80">
          Markedsføringsside, docs og dashboard – samme kodebase, samme deploy.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/dashboard">Gå til dashboard <ArrowRight className="ml-1" size={16} /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs">Les docs</Link>
          </Button>
        </div>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        {features.map((f) => (
          <Card key={f.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{f.icon}{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm opacity-70">Alt klart fra første commit.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl border p-6 text-center">
        <p className="opacity-80 mb-3">Jobber du med API-er?</p>
        <Button asChild variant="outline"><Link href="/api-docs">Åpne API-dokumentasjon</Link></Button>
      </div>
    </section>
  );
}

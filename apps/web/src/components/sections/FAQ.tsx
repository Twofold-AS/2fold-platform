import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Hva er Twofold Platform?",
    answer: "Twofold Platform er vår interne utviklingsplattform som lar oss levere skreddersydde AI-løsninger, webapper og mobile apps raskt og effektivt. Den automatiserer deployment, overvåking og package management."
  },
  {
    question: "Hvilke tjenester tilbyr dere?",
    answer: "Vi spesialiserer oss på skreddersydde webapplikasjoner, mobile apps og programvare med AI-integrasjon. Fra enkle nettsider til komplekse business-systemer med kunstig intelligens."
  },
  {
    question: "Hvordan fungerer AI-integrasjonen?",
    answer: "Vi integrerer kunstig intelligens direkte i løsningene våre for å automatisere prosesser, forbedre brukeropplevelsen og gi smartere funksjonalitet. Dette kan være alt fra chatbots til automatisk databehandling."
  },
  {
    question: "Hvor lang tid tar et typisk prosjekt?",
    answer: "Takket være vår platform kan vi levere enkle løsninger på 2-4 uker, mens mer komplekse systemer tar 2-6 måneder. Vi gir alltid realistiske tidsestimater etter første møte."
  },
  {
    question: "Tilbyr dere vedlikehold etter lansering?",
    answer: "Ja, vi tilbyr komplett vedlikehold og support. Vår platform gjør at vi kan raskt implementere oppdateringer og fikse eventuelle problemer. Vi har også 24/7 overvåking av alle systemer."
  },
  {
    question: "Hvordan starter vi et samarbeid?",
    answer: "Ta kontakt for en uforpliktende samtale hvor vi diskuterer dine behov. Vi lager deretter et skreddersydd forslag med timeline og pris. Første konsultasjon er alltid gratis."
  },
  {
    question: "Kan dere jobbe med eksisterende systemer?",
    answer: "Absolutt! Vi kan integrere med og forbedre eksisterende systemer. Vår platform gjør det enkelt å koble sammen forskjellige tjenester og APIs."
  },
  {
    question: "Hva koster det å få laget en løsning?",
    answer: "Prisen avhenger av kompleksiteten og funksjonaliteten. Enkle webapper starter fra 50.000kr, mens komplekse AI-systemer kan koste 200.000kr+. Vi gir alltid fast pris etter kravkartlegging."
  },
  {
    question: "Får vi tilgang til kildekoden?",
    answer: "Ja, dere får full tilgang til all kildekode og kan velge hvor systemet skal hostes. Vi tror på åpenhet og at dere skal eie deres egen løsning."
  },
  {
    question: "Hvilke teknologier bruker dere?",
    answer: "Vi bruker moderne teknologier som React, Next.js, Node.js, Python og AI-biblioteker som OpenAI. Vår platform bygger på Next.js, Tailwind, Prisma og deployerer på Vercel."
  }
];

export default function FAQ() {
  return (
    <>
      <div className="max-w-[85rem] container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Din spørsmål, våre svar
          </h2>
          <p className="mt-1 text-muted-foreground">
            De mest vanligste spørsmålene vi får.
          </p>
        </div>
        {/* End Title */}

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Renders an accessible FAQ accordion. JSON-LD FAQPage schema is emitted
// separately via the <Seo> component using faqJsonLd().
export const FaqAccordion = ({ faqs = [], testId = "faq-accordion" }) => {
  if (!faqs.length) return null;
  return (
    <Accordion type="multiple" className="w-full" data-testid={testId}>
      {faqs.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left font-display text-navy hover:no-underline">
            {f.question}
          </AccordionTrigger>
          <AccordionContent className="text-slate-600 leading-relaxed text-[15px]">
            {f.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const faqJsonLd = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export default FaqAccordion;

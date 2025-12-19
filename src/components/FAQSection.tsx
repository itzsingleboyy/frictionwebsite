import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is FrictionHost?",
    answer:
      "FrictionHost is a premium game server hosting provider specializing in Minecraft, Rust, Palworld, GTA V, and more. We offer high-performance servers with 24/7 support, DDoS protection, and instant setup.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer game server hosting for popular titles including Minecraft, Rust, Palworld, GTA V (FiveM), Terraria, ARK Survival, and more. All plans include unlimited slots, NVMe storage, and DDoS protection.",
  },
  {
    question: "Where are your servers located?",
    answer:
      "Our servers are located in multiple data centers across India and Asia Pacific region to ensure low latency for all players. We use tier-3+ data centers with redundant power and network connections.",
  },
  {
    question: "Is DDoS protection included?",
    answer:
      "Yes! All our plans include enterprise-grade DDoS protection at no additional cost. Your server stays online even during attacks.",
  },
  {
    question: "How do I manage my services?",
    answer:
      "You can manage your servers through our custom control panel. It includes features like one-click mod installation, automatic backups, console access, and performance monitoring.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major payment methods including UPI, credit/debit cards, net banking, and popular wallets. International payments via PayPal are also supported.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we offer a full money-back guarantee within the first 7 days if you're not satisfied with your game server. No questions asked.",
  },
  {
    question: "How fast is setup after payment?",
    answer:
      "Your server is automatically activated within 2-5 minutes of payment confirmation. You'll receive login details via email instantly.",
  },
  {
    question: "Can I contact support anytime?",
    answer:
      "Absolutely! Our support team is available 24/7/365. You can reach us via live chat, ticket system, or Discord for immediate assistance.",
  },
  {
    question: "Do you offer reseller or partnership programs?",
    answer:
      "Yes, we have reseller programs available for businesses looking to offer game hosting services. Contact our sales team for more information.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">FAQ</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Frequently Asked </span>
            <span className="gradient-text">
              Questions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions? We've got answers. If you can't find what you're looking
            for, feel free to contact our support.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-2xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-[0_0_30px_hsl(var(--primary)/0.1)] transition-all duration-300"
              >
                <AccordionTrigger className="text-foreground font-semibold hover:text-primary hover:no-underline py-6 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

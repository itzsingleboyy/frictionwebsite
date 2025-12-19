import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RamCalculator from "@/components/RamCalculator";
import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    price: 45,
    description: "Perfect for small communities",
    ram: "2 GB",
    cpu: "1 vCore",
    storage: "10 GB NVMe",
    features: [
      "Unlimited Slots",
      "DDoS Protection",
      "24/7 Support",
      "Daily Backups",
      "Full FTP Access",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: 89,
    description: "Great for growing servers",
    ram: "4 GB",
    cpu: "2 vCores",
    storage: "25 GB NVMe",
    features: [
      "Unlimited Slots",
      "DDoS Protection",
      "24/7 Priority Support",
      "Hourly Backups",
      "Full FTP Access",
      "Mod Support",
      "Custom Subdomain",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 149,
    description: "For serious gaming communities",
    ram: "8 GB",
    cpu: "4 vCores",
    storage: "50 GB NVMe",
    features: [
      "Unlimited Slots",
      "Advanced DDoS Protection",
      "24/7 Priority Support",
      "Real-time Backups",
      "Full FTP Access",
      "Mod Support",
      "Custom Domain",
      "Dedicated IP",
    ],
    popular: false,
  },
  {
    name: "Enterprise",
    price: 299,
    description: "Maximum performance",
    ram: "16 GB",
    cpu: "8 vCores",
    storage: "100 GB NVMe",
    features: [
      "Unlimited Slots",
      "Enterprise DDoS Protection",
      "Dedicated Support Manager",
      "Real-time Backups",
      "Full Root Access",
      "Unlimited Mods",
      "Custom Domain",
      "Dedicated IP",
      "SLA Guarantee",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleGetStarted = async (plan: typeof plans[0]) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please login to purchase a plan");
      navigate("/auth");
      return;
    }
    
    setSelectedPlan(plan);
    setIsPaymentOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Pricing - FrictionHost</title>
        <meta name="description" content="Affordable game server hosting plans starting at ₹45/month. Choose the perfect plan for your community." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Simple </span>
                <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h1>
              <p className="text-zinc-400 text-lg">
                No hidden fees. No surprises. Choose the plan that fits your needs.
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                    plan.popular
                      ? "border-red-500/50 shadow-[0_0_40px_rgba(220,38,38,0.2)]"
                      : "border-zinc-800 hover:border-red-500/30"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                        ₹{plan.price}
                      </span>
                      <span className="text-zinc-500">/mo</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-white font-semibold">{plan.ram}</div>
                        <div className="text-zinc-500 text-xs">RAM</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{plan.cpu}</div>
                        <div className="text-zinc-500 text-xs">CPU</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{plan.storage}</div>
                        <div className="text-zinc-500 text-xs">Storage</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                        <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full gap-2"
                    onClick={() => handleGetStarted(plan)}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Custom Plans */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-zinc-500 mb-4">
                Need a custom plan? Contact us for enterprise solutions.
              </p>
              <Button variant="outline" size="lg" className="gap-2">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* RAM Calculator */}
          <RamCalculator />
        </main>
        <Footer />
        
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          plan={selectedPlan}
        />
      </div>
    </>
  );
};

export default Pricing;

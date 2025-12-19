import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RamCalculator from "@/components/RamCalculator";
import PaymentModal from "@/components/PaymentModal";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight, Globe, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const plans = [
  {
    name: "Meteor",
    price: 160,
    description: "Perfect for small communities",
    ram: "4 GB",
    cpu: "1 vCore @ 3.0GHz",
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
    name: "Nova",
    price: 240,
    description: "Great for growing servers",
    ram: "6 GB",
    cpu: "1.5 vCores @ 3.0GHz",
    storage: "15 GB NVMe",
    features: [
      "Unlimited Slots",
      "DDoS Protection",
      "24/7 Support",
      "Daily Backups",
      "Full FTP Access",
      "Mod Support",
    ],
    popular: false,
  },
  {
    name: "Eclipse",
    price: 320,
    description: "For serious gaming communities",
    ram: "8 GB",
    cpu: "2 vCores @ 3.0GHz",
    storage: "20 GB NVMe",
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
    name: "Comet",
    price: 480,
    description: "High performance hosting",
    ram: "12 GB",
    cpu: "2.5 vCores @ 3.0GHz",
    storage: "30 GB NVMe",
    features: [
      "Unlimited Slots",
      "Advanced DDoS Protection",
      "24/7 Priority Support",
      "Hourly Backups",
      "Full FTP Access",
      "Mod Support",
      "Custom Subdomain",
    ],
    popular: false,
  },
  {
    name: "Nebula",
    price: 640,
    description: "Maximum performance",
    ram: "16 GB",
    cpu: "3 vCores @ 3.0GHz",
    storage: "40 GB NVMe",
    features: [
      "Unlimited Slots",
      "Enterprise DDoS Protection",
      "24/7 Priority Support",
      "Real-time Backups",
      "Full Root Access",
      "Unlimited Mods",
      "Custom Domain",
    ],
    popular: false,
  },
  {
    name: "Plasma",
    price: 960,
    description: "Enterprise grade hosting",
    ram: "24 GB",
    cpu: "3.5 vCores @ 3.0GHz",
    storage: "40 GB NVMe",
    features: [
      "Unlimited Slots",
      "Enterprise DDoS Protection",
      "Dedicated Support Manager",
      "Real-time Backups",
      "Full Root Access",
      "Unlimited Mods",
      "Custom Domain",
      "Dedicated IP",
    ],
    popular: false,
  },
  {
    name: "SuperNova",
    price: 1280,
    description: "Ultimate server power",
    ram: "32 GB",
    cpu: "4 vCores @ 3.0GHz",
    storage: "60 GB NVMe",
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

const proxyPlans = [
  {
    name: "Starter Proxy",
    price: 45,
    description: "Basic proxy for light usage",
    bandwidth: "50 GB",
    connections: "5 Concurrent",
    locations: "3 Locations",
    features: [
      "HTTP/HTTPS Support",
      "SOCKS5 Support",
      "99.9% Uptime",
      "Basic Dashboard",
    ],
    popular: false,
  },
  {
    name: "Pro Proxy",
    price: 99,
    description: "For power users",
    bandwidth: "150 GB",
    connections: "15 Concurrent",
    locations: "10 Locations",
    features: [
      "HTTP/HTTPS Support",
      "SOCKS5 Support",
      "99.9% Uptime",
      "Advanced Dashboard",
      "API Access",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Business Proxy",
    price: 199,
    description: "Enterprise-grade proxy",
    bandwidth: "Unlimited",
    connections: "50 Concurrent",
    locations: "25+ Locations",
    features: [
      "HTTP/HTTPS Support",
      "SOCKS5 Support",
      "99.99% Uptime SLA",
      "Full Dashboard",
      "API Access",
      "Dedicated Support",
      "Custom Locations",
      "Whitelabel Option",
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
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

            {/* Proxy Plans Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-24"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 px-4 py-2 rounded-full mb-6">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">Proxy Services</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Premium </span>
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Proxy Plans
                  </span>
                </h2>
                <p className="text-zinc-400">
                  Fast, reliable proxies for all your needs.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {proxyPlans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className={`relative bg-zinc-900/50 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                      plan.popular
                        ? "border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                        : "border-zinc-800 hover:border-blue-500/30"
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Best Value
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="font-display text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-zinc-500 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                          ₹{plan.price}
                        </span>
                        <span className="text-zinc-500">/mo</span>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-white font-semibold text-sm">{plan.bandwidth}</div>
                          <div className="text-zinc-500 text-xs">Bandwidth</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{plan.connections}</div>
                          <div className="text-zinc-500 text-xs">Connections</div>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{plan.locations}</div>
                          <div className="text-zinc-500 text-xs">Locations</div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                          <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className={`w-full gap-2 ${plan.popular ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600" : ""}`}
                      onClick={() => handleGetStarted(plan as any)}
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

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

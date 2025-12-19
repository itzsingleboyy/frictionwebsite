import { Shield, Headphones, RefreshCw, Cpu, Star, Clock } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "24/7 - 365 Support",
    description:
      "Help and support available day and night. Our friendly support team is always happy to help you, whatever the question.",
  },
  {
    icon: RefreshCw,
    title: "Money Back Guarantee",
    description:
      "Full money-back guarantee if you're not satisfied with your game server. No questions asked.",
  },
  {
    icon: Star,
    title: "Rated Excellent",
    description:
      "Our customers rate us as 'Excellent' on both Trustpilot and Google reviews with 4.7+ stars.",
  },
  {
    icon: Cpu,
    title: "Powerful Hardware",
    description:
      "All servers run on high performance Ryzen CPUs at 4GHz+, paired with NVMe SSDs for lightning speed.",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description:
      "Enterprise-grade DDoS protection included with all plans to keep your server online 24/7.",
  },
  {
    icon: Clock,
    title: "Instant Activation",
    description:
      "Your server is automatically activated within minutes of payment. Start playing immediately.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Why Choose Us</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Why</span>{" "}
            <span className="text-gradient">LordCloud</span>
            <span className="text-foreground">?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience unparalleled performance, reliability, and support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card p-6 rounded-2xl shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

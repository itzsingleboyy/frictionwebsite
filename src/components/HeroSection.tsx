import { Button } from "@/components/ui/button";
import { Gamepad2, Rocket, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl animate-float" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/3 left-10 md:left-20 animate-float" style={{ animationDelay: '0s' }}>
        <div className="glass-card p-3 rounded-xl">
          <Gamepad2 className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="absolute top-1/4 right-10 md:right-32 animate-float" style={{ animationDelay: '2s' }}>
        <div className="glass-card p-3 rounded-xl">
          <Rocket className="w-6 h-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-float" style={{ animationDelay: '4s' }}>
        <div className="glass-card p-3 rounded-xl">
          <Shield className="w-6 h-6 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              Unlimited Slots, Storage & Bandwidth
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Premium</span>{" "}
            <span className="text-gradient">Game Server</span>
            <br />
            <span className="text-foreground">Hosting</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Build your dream gaming community on high-performance servers. 
            Starting at just <span className="text-primary font-bold">₹45/month</span> with 24/7 support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl">
              Start Your Server
            </Button>
            <Button variant="gaming" size="xl">
              View All Games
            </Button>
          </div>

          {/* Promo Badge */}
          <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-2xl border-primary/30 animate-pulse-glow">
              <span className="text-2xl">🎉</span>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Welcome Offer!</p>
                <p className="font-semibold text-foreground">
                  Get <span className="text-primary">20% OFF</span> with code{" "}
                  <code className="bg-primary/20 px-2 py-0.5 rounded text-primary font-mono">
                    LORD20
                  </code>
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary"
                  >
                    ★
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground text-sm">4.7 on Trustpilot</span>
            </div>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <div className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">10,000+</span> servers deployed
            </div>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <div className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">99.9%</span> uptime
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

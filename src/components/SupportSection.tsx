import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";

const SupportSection = () => {
  const [message, setMessage] = useState("");

  return (
    <section id="support" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Info Section */}
            <div>
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Support</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">24/7 - 365</span>{" "}
                <span className="text-gradient">Support</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our friendly support team is available day and night to assist you
                with any question or concern. Expect a quick response and expert
                knowledge.
              </p>

              {/* Contact Methods */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 glass-card p-4 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Average Response Time
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Under 5 minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 glass-card p-4 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email Support</p>
                    <p className="text-sm text-muted-foreground">
                      support@lordcloud.in
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 glass-card p-4 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Discord</p>
                    <p className="text-sm text-muted-foreground">
                      Join our community server
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="glass-card p-6 rounded-3xl shadow-card">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Live Chat</p>
                  <p className="text-xs text-green-500">● Online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 min-h-[200px]">
                <div className="flex justify-end">
                  <div className="bg-primary/20 text-foreground px-4 py-2 rounded-2xl rounded-tr-md max-w-[80%]">
                    <p className="text-sm">
                      Hey, I need help setting up my server, please help!
                    </p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground px-4 py-2 rounded-2xl rounded-tl-md max-w-[80%]">
                    <p className="text-sm">
                      Hi there! 👋 I'd be happy to help you set up your server.
                      What game are you looking to host?
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-secondary text-foreground px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none transition-colors"
                />
                <Button variant="hero" size="icon" className="w-12 h-12 rounded-xl">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">Last updated: December 19, 2024</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using FrictionHost services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Description of Services</h2>
              <p>
                FrictionHost provides game server hosting services, including but not limited to server provisioning, 
                management tools, and technical support for various games.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 13 years old to use our services</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You agree not to use our services for any illegal activities</li>
                <li>You must not attempt to disrupt or interfere with our services</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Payment Terms</h2>
              <p>
                All payments are processed securely. Refunds are subject to our refund policy. 
                Prices are subject to change with prior notice to existing customers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Service Level Agreement</h2>
              <p>
                We strive to maintain 99.9% uptime for all services. In the event of downtime beyond 
                our control, we will provide service credits as appropriate.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Prohibited Activities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>DDoS attacks or any form of network abuse</li>
                <li>Hosting illegal content</li>
                <li>Cryptocurrency mining without explicit permission</li>
                <li>Reselling services without authorization</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Termination</h2>
              <p>
                We reserve the right to terminate accounts that violate these terms. 
                Users may cancel their services at any time through their dashboard.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us through our support channels.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;

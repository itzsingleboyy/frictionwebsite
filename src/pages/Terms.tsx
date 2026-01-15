import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Server, Gamepad2, CreditCard, Ban, AlertTriangle, RefreshCw, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    icon: Scale,
    title: "1. Acceptance of Terms",
    content: `By accessing and using AizyNodes services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.

These terms apply to all users, including visitors, registered users, and paying customers. We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any changes.`
  },
  {
    icon: Server,
    title: "2. Service Description",
    content: `AizyNodes provides premium game server hosting and VPS services including:

• **Game Server Hosting**: Dedicated resources for Minecraft, Rust, Palworld, GTA V/FiveM, Terraria, ARK, and other popular games
• **VPS Hosting**: Virtual Private Servers with full root access
• **Management Panel**: Easy-to-use control panel for server management
• **DDoS Protection**: Enterprise-grade protection against attacks
• **24/7 Support**: Round-the-clock technical assistance
• **Automated Backups**: Regular backup services for your data

All services are provided on an "as is" basis with 99.9% uptime guarantee.`
  },
  {
    icon: Gamepad2,
    title: "3. Game Server Policies",
    content: `**Minecraft Servers:**
• Modded servers may require additional RAM allocation
• Plugin installation is allowed within our guidelines
• Server files must comply with Minecraft EULA
• Cracked/offline mode servers are permitted but not officially supported

**Rust Servers:**
• Oxide/uMod plugins are supported
• Server wipes follow official Rust wipe schedules unless custom scheduled
• High player counts may require upgraded plans

**FiveM/GTA V Servers:**
• Must comply with Rockstar Games' terms of service
• Custom scripts and mods are allowed
• ESX/QBCore frameworks are fully supported

**General Game Server Rules:**
• No cheating software or exploits
• No hosting of pirated game content
• Server owners are responsible for their community's behavior`
  },
  {
    icon: Server,
    title: "4. VPS Policies",
    content: `**Acceptable Use:**
• Web hosting and application deployment
• Game server hosting
• Development and testing environments
• Database hosting
• VPN services (personal use only)

**Resource Usage:**
• CPU usage should not exceed 90% continuously for more than 1 hour
• Bandwidth is unmetered but fair use policy applies
• Storage is dedicated and not shared

**Prohibited on VPS:**
• Cryptocurrency mining without explicit permission
• Tor exit nodes
• Open proxies or relay services
• Mass mailing or spam services
• Adult content hosting
• Illegal file sharing or distribution`
  },
  {
    icon: CreditCard,
    title: "5. Payment & Billing",
    content: `**Payment Methods:**
• UPI (Google Pay, PhonePe, Paytm)
• Bank Transfer
• Other methods as available

**Billing Cycle:**
• Services are billed monthly in advance
• Auto-renewal is enabled by default
• Invoices are generated 7 days before due date

**Pricing:**
• All prices are in Indian Rupees (₹)
• Prices are subject to change with 30 days notice
• Existing customers retain their current pricing for active subscriptions

**Late Payments:**
• Services suspended after 3 days of non-payment
• Data retained for 7 days after suspension
• Account terminated after 14 days of non-payment`
  },
  {
    icon: RefreshCw,
    title: "6. Refund Policy",
    content: `**Money-Back Guarantee:**
• 48-hour money-back guarantee on new services
• Refunds processed within 5-7 business days
• Refunds issued to original payment method

**Non-Refundable:**
• Services used for more than 48 hours
• Custom setup or migration services
• Domain registrations
• Services terminated due to ToS violation

**Pro-rata Refunds:**
• Available for annual plans cancelled mid-term
• Calculated based on remaining months
• Processing fee may apply`
  },
  {
    icon: Ban,
    title: "7. Prohibited Activities",
    content: `The following activities are strictly prohibited and will result in immediate termination:

**Network Abuse:**
• DDoS attacks or participation in botnets
• Port scanning or network probing
• Bandwidth abuse or traffic flooding

**Illegal Activities:**
• Hosting illegal content
• Copyright infringement
• Fraud or phishing
• Distribution of malware

**Service Abuse:**
• Reselling without authorization
• Account sharing
• Circumventing resource limits
• Exploiting vulnerabilities

**Content Violations:**
• Child exploitation material (zero tolerance)
• Hate speech or terrorism promotion
• Doxxing or harassment`
  },
  {
    icon: AlertTriangle,
    title: "8. Service Suspension & Termination",
    content: `**Suspension Reasons:**
• Non-payment of services
• ToS violations
• Resource abuse
• Legal requirements

**Termination Process:**
• Warning issued for minor violations
• Immediate suspension for serious violations
• 24-hour notice for account termination (except serious violations)
• Data available for download for 7 days post-termination

**User-Initiated Cancellation:**
• Cancel anytime through dashboard
• No cancellation fees
• Service continues until end of billing period
• Data backed up upon request`
  },
  {
    icon: Shield,
    title: "9. Data Protection & Privacy",
    content: `**Data Collection:**
• Account information (email, name)
• Payment information (processed securely)
• Server logs and usage data
• Support ticket communications

**Data Security:**
• Encrypted data transmission (SSL/TLS)
• Secure data centers with physical security
• Regular security audits
• Employee access controls

**Data Retention:**
• Active account data retained indefinitely
• Deleted account data removed within 30 days
• Backup data retained for 90 days
• Legal hold may extend retention

**Your Rights:**
• Access your personal data
• Request data correction
• Request data deletion
• Export your data`
  },
  {
    icon: Scale,
    title: "10. Limitation of Liability",
    content: `**Service Availability:**
• We strive for 99.9% uptime but do not guarantee uninterrupted service
• Scheduled maintenance excluded from uptime calculations
• Force majeure events are excluded

**Liability Cap:**
• Our liability is limited to fees paid in the last 3 months
• We are not liable for indirect, incidental, or consequential damages
• We are not responsible for data loss - maintain your own backups

**Indemnification:**
• You agree to indemnify AizyNodes against claims arising from your use of services
• This includes legal fees and damages

**Dispute Resolution:**
• Disputes resolved through arbitration
• Governing law: Indian jurisdiction
• Venue: Appropriate Indian courts`
  }
];

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - AizyNodes</title>
        <meta name="description" content="Read AizyNodes's Terms of Service. Understand our policies for game server hosting, VPS services, payments, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Terms of </span>
                <span className="gradient-text">Service</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated: December 19, 2024
              </p>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Navigation</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {sections.map((section, index) => (
                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors truncate"
                    >
                      {section.title.split('. ')[1]}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sections */}
            <div className="max-w-4xl mx-auto space-y-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    id={`section-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="glass rounded-2xl p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line pl-0 md:pl-16">
                      {section.content.split('**').map((part, i) => 
                        i % 2 === 0 ? part : <strong key={i} className="text-foreground">{part}</strong>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-4xl mx-auto mt-12"
            >
              <div className="glass rounded-2xl p-6 md:p-8 text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Questions about our Terms?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Contact our support team for any clarifications.
                </p>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Contact Support
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Terms;
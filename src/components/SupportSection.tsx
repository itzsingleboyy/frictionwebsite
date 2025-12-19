import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Clock, Send, Headphones } from "lucide-react";

const SupportSection = () => {
  const [message, setMessage] = useState("");

  return (
    <section id="support" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-600/10 blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6">
                <Headphones className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-300">Support</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">24/7 - 365 </span>
                <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  Support
                </span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Our friendly support team is available day and night to assist you
                with any question or concern. Expect a quick response and expert
                knowledge.
              </p>

              {/* Contact Methods */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-lg border border-red-500/10 p-4 rounded-xl hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Average Response Time
                    </p>
                    <p className="text-sm text-zinc-500">
                      Under 5 minutes
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-lg border border-red-500/10 p-4 rounded-xl hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email Support</p>
                    <p className="text-sm text-zinc-500">
                      support@frictionhost.com
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-lg border border-red-500/10 p-4 rounded-xl hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Discord</p>
                    <p className="text-sm text-zinc-500">
                      Join our community server
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Chat Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/80 backdrop-blur-lg border border-red-500/10 p-6 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-500/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Live Chat</p>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-green-500"
                    />
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 min-h-[200px]">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end"
                >
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-2xl rounded-tr-md max-w-[80%]">
                    <p className="text-sm">
                      Hey, I need help setting up my server, please help!
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-start"
                >
                  <div className="bg-zinc-800 border border-red-500/20 text-white px-4 py-3 rounded-2xl rounded-tl-md max-w-[80%]">
                    <p className="text-sm">
                      Hi there! 👋 I'd be happy to help you set up your server.
                      What game are you looking to host?
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 rounded-xl border border-red-500/20 focus:border-red-500 focus:outline-none transition-colors"
                />
                <Button variant="hero" size="icon" className="w-12 h-12 rounded-xl">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Pratheek",
    role: "Minecraft Server Owner",
    content:
      "LordCloud has been amazing! My server runs smooth 24/7 with no lag. The support team is incredibly responsive.",
    rating: 5,
    avatar: "P",
  },
  {
    name: "Arjun K",
    role: "GTA RP Community",
    content:
      "Best hosting I've used for FiveM. The performance is outstanding and the setup was instant. Highly recommend!",
    rating: 5,
    avatar: "A",
  },
  {
    name: "Rahul M",
    role: "Gaming Community Leader",
    content:
      "Switched from another host and the difference is night and day. Zero downtime and excellent ping for all players.",
    rating: 5,
    avatar: "R",
  },
  {
    name: "Sneha P",
    role: "Palworld Server Admin",
    content:
      "The RAM calculator helped me choose the perfect plan. My Palworld server handles 50+ players without issues!",
    rating: 5,
    avatar: "S",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0c0229]">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-purple-300">Testimonials</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Why We Are Rated </span>
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Excellent
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg">
            See what our customers have to say about their experience with LordCloud.
          </p>
        </motion.div>

        {/* Trustpilot Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-purple-900/30 backdrop-blur-lg border border-purple-500/30 px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-green-500 fill-green-500"
                />
              ))}
            </div>
            <div className="h-8 w-px bg-purple-500/30" />
            <div>
              <span className="font-bold text-white">Trustpilot</span>
              <p className="text-xs text-purple-300">
                TrustScore 4.7 | 100+ reviews
              </p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-purple-900/20 backdrop-blur-lg border border-purple-500/20 p-6 rounded-2xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            >
              <Quote className="w-8 h-8 text-purple-500/30 mb-4 group-hover:text-purple-500/50 transition-colors" />
              <p className="text-white/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-purple-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

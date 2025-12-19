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

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-muted-foreground">Testimonials</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Why We Are Rated</span>{" "}
            <span className="text-gradient">Excellent</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our customers have to say about their experience with LordCloud.
          </p>
        </div>

        {/* Trustpilot Badge */}
        <div className="flex justify-center mb-12">
          <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-green-500 fill-green-500"
                />
              ))}
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="font-bold text-foreground">Trustpilot</span>
              <p className="text-xs text-muted-foreground">
                TrustScore 4.7 | 100+ reviews
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl shadow-card hover:shadow-glow transition-all duration-500 group"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import TiltCard from "./TiltCard";
import type { User } from "@supabase/supabase-js";

interface Review {
  id: string;
  user_name: string | null;
  user_email: string;
  rating: number;
  content: string;
  created_at: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (data) {
      setReviews(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getDisplayName = (review: Review) => {
    if (review.user_name) return review.user_name;
    const email = review.user_email;
    return email.split("@")[0].slice(0, 2).toUpperCase();
  };

  const getInitial = (review: Review) => {
    if (review.user_name) return review.user_name.charAt(0).toUpperCase();
    return review.user_email.charAt(0).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-300">Customer Reviews</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">What Our </span>
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Real reviews from real gamers using our servers
          </p>
        </motion.div>

        {/* Stats */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="bg-zinc-900/80 backdrop-blur-lg border border-red-500/20 px-6 py-4 rounded-2xl flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  {averageRating}
                </div>
                <div className="flex gap-0.5 justify-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.round(parseFloat(averageRating))
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px bg-red-500/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {reviews.length}
                </div>
                <p className="text-xs text-zinc-400">Reviews</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="text-center text-zinc-400">Loading reviews...</div>
        ) : reviews.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {reviews.map((review) => (
              <motion.div key={review.id} variants={itemVariants}>
                <TiltCard intensity={5}>
                  <div className="group bg-zinc-900/50 backdrop-blur-lg border border-red-500/10 p-6 rounded-2xl transition-all duration-500 hover:border-red-500/30 h-full">
                    {/* Rating */}
                    <div className="flex gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i <= review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-zinc-600"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-white/90 mb-4 leading-relaxed line-clamp-4">
                      "{review.content}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold">
                        {getInitial(review)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {getDisplayName(review)}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {formatDate(review.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-zinc-400 mb-12">
            No reviews yet. Be the first to review!
          </div>
        )}

        {/* Write Review Section */}
        <div className="max-w-lg mx-auto">
          {user ? (
            showForm ? (
              <ReviewForm
                user={user}
                onReviewSubmitted={() => {
                  setShowForm(false);
                  fetchReviews();
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setShowForm(true)}
                  className="gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Write a Review
                </Button>
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center bg-zinc-900/50 backdrop-blur-lg border border-red-500/20 p-6 rounded-2xl"
            >
              <UserIcon className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 mb-4">
                Sign in to write a review
              </p>
              <Link to="/auth">
                <Button variant="hero" className="gap-2">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

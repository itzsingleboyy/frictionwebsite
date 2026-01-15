import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

interface ReviewFormProps {
  user: User;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ user, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }

    if (content.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please write at least 10 characters",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      user_email: user.email || "",
      user_name: userName.trim() || null,
      rating,
      content: content.trim(),
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error submitting review",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback",
    });

    setRating(0);
    setContent("");
    setUserName("");
    onReviewSubmitted();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-zinc-900/50 backdrop-blur-lg border border-red-500/20 p-6 rounded-2xl"
    >
      <h3 className="font-display text-xl font-bold text-white mb-4">
        Write a Review
      </h3>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-2">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-zinc-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name (optional) */}
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-2">
          Display Name (optional)
        </label>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="How should we display your name?"
          className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
          maxLength={50}
        />
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <label className="block text-sm text-zinc-400 mb-2">Your Review</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience with AizyNodes..."
          className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[100px]"
          maxLength={500}
        />
        <p className="text-xs text-zinc-500 mt-1">{content.length}/500</p>
      </div>

      <Button
        type="submit"
        variant="hero"
        disabled={isSubmitting}
        className="w-full gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Review
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default ReviewForm;

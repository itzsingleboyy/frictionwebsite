import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Plan {
  name: string;
  price: number;
  ram: string;
  cpu: string;
  storage: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

const UPI_ID = "shashankfan@axl";

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyUPI = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitOrder = async () => {
    if (!plan) return;
    
    if (!transactionId.trim()) {
      toast.error("Please enter your UPI transaction ID");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to place an order");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("orders").insert({
        user_id: user.id,
        plan_name: plan.name,
        plan_price: plan.price,
        ram: plan.ram,
        cpu: plan.cpu,
        storage: plan.storage,
        upi_transaction_id: transactionId.trim(),
        status: "pending",
      });

      if (error) throw error;

      toast.success("Order placed successfully! Admin will verify your payment.");
      setTransactionId("");
      onClose();
    } catch (error: any) {
      console.error("Order error:", error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-red-500" />
                Payment
              </h2>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Plan Summary */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400">Plan</span>
                <span className="text-white font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400">RAM</span>
                <span className="text-white">{plan.ram}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400">CPU</span>
                <span className="text-white">{plan.cpu}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Storage</span>
                <span className="text-white">{plan.storage}</span>
              </div>
              <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between items-center">
                <span className="text-white font-semibold">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  ₹{plan.price}/mo
                </span>
              </div>
            </div>

            {/* UPI Payment */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">
                Pay via UPI
              </label>
              <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-3">
                <span className="text-white font-mono flex-1">{UPI_ID}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUPI}
                  className="text-red-500 hover:text-red-400"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="mb-6">
              <label className="block text-sm text-zinc-400 mb-2">
                UPI Transaction ID (after payment)
              </label>
              <Input
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your UPI transaction ID"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            {/* Info */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-200">
                  After payment, enter your transaction ID. Admin will verify and activate your server within 24 hours.
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button
              variant="hero"
              className="w-full"
              onClick={handleSubmitOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
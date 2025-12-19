import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, CreditCard, Clock, Tag, Percent } from "lucide-react";
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

interface Coupon {
  code: string;
  discount: number;
  description: string;
}

const COUPONS: Coupon[] = [
  { code: "WELCOME10", discount: 10, description: "10% off for new users" },
  { code: "FRICTION20", discount: 20, description: "20% special discount" },
  { code: "SUMMER25", discount: 25, description: "25% summer sale" },
  { code: "MEGA50", discount: 50, description: "50% mega discount" },
];

const UPI_ID = "shashankfan@axl";

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const copyUPI = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setCouponLoading(true);
    
    setTimeout(() => {
      const foundCoupon = COUPONS.find(
        (c) => c.code.toLowerCase() === couponCode.trim().toLowerCase()
      );

      if (foundCoupon) {
        setAppliedCoupon(foundCoupon);
        toast.success(`Coupon applied! ${foundCoupon.discount}% off`);
      } else {
        toast.error("Invalid coupon code");
      }
      setCouponLoading(false);
    }, 500);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const getDiscountedPrice = () => {
    if (!plan) return 0;
    if (!appliedCoupon) return plan.price;
    return Math.round(plan.price * (1 - appliedCoupon.discount / 100));
  };

  const getDiscount = () => {
    if (!plan || !appliedCoupon) return 0;
    return plan.price - getDiscountedPrice();
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
        plan_price: getDiscountedPrice(),
        ram: plan.ram,
        cpu: plan.cpu,
        storage: plan.storage,
        upi_transaction_id: transactionId.trim(),
        status: "pending",
      });

      if (error) throw error;

      toast.success("Order placed successfully! Admin will verify your payment.");
      setTransactionId("");
      setCouponCode("");
      setAppliedCoupon(null);
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
            className="glass-strong rounded-2xl p-6 w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                Payment
              </h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Plan Summary */}
            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Plan</span>
                <span className="text-foreground font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">RAM</span>
                <span className="text-foreground">{plan.ram}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">CPU</span>
                <span className="text-foreground">{plan.cpu}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Storage</span>
                <span className="text-foreground">{plan.storage}</span>
              </div>
              <div className="border-t border-border mt-4 pt-4">
                {appliedCoupon && (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-muted-foreground">₹{plan.price}/mo</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-400 flex items-center gap-1">
                        <Percent className="w-4 h-4" />
                        Discount ({appliedCoupon.discount}%)
                      </span>
                      <span className="text-green-400">-₹{getDiscount()}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold">Total</span>
                  <div className="text-right">
                    {appliedCoupon && (
                      <span className="text-sm text-muted-foreground/60 line-through mr-2">
                        ₹{plan.price}
                      </span>
                    )}
                    <span className="text-2xl font-bold gradient-text">
                      ₹{getDiscountedPrice()}/mo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Coupon Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div>
                    <span className="text-green-400 font-semibold">{appliedCoupon.code}</span>
                    <p className="text-xs text-green-300/70">{appliedCoupon.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeCoupon}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="bg-secondary border-border text-foreground uppercase"
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <Button
                    variant="outline"
                    onClick={applyCoupon}
                    disabled={couponLoading}
                    className="border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </Button>
                </div>
              )}
            </div>

            {/* UPI Payment */}
            <div className="mb-6">
              <label className="block text-sm text-muted-foreground mb-2">
                Pay via UPI
              </label>
              <div className="flex items-center gap-2 bg-secondary rounded-lg p-3">
                <span className="text-foreground font-mono flex-1">{UPI_ID}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUPI}
                  className="text-primary hover:text-accent"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="mb-6">
              <label className="block text-sm text-muted-foreground mb-2">
                UPI Transaction ID (after payment)
              </label>
              <Input
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your UPI transaction ID"
                className="bg-secondary border-border text-foreground"
              />
            </div>

            {/* Info */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-accent/80">
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

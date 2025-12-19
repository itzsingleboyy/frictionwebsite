import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Server, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

interface Order {
  id: string;
  plan_name: string;
  plan_price: number;
  ram: string;
  cpu: string;
  storage: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  upi_transaction_id: string | null;
  panel_link: string | null;
  server_created: boolean;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
      fetchOrders();
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "approved":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/30";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/30";
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - FrictionHost</title>
        <meta name="description" content="View and manage your game servers" />
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
              className="mb-12"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">My </span>
                <span className="gradient-text">
                  Dashboard
                </span>
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </motion.div>

            {/* Orders */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Server className="w-6 h-6 text-primary" />
                My Orders
              </h2>

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                </div>
              ) : orders.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Server className="w-16 h-16 text-muted mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">Start by purchasing a server plan</p>
                  <Button variant="hero" onClick={() => navigate("/pricing")}>
                    View Plans
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-xl p-6 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-foreground">{order.plan_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>RAM: {order.ram}</span>
                            <span>CPU: {order.cpu}</span>
                            <span>Storage: {order.storage}</span>
                          </div>
                          <p className="text-xs text-muted mt-2">
                            Ordered: {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold gradient-text">
                              ₹{order.plan_price}
                            </div>
                            <div className="text-xs text-muted">/month</div>
                          </div>
                          
                          {order.status === "approved" && order.panel_link && (
                            <Button variant="hero" size="sm" asChild>
                              <a href={order.panel_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open Panel
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Clock, CheckCircle, XCircle, Users, Server, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface Order {
  id: string;
  user_id: string;
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

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelLinks, setPanelLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
      
      // Check if user is admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast.error("Access denied. Admin only.");
        navigate("/dashboard");
        return;
      }
      
      setIsAdmin(true);
      fetchOrders();
    };

    checkAuth();
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

  const updateOrderStatus = async (orderId: string, status: "approved" | "rejected") => {
    try {
      const panelLink = status === "approved" ? panelLinks[orderId] : null;
      
      const { error } = await supabase
        .from("orders")
        .update({
          status,
          panel_link: panelLink,
          server_created: status === "approved",
        })
        .eq("id", orderId);

      if (error) throw error;

      toast.success(`Order ${status} successfully!`);
      fetchOrders();
    } catch (error: any) {
      toast.error(error.message || "Failed to update order");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "approved":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    approved: orders.filter(o => o.status === "approved").length,
    revenue: orders.filter(o => o.status === "approved").reduce((sum, o) => sum + Number(o.plan_price), 0),
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - FrictionHost</title>
        <meta name="description" content="Admin dashboard for managing orders" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
                <Shield className="w-10 h-10 text-red-500" />
                <span className="text-white">Admin </span>
                <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                  Panel
                </span>
              </h1>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Server className="w-8 h-8 text-zinc-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                    <div className="text-xs text-zinc-500">Total Orders</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.pending}</div>
                    <div className="text-xs text-zinc-500">Pending</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.approved}</div>
                    <div className="text-xs text-zinc-500">Approved</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold text-white">₹{stats.revenue}</div>
                    <div className="text-xs text-zinc-500">Revenue</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Orders Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-xl font-bold text-white">All Orders</h2>
              </div>

              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto" />
                </div>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-zinc-400">No orders yet</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-white">{order.plan_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm text-zinc-400 space-y-1">
                            <p>User ID: {order.user_id.slice(0, 8)}...</p>
                            <p>Transaction ID: {order.upi_transaction_id || "N/A"}</p>
                            <p>Price: ₹{order.plan_price}/mo</p>
                            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {order.status === "pending" && (
                          <div className="flex flex-col gap-2">
                            <Input
                              placeholder="Panel link (optional)"
                              value={panelLinks[order.id] || ""}
                              onChange={(e) => setPanelLinks({ ...panelLinks, [order.id]: e.target.value })}
                              className="bg-zinc-800 border-zinc-700 text-white text-sm"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="hero"
                                onClick={() => updateOrderStatus(order.id, "approved")}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateOrderStatus(order.id, "rejected")}
                                className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}

                        {order.status === "approved" && order.panel_link && (
                          <a
                            href={order.panel_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-400 text-sm underline"
                          >
                            {order.panel_link}
                          </a>
                        )}
                      </div>
                    </div>
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

export default Admin;
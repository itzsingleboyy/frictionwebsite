import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Clock, CheckCircle, XCircle, Users, Server, DollarSign, Trash2, Edit, Palette } from "lucide-react";
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
  panel_id: string | null;
  panel_password: string | null;
  server_created: boolean;
  created_at: string;
}

interface PanelCredentials {
  link: string;
  id: string;
  password: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelCredentials, setPanelCredentials] = useState<Record<string, PanelCredentials>>({});
  const [editingOrder, setEditingOrder] = useState<string | null>(null);

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
      const credentials = panelCredentials[orderId];
      
      const updateData: any = {
        status,
        server_created: status === "approved",
      };

      if (status === "approved" && credentials) {
        updateData.panel_link = credentials.link || null;
        updateData.panel_id = credentials.id || null;
        updateData.panel_password = credentials.password || null;
      }
      
      const { error } = await supabase
        .from("orders")
        .update(updateData)
        .eq("id", orderId);

      if (error) throw error;

      toast.success(`Order ${status} successfully!`);
      setEditingOrder(null);
      setPanelCredentials(prev => {
        const newCreds = { ...prev };
        delete newCreds[orderId];
        return newCreds;
      });
      fetchOrders();
    } catch (error: any) {
      toast.error(error.message || "Failed to update order");
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (error) throw error;

      toast.success("Order deleted successfully!");
      fetchOrders();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete order");
    }
  };

  const updateCredentials = (orderId: string, field: keyof PanelCredentials, value: string) => {
    setPanelCredentials(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  const startEditing = (order: Order) => {
    setEditingOrder(order.id);
    setPanelCredentials(prev => ({
      ...prev,
      [order.id]: {
        link: order.panel_link || "",
        id: order.panel_id || "",
        password: order.panel_password || "",
      },
    }));
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

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    approved: orders.filter(o => o.status === "approved").length,
    revenue: orders.filter(o => o.status === "approved").reduce((sum, o) => sum + Number(o.plan_price), 0),
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel - AizyNodes</title>
        <meta name="description" content="Admin dashboard for managing orders" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="font-display text-4xl md:text-5xl font-bold flex items-center gap-3">
                  <Shield className="w-10 h-10 text-primary" />
                  <span className="text-foreground">Admin </span>
                  <span className="gradient-text">Panel</span>
                </h1>
                <Button
                  variant="hero"
                  onClick={() => navigate("/admin/editor")}
                  className="w-fit"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Site Editor
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Server className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                    <div className="text-xs text-muted-foreground">Total Orders</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stats.approved}</div>
                    <div className="text-xs text-muted-foreground">Approved</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">₹{stats.revenue}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Orders Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">All Orders</h2>
              </div>

              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                </div>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-muted-foreground">No orders yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-foreground">{order.plan_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>User ID: {order.user_id.slice(0, 8)}...</p>
                            <p>Transaction ID: {order.upi_transaction_id || "N/A"}</p>
                            <p>Price: ₹{order.plan_price}/mo</p>
                            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                          </div>

                          {/* Show existing panel credentials if approved */}
                          {order.status === "approved" && (order.panel_link || order.panel_id) && editingOrder !== order.id && (
                            <div className="mt-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                              <p className="text-xs text-green-400 font-medium mb-1">Panel Credentials:</p>
                              {order.panel_link && <p className="text-xs text-muted-foreground">Link: {order.panel_link}</p>}
                              {order.panel_id && <p className="text-xs text-muted-foreground">ID: {order.panel_id}</p>}
                              {order.panel_password && <p className="text-xs text-muted-foreground">Password: {order.panel_password}</p>}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {/* Edit mode or pending order - show credential inputs */}
                          {(editingOrder === order.id || order.status === "pending") && (
                            <div className="flex flex-col gap-2 min-w-[280px]">
                              <Input
                                placeholder="Panel Link"
                                value={panelCredentials[order.id]?.link || ""}
                                onChange={(e) => updateCredentials(order.id, "link", e.target.value)}
                                className="bg-secondary border-border text-foreground text-sm"
                              />
                              <Input
                                placeholder="Panel ID"
                                value={panelCredentials[order.id]?.id || ""}
                                onChange={(e) => updateCredentials(order.id, "id", e.target.value)}
                                className="bg-secondary border-border text-foreground text-sm"
                              />
                              <Input
                                placeholder="Panel Password"
                                value={panelCredentials[order.id]?.password || ""}
                                onChange={(e) => updateCredentials(order.id, "password", e.target.value)}
                                className="bg-secondary border-border text-foreground text-sm"
                              />
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="flex flex-wrap gap-2">
                            {(editingOrder === order.id || order.status === "pending") ? (
                              <>
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
                                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                                {editingOrder === order.id && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingOrder(null)}
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditing(order)}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit Status
                              </Button>
                            )}
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteOrder(order.id)}
                              className="text-destructive border-destructive/30 hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
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

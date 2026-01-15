import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Type, 
  Palette, 
  DollarSign, 
  Image, 
  Save, 
  ArrowLeft,
  Plus,
  Trash2,
  RefreshCw
} from "lucide-react";
import { useSiteSettings, HeroSettings, ColorSettings, FeaturesSettings, PricingSettings, SocialSettings, BrandingSettings } from "@/hooks/useSiteSettings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Editor = () => {
  const navigate = useNavigate();
  const { settings, loading, updateSetting, getSetting } = useSiteSettings();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);

  // Local state for editing
  const [hero, setHero] = useState<HeroSettings>({
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    offerCode: ""
  });
  
  const [colors, setColors] = useState<ColorSettings>({
    primary: "",
    secondary: "",
    accent: "",
    background: ""
  });

  const [features, setFeatures] = useState<FeaturesSettings>({
    title: "",
    items: []
  });

  const [pricing, setPricing] = useState<PricingSettings>({
    plans: []
  });

  const [social, setSocial] = useState<SocialSettings>({
    discord: "",
    instagram: "",
    twitter: ""
  });

  const [branding, setBranding] = useState<BrandingSettings>({
    siteName: "",
    tagline: ""
  });

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast.error("Admin access required");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      setChecking(false);
    };

    checkAdmin();
  }, [navigate]);

  // Load settings into local state
  useEffect(() => {
    if (!loading && Object.keys(settings).length > 0) {
      setHero(getSetting<HeroSettings>("hero", hero));
      setColors(getSetting<ColorSettings>("colors", colors));
      setFeatures(getSetting<FeaturesSettings>("features", features));
      setPricing(getSetting<PricingSettings>("pricing_minecraft", pricing));
      setSocial(getSetting<SocialSettings>("social", social));
      setBranding(getSetting<BrandingSettings>("branding", branding));
    }
  }, [loading, settings]);

  const handleSave = async (key: string, value: any) => {
    setSaving(true);
    await updateSetting(key, value);
    setSaving(false);
  };

  const addFeature = () => {
    setFeatures(prev => ({
      ...prev,
      items: [...prev.items, { title: "", description: "" }]
    }));
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, field: "title" | "description", value: string) => {
    setFeatures(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addPlan = () => {
    setPricing(prev => ({
      plans: [...prev.plans, { name: "", ram: "", cpu: "", storage: "", price: 0 }]
    }));
  };

  const removePlan = (index: number) => {
    setPricing(prev => ({
      plans: prev.plans.filter((_, i) => i !== index)
    }));
  };

  const updatePlan = (index: number, field: keyof typeof pricing.plans[0], value: string | number) => {
    setPricing(prev => ({
      plans: prev.plans.map((plan, i) => 
        i === index ? { ...plan, [field]: value } : plan
      )
    }));
  };

  if (checking || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading editor...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Site Editor | Admin</title>
      </Helmet>
      
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigate("/admin")}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold font-heading gradient-text">Site Editor</h1>
                <p className="text-muted-foreground">Customize your website content and appearance</p>
              </div>
            </div>
          </div>

          {/* Editor Tabs */}
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="glass p-1">
              <TabsTrigger value="content" className="gap-2">
                <Type className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="theme" className="gap-2">
                <Palette className="w-4 h-4" />
                Theme
              </TabsTrigger>
              <TabsTrigger value="pricing" className="gap-2">
                <DollarSign className="w-4 h-4" />
                Pricing
              </TabsTrigger>
              <TabsTrigger value="branding" className="gap-2">
                <Image className="w-4 h-4" />
                Branding
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              {/* Hero Section */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                  <CardDescription>Main landing page content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input 
                        value={hero.title}
                        onChange={(e) => setHero(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Main title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtitle</Label>
                      <Input 
                        value={hero.subtitle}
                        onChange={(e) => setHero(prev => ({ ...prev, subtitle: e.target.value }))}
                        placeholder="Subtitle text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      value={hero.description}
                      onChange={(e) => setHero(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Hero description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input 
                        value={hero.buttonText}
                        onChange={(e) => setHero(prev => ({ ...prev, buttonText: e.target.value }))}
                        placeholder="CTA button text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Offer Code</Label>
                      <Input 
                        value={hero.offerCode}
                        onChange={(e) => setHero(prev => ({ ...prev, offerCode: e.target.value }))}
                        placeholder="Promo code"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleSave("hero", hero)}
                    disabled={saving}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Hero Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Features Section */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Features Section</CardTitle>
                  <CardDescription>Highlight your key features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input 
                      value={features.title}
                      onChange={(e) => setFeatures(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Features section title"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Feature Items</Label>
                      <Button variant="outline" size="sm" onClick={addFeature}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                    
                    {features.items.map((item, index) => (
                      <div key={index} className="glass-subtle rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Feature {index + 1}</span>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFeature(index)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Input 
                            value={item.title}
                            onChange={(e) => updateFeature(index, "title", e.target.value)}
                            placeholder="Feature title"
                          />
                          <Input 
                            value={item.description}
                            onChange={(e) => updateFeature(index, "description", e.target.value)}
                            placeholder="Feature description"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => handleSave("features", features)}
                    disabled={saving}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Features
                  </Button>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Connect your social media</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Discord</Label>
                      <Input 
                        value={social.discord}
                        onChange={(e) => setSocial(prev => ({ ...prev, discord: e.target.value }))}
                        placeholder="Discord invite link"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Instagram</Label>
                      <Input 
                        value={social.instagram}
                        onChange={(e) => setSocial(prev => ({ ...prev, instagram: e.target.value }))}
                        placeholder="Instagram profile URL"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter</Label>
                      <Input 
                        value={social.twitter}
                        onChange={(e) => setSocial(prev => ({ ...prev, twitter: e.target.value }))}
                        placeholder="Twitter profile URL"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleSave("social", social)}
                    disabled={saving}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Social Links
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Theme Tab */}
            <TabsContent value="theme" className="space-y-6">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Color Theme</CardTitle>
                  <CardDescription>Customize your website colors (HSL format)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={colors.primary}
                          onChange={(e) => setColors(prev => ({ ...prev, primary: e.target.value }))}
                          placeholder="258 89% 66%"
                        />
                        <div 
                          className="w-10 h-10 rounded border border-white/20"
                          style={{ backgroundColor: `hsl(${colors.primary})` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={colors.secondary}
                          onChange={(e) => setColors(prev => ({ ...prev, secondary: e.target.value }))}
                          placeholder="234 47% 34%"
                        />
                        <div 
                          className="w-10 h-10 rounded border border-white/20"
                          style={{ backgroundColor: `hsl(${colors.secondary})` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={colors.accent}
                          onChange={(e) => setColors(prev => ({ ...prev, accent: e.target.value }))}
                          placeholder="280 100% 70%"
                        />
                        <div 
                          className="w-10 h-10 rounded border border-white/20"
                          style={{ backgroundColor: `hsl(${colors.accent})` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={colors.background}
                          onChange={(e) => setColors(prev => ({ ...prev, background: e.target.value }))}
                          placeholder="240 54% 13%"
                        />
                        <div 
                          className="w-10 h-10 rounded border border-white/20"
                          style={{ backgroundColor: `hsl(${colors.background})` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter colors in HSL format: "hue saturation% lightness%" (e.g., "258 89% 66%")
                  </p>
                  <Button 
                    onClick={() => handleSave("colors", colors)}
                    disabled={saving}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Theme Colors
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6">
              <Card className="glass border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Minecraft Hosting Plans</CardTitle>
                      <CardDescription>Configure your pricing plans</CardDescription>
                    </div>
                    <Button variant="outline" onClick={addPlan}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pricing.plans.map((plan, index) => (
                    <div key={index} className="glass-subtle rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Plan {index + 1}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removePlan(index)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Name</Label>
                          <Input 
                            value={plan.name}
                            onChange={(e) => updatePlan(index, "name", e.target.value)}
                            placeholder="Starter"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">RAM</Label>
                          <Input 
                            value={plan.ram}
                            onChange={(e) => updatePlan(index, "ram", e.target.value)}
                            placeholder="2GB"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">CPU</Label>
                          <Input 
                            value={plan.cpu}
                            onChange={(e) => updatePlan(index, "cpu", e.target.value)}
                            placeholder="2 vCPU"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Storage</Label>
                          <Input 
                            value={plan.storage}
                            onChange={(e) => updatePlan(index, "storage", e.target.value)}
                            placeholder="10GB SSD"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Price (₹)</Label>
                          <Input 
                            type="number"
                            value={plan.price}
                            onChange={(e) => updatePlan(index, "price", parseInt(e.target.value) || 0)}
                            placeholder="149"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    onClick={() => handleSave("pricing_minecraft", pricing)}
                    disabled={saving}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Pricing Plans
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle>Branding</CardTitle>
                  <CardDescription>Your brand identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Site Name</Label>
                      <Input 
                        value={branding.siteName}
                        onChange={(e) => setBranding(prev => ({ ...prev, siteName: e.target.value }))}
                        placeholder="FrictionHost"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tagline</Label>
                      <Input 
                        value={branding.tagline}
                        onChange={(e) => setBranding(prev => ({ ...prev, tagline: e.target.value }))}
                        placeholder="Premium Game Servers"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleSave("branding", branding)}
                    disabled={saving}
                    className="w-full"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Branding
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Editor;

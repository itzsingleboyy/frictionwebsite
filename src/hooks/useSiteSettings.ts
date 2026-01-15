import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, any>;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  offerCode: string;
}

export interface ColorSettings {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeaturesSettings {
  title: string;
  items: FeatureItem[];
}

export interface PricingPlan {
  name: string;
  ram: string;
  cpu: string;
  storage: string;
  price: number;
}

export interface PricingSettings {
  plans: PricingPlan[];
}

export interface SocialSettings {
  discord: string;
  instagram: string;
  twitter: string;
}

export interface BrandingSettings {
  siteName: string;
  tagline: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, SiteSetting>>({});
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      const settingsMap: Record<string, SiteSetting> = {};
      data?.forEach((setting: SiteSetting) => {
        settingsMap[setting.key] = setting;
      });
      setSettings(settingsMap);
    } catch (error: any) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: Record<string, any>) => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", key);

      if (error) throw error;
      
      setSettings(prev => ({
        ...prev,
        [key]: { ...prev[key], value }
      }));
      
      toast.success("Setting updated successfully!");
      return true;
    } catch (error: any) {
      console.error("Error updating setting:", error);
      toast.error("Failed to update setting");
      return false;
    }
  };

  const getSetting = <T>(key: string, defaultValue: T): T => {
    return (settings[key]?.value as T) || defaultValue;
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    updateSetting,
    getSetting,
    refetch: fetchSettings
  };
}

export function useSiteSettingsPublic() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value");

        if (error) throw error;

        const settingsMap: Record<string, any> = {};
        data?.forEach((setting: { key: string; value: any }) => {
          settingsMap[setting.key] = setting.value;
        });
        setSettings(settingsMap);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}

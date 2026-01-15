-- Create site_settings table to store customizable website content
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed for website to display)
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can modify settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value, category) VALUES
  ('hero', '{"title": "Friction Host", "subtitle": "Premium Game Servers", "description": "High-performance game hosting with 24/7 support", "buttonText": "Get Started", "offerCode": "STARTER10"}', 'content'),
  ('colors', '{"primary": "258 89% 66%", "secondary": "234 47% 34%", "accent": "280 100% 70%", "background": "240 54% 13%"}', 'theme'),
  ('features', '{"title": "Why Choose Us?", "items": [{"title": "99.9% Uptime", "description": "Enterprise-grade reliability"}, {"title": "24/7 Support", "description": "Always here to help"}, {"title": "DDoS Protection", "description": "Advanced security included"}, {"title": "Instant Setup", "description": "Ready in minutes"}]}', 'content'),
  ('pricing_minecraft', '{"plans": [{"name": "Starter", "ram": "2GB", "cpu": "2 vCPU", "storage": "10GB SSD", "price": 149}, {"name": "Growth", "ram": "4GB", "cpu": "4 vCPU", "storage": "25GB SSD", "price": 299}, {"name": "Pro", "ram": "8GB", "cpu": "6 vCPU", "storage": "50GB SSD", "price": 549}]}', 'pricing'),
  ('social', '{"discord": "https://discord.gg/frictionhost", "instagram": "", "twitter": ""}', 'general'),
  ('branding', '{"siteName": "FrictionHost", "tagline": "Premium Game Servers"}', 'general');
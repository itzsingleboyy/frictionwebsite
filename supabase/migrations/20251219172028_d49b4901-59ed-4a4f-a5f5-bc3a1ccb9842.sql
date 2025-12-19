-- Add panel_id and panel_password columns to orders table
ALTER TABLE public.orders 
ADD COLUMN panel_id TEXT,
ADD COLUMN panel_password TEXT;

-- Allow admins to delete orders
CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));
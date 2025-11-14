-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Create RLS policies for product images
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Sellers can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.uid() IS NOT NULL
  AND has_role(auth.uid(), 'seller'::app_role)
);

CREATE POLICY "Sellers can update own product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND auth.uid() IS NOT NULL
  AND has_role(auth.uid(), 'seller'::app_role)
);

CREATE POLICY "Sellers can delete own product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.uid() IS NOT NULL
  AND has_role(auth.uid(), 'seller'::app_role)
);
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ShieldCheck, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image_url: string | null;
  hygiene_notes: string | null;
  description: string | null;
  seller_id: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      navigate("/products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/auth?role=buyer");
      return;
    }

    if (userRole !== "buyer") {
      toast({
        title: "Access Required",
        description: "Please sign in as a buyer to purchase products",
        variant: "destructive",
      });
      return;
    }

    navigate(`/checkout/${id}?quantity=${orderQuantity}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/products")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <span className="text-9xl">🐟</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <p className="text-3xl font-bold text-primary">₹{product.price}</p>
            </div>

            {product.description && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-foreground">{product.description}</p>
                </CardContent>
              </Card>
            )}

            {product.hygiene_notes && (
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Hygiene Certification</h3>
                      <p className="text-sm text-muted-foreground">{product.hygiene_notes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Availability</p>
                    <p className="text-sm text-muted-foreground">
                      {product.quantity > 0 
                        ? `${product.quantity} units in stock`
                        : "Currently out of stock"}
                    </p>
                  </div>
                </div>

                {product.quantity > 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min={1}
                        max={product.quantity}
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Math.max(1, Math.min(product.quantity, parseInt(e.target.value) || 1)))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{(product.price * orderQuantity).toFixed(2)}
                      </span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleBuyNow}
                    >
                      Buy Now (COD)
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      💳 Cash on Delivery available • 🚚 Fast delivery
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

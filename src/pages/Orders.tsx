import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface Order {
  id: string;
  quantity: number;
  total_price: number;
  delivery_address: string;
  buyer_phone: string;
  buyer_name: string;
  order_status: string;
  created_at: string;
  products: {
    name: string;
    image_url: string | null;
  };
}

const Orders = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || userRole !== "buyer") {
      navigate("/auth?role=buyer");
      return;
    }
    fetchOrders();
  }, [user, userRole]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          products (name, image_url)
        `)
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Marine Marketplace</h2>
          <UserNav />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/products")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <Button onClick={() => navigate("/products")}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.products.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Order placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.order_status)}>
                      {order.order_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      {order.products.image_url ? (
                        <img 
                          src={order.products.image_url} 
                          alt={order.products.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="text-2xl">🐟</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Quantity:</span>
                        <span className="font-medium">{order.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total:</span>
                        <span className="font-bold text-primary">₹{order.total_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Payment:</span>
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium">Delivery Address:</p>
                        <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

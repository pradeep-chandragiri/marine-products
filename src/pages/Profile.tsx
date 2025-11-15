import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserNav } from "@/components/UserNav";
import { MobileNav } from "@/components/MobileNav";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { User, Package, ShoppingCart, Edit2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Profile {
  full_name: string | null;
  email: string;
  phone: string | null;
}

interface Activity {
  id: string;
  created_at: string;
  total_price: number;
  order_status?: string;
  buyer_name?: string;
  products: { name: string };
}

const Profile = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({ full_name: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0 });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProfile();
    fetchActivities();
  }, [user, userRole]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    }
  };

  const fetchActivities = async () => {
    if (!user) return;

    try {
      if (userRole === "buyer") {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            id,
            created_at,
            total_price,
            order_status,
            products (name)
          `)
          .eq("buyer_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        setActivities(data || []);

        const totalSpent = (data || []).reduce((sum, order) => sum + Number(order.total_price), 0);
        setStats({ totalOrders: data?.length || 0, totalSpent });
      } else if (userRole === "seller") {
        const { data: productsData } = await supabase
          .from("products")
          .select("id")
          .eq("seller_id", user.id);

        if (productsData && productsData.length > 0) {
          const { data, error } = await supabase
            .from("orders")
            .select(`
              id,
              created_at,
              total_price,
              order_status,
              buyer_name,
              products (name)
            `)
            .in("product_id", productsData.map(p => p.id))
            .order("created_at", { ascending: false })
            .limit(10);

          if (error) throw error;
          setActivities(data || []);

          const totalRevenue = (data || []).reduce((sum, order) => sum + Number(order.total_price), 0);
          setStats({ totalOrders: data?.length || 0, totalSpent: totalRevenue });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load activity history",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
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
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Marine Marketplace</h2>
          <UserNav />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription className="capitalize">{userRole} Account</CardDescription>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.full_name || ""}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="+1234567890"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {userRole === "buyer" ? "Total Orders" : "Total Sales"}
                </CardTitle>
                {userRole === "buyer" ? (
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Package className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {userRole === "buyer" ? "Total Spent" : "Total Revenue"}
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.totalSpent.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity History */}
          <Card>
            <CardHeader>
              <CardTitle>
                {userRole === "buyer" ? "Order History" : "Recent Sales"}
              </CardTitle>
              <CardDescription>
                {userRole === "buyer"
                  ? "Your recent purchases"
                  : "Your recent sales"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No activity yet
                </p>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{activity.products.name}</p>
                        {userRole === "seller" && (
                          <p className="text-sm text-muted-foreground">
                            Buyer: {activity.buyer_name}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">${Number(activity.total_price).toFixed(2)}</p>
                        {activity.order_status && (
                          <Badge className={getStatusColor(activity.order_status)}>
                            {activity.order_status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default Profile;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Store, ShoppingBag, Waves, Info } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
              <Waves className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Marine Marketplace</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Fresh Marine Products
            <br />
            Delivered with Trust
          </h1>

          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Connect with trusted marine product sellers and buyers. Quality assured, hygiene certified, and delivered fresh to your doorstep.
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-primary/20 hover:border-primary/40">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Store className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Seller</CardTitle>
                </div>
                <CardDescription className="text-base">
                  List your marine products, manage inventory, and reach more customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={() => navigate("/auth?role=seller")}
                >
                  Start Selling
                </Button>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-secondary/20 hover:border-secondary/40">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <ShoppingBag className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Buyer</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Browse fresh marine products with quality assurance and COD payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/auth?role=buyer")}
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Browse Button */}
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/products")}
              className="gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Browse Products Without Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Marine Marketplace?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                <span className="text-4xl">🐟</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fresh Quality</h3>
              <p className="text-muted-foreground">
                All products are quality-checked and hygiene-certified for your safety
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-secondary/10 mb-4">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Cash on Delivery</h3>
              <p className="text-muted-foreground">
                Pay only when you receive your order. No upfront payment required
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-accent/10 mb-4">
                <span className="text-4xl">🚚</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and reliable delivery to ensure freshness of marine products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Info className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Marine Product Care & Tips</CardTitle>
              <CardDescription className="text-base">
                Learn about hygiene practices, storage tips, and delicious recipes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/awareness")}
              >
                Explore Awareness Hub
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;

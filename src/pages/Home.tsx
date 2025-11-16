import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Store, ShoppingBag, Waves, Info } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3 px-5 py-2 bg-secondary rounded-full">
              <Waves className="h-5 w-5 text-foreground" />
              <span className="font-semibold text-sm">Marine Marketplace</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 text-foreground tracking-tight">
            Fresh Marine Products
            <br />
            <span className="text-muted-foreground">Delivered with Trust</span>
          </h1>

          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Connect with trusted marine product sellers and buyers. Quality assured, hygiene certified, and delivered fresh to your doorstep.
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <Card className="group cursor-pointer transition-all duration-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-muted transition-colors">
                    <Store className="h-7 w-7 text-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold">I'm a Seller</CardTitle>
                </div>
                <CardDescription className="text-base text-muted-foreground">
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

            <Card className="group cursor-pointer transition-all duration-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-muted transition-colors">
                    <ShoppingBag className="h-7 w-7 text-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold">I'm a Buyer</CardTitle>
                </div>
                <CardDescription className="text-base text-muted-foreground">
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Marine Marketplace?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We provide a trusted platform for marine product trading with quality assurance
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-lg bg-secondary mb-4">
                <span className="text-4xl">🐟</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fresh Quality</h3>
              <p className="text-muted-foreground text-sm">
                All products are quality-checked and hygiene-certified for your safety
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 rounded-lg bg-secondary mb-4">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Cash on Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Pay only when you receive your order. No upfront payment required
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 rounded-lg bg-secondary mb-4">
                <span className="text-4xl">🚚</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Quick and reliable delivery to ensure freshness of marine products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awareness CTA */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <Info className="h-8 w-8 text-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Marine Product Care & Tips</CardTitle>
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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Store, ShoppingBag, Waves, Info } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border/50">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-secondary/10 to-primary/10 border border-primary/20 rounded-full">
              <Waves className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm text-foreground">Marine Marketplace</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 text-foreground tracking-tight leading-tight">
            Fresh Marine Products
            <br />
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Delivered with Trust</span>
          </h1>

          <p className="text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed">
            Connect with trusted marine product sellers and buyers. Quality assured, hygiene certified, and delivered fresh to your doorstep.
          </p>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300">
                    <Store className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">I'm a Seller</CardTitle>
                </div>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
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

            <Card className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">I'm a Buyer</CardTitle>
                </div>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
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
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Why Choose Marine Marketplace?</h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
            We provide a trusted platform for marine product trading with quality assurance
          </p>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <Card className="text-center border-none shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 mb-6">
                  <span className="text-5xl">🐟</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Fresh Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All products are quality-checked and hygiene-certified for your safety
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
                  <span className="text-5xl">💳</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Cash on Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pay only when you receive your order. No upfront payment required
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-ocean-light/20 to-ocean-deep/10 mb-6">
                  <span className="text-5xl">🚚</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Fast Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Quick and reliable delivery to ensure freshness of marine products
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awareness CTA */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-[var(--shadow-premium)]">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-ocean-light/20 to-ocean-deep/10">
                  <Info className="h-10 w-10 text-ocean-light" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">Marine Product Care & Tips</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                Learn about hygiene practices, storage tips, and delicious recipes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/awareness")}
                className="px-8"
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

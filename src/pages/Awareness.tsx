import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { BookOpen, Utensils, ShieldCheck, ArrowLeft } from "lucide-react";

interface AwarenessContent {
  id: string;
  title: string;
  description: string;
  content_type: string;
  image_url: string | null;
  created_at: string;
}

const Awareness = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<AwarenessContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("awareness_content")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error("Error fetching awareness content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-6 w-6" />;
      case "recipe":
        return <Utensils className="h-6 w-6" />;
      case "hygiene":
        return <ShieldCheck className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Awareness Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about marine product care, hygiene practices, storage tips, and delicious recipes
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        ) : content.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No content available yet. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {getIcon(item.content_type)}
                    </div>
                    <Badge variant="secondary">{item.content_type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                {item.image_url && (
                  <CardContent>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Default Tips Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">Hygiene First</CardTitle>
                </div>
                <CardDescription>
                  Always check for FSSAI certification and hygiene seals before purchasing marine products.
                  Store at proper temperatures (-18°C for frozen, 0-4°C for fresh).
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Utensils className="h-6 w-6 text-secondary" />
                  <CardTitle className="text-lg">Freshness Check</CardTitle>
                </div>
                <CardDescription>
                  Fresh fish should have clear eyes, firm flesh, and a mild ocean scent.
                  Avoid products with strong fishy odor or discolored appearance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="h-6 w-6 text-accent" />
                  <CardTitle className="text-lg">Proper Storage</CardTitle>
                </div>
                <CardDescription>
                  Keep marine products refrigerated immediately after purchase.
                  Use within 1-2 days for fresh products, check packaging for frozen items.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;

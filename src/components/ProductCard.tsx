import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image_url: string | null;
  hygiene_notes: string | null;
  description: string | null;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-premium)] border-border/50 hover-lift motion-blur-in"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/10 via-primary/5 to-ocean-light/10">
            <span className="text-6xl">🐟</span>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2">{product.name}</h3>
          <Badge variant="secondary" className="shrink-0 font-semibold">{product.category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
        )}
        {product.hygiene_notes && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary text-xs font-semibold">✓ Hygiene certified</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <span className="text-xs text-muted-foreground font-medium">
            {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
          </span>
        </div>
        <Button 
          variant="default"
          size="sm"
          disabled={product.quantity === 0}
          className="font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

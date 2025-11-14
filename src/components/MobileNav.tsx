import { Home, Search, ShoppingBag, User, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const { user, userRole } = useAuth();

  if (!user) return null;

  const buyerNavItems = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Search, label: "Browse", to: "/products" },
    { icon: ShoppingBag, label: "Orders", to: "/orders" },
    { icon: User, label: "Profile", to: "/auth" },
  ];

  const sellerNavItems = [
    { icon: Home, label: "Home", to: "/" },
    { icon: BarChart3, label: "Dashboard", to: "/seller/dashboard" },
    { icon: ShoppingBag, label: "Products", to: "/seller/dashboard" },
    { icon: User, label: "Profile", to: "/auth" },
  ];

  const navItems = userRole === "seller" ? sellerNavItems : buyerNavItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground transition-colors hover:text-primary"
            activeClassName="text-primary font-semibold"
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

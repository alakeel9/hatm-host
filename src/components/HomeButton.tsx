import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
}

export default function HomeButton({ className = "", variant = "outline" }: HomeButtonProps) {
  return (
    <Link to="/" className={className}>
      <Button size="sm" variant={variant} className="shadow-hatm-sm gap-1.5">
        <Home className="w-4 h-4" />
        <span>الرئيسية</span>
      </Button>
    </Link>
  );
}

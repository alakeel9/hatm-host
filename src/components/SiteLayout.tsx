import { Link, Outlet, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import SiteFooter from "./SiteFooter";

export default function SiteLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col sadu-pattern">
      {!isHome && (
        <Link
          to="/"
          aria-label="الرئيسية"
          title="الرئيسية"
          className="fixed bottom-5 left-5 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-hatm-md flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Home className="w-5 h-5" />
        </Link>
      )}
      <div className="flex-1">
        <Outlet />
      </div>
      {!isHome && <SiteFooter />}
    </div>
  );
}

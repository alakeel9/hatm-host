import { Outlet, useLocation } from "react-router-dom";
import HomeButton from "./HomeButton";
import SiteFooter from "./SiteFooter";

export default function SiteLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {!isHome && (
        <div className="fixed top-4 left-4 z-50" dir="rtl">
          <HomeButton variant="default" className="bg-card/90 backdrop-blur rounded-md" />
        </div>
      )}
      <div className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}

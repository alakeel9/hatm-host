import { Link } from "react-router-dom";
import { Instagram, Twitter, Mail } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-card" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold text-base mb-3 text-foreground">
              ضيافة حا<span className="text-accent">تم</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              منصة متكاملة لتنظيم المناسبات وإدارة مزودي الخدمات بكل سهولة.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">روابط سريعة</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">سوق المزودين</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">لوحة التحكم</Link></li>
              <li><Link to="/chatbot" className="hover:text-primary transition-colors">المساعد الذكي</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">تواصل معنا</h4>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a href="https://instagram.com/hatmhost" aria-label="Instagram" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/hatmhost" aria-label="Twitter" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:info@hatmhost.com" aria-label="Email" className="hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-3 text-muted-foreground">@hatmhost</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ضيافة حاتم — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}

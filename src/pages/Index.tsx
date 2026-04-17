import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, LayoutTemplate, Users, QrCode, CheckCircle, ArrowLeft, MapPin, Phone, AtSign, Instagram, Facebook, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import hatmLogo from "@/assets/hatm-logo.png";

const sectionAnim = {
  initial: { opacity: 0, y: 12 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const services = [
  { icon: Mail, title: "إدارة الدعوات", titleEn: "Invitation Management", desc: "أرسل دعوات عبر واتساب، SMS، أو إيميل وتابع الردود لحظياً" },
  { icon: MessageSquare, title: "مساعد حاتم الذكي", titleEn: "Hatim AI Chatbot", desc: "خطط مناسبتك خطوة بخطوة مع مساعدنا الذكي" },
  { icon: LayoutTemplate, title: "قوالب جاهزة", titleEn: "Ready Templates", desc: "اختر من قوالب دعوات احترافية وخصصها بسهولة" },
  { icon: Users, title: "تتبع RSVP", titleEn: "RSVP Tracking", desc: "تابع حضور وغياب ضيوفك في لوحة تحكم واحدة" },
  { icon: QrCode, title: "رموز QR", titleEn: "QR Codes", desc: "أنشئ رموز QR مخصصة لكل ضيف للتسجيل السريع" },
  { icon: CheckCircle, title: "تنسيق الخدمات", titleEn: "Service Coordination", desc: "نسّق مع مزودي الخدمات: تصوير، زهور، ضيافة والمزيد" },
];

const packages = [
  { name: "مجاني", nameEn: "Free", price: "0", features: ["حدث واحد", "50 دعوة", "قالب أساسي", "تتبع RSVP"], cta: "ابدأ مجاناً" },
  { name: "حدث واحد", nameEn: "Single Event", price: "199", features: ["دعوات غير محدودة", "رموز QR", "دعوات مخصصة", "منسق مخصص", "تقارير متقدمة"], cta: "اختر الباقة", highlight: true },
  { name: "اشتراك شهري", nameEn: "Monthly", price: "499", features: ["أحداث غير محدودة", "كل مزايا الحدث الواحد", "أولوية الدعم", "تحليلات متقدمة", "API مخصص"], cta: "اشترك الآن" },
];

const quickLinks = [
  { label: "من نحن", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "الباقات", href: "#packages" },
  { label: "سوق المزودين", to: "/marketplace" },
  { label: "تواصل معنا", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X (Twitter)" },
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: (props: any) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>, label: "TikTok" },
];

export default function Index() {
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, boolean> = {};
    if (!contactForm.name.trim()) errors.name = true;
    if (!contactForm.email.trim()) errors.email = true;
    if (!contactForm.message.trim()) errors.message = true;
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setContactForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-hatm-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={hatmLogo} alt="حاتم - HATM Host" className="h-10 w-auto" />
            <span className="font-semibold text-lg text-foreground">HATM Host</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/marketplace" className="hover:text-foreground transition-colors">سوق المزودين</Link>
            <Link to="/services" className="hover:text-foreground transition-colors">الخدمات</Link>
            <Link to="/notifications" className="hover:text-foreground transition-colors">الإشعارات</Link>
            <Link to="/templates" className="hover:text-foreground transition-colors">قوالب الدعوات</Link>
            <Link to="/admin" className="hover:text-foreground transition-colors">لوحة التحكم</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/chatbot">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-hatm-sm">
                أنشئ مناسبتك <span className="text-tam mr-1">تم</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <motion.section {...sectionAnim} className="relative overflow-hidden sadu-pattern">
        <div className="container mx-auto px-4 py-24 md:py-36 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6"
          >
            الضيافة، بإتقان
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            مناسبتكم، تدار لأصغر التفاصيل. من الدعوة حتى التنسيق — كل شيء في منصة واحدة.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/chatbot">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium transition-shadow hover:shadow-hatm-md flex items-center gap-2 justify-center"
              >
                <span>ابدأ التخطيط</span>
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link to="/manual">
              <Button variant="outline" size="lg" className="shadow-hatm-sm">
                أدير مناسبتي يدوياً
              </Button>
            </Link>
          </motion.div>
          <p className="text-sm text-muted-foreground mt-6">نسبة استجابة الضيوف ٩٨٪</p>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section {...sectionAnim} id="services" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">خدماتنا</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">كل ما تحتاجه لإدارة مناسبة ناجحة، من البداية حتى النهاية</p>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-6 shadow-hatm-sm hover:shadow-hatm-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Packages */}
      <motion.section {...sectionAnim} id="packages" className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">الباقات</h2>
          <p className="text-muted-foreground text-center mb-12">اختر الباقة المناسبة لمناسبتك</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card rounded-xl p-6 shadow-hatm-sm flex flex-col ${pkg.highlight ? "ring-2 ring-primary shadow-hatm-md relative" : ""}`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">الأكثر طلباً</span>
                )}
                <h3 className="font-semibold text-lg">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.nameEn}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground text-sm mr-1">ر.س</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/checkout">
                  <Button className={`w-full ${pkg.highlight ? "bg-primary text-primary-foreground" : ""}`} variant={pkg.highlight ? "default" : "outline"}>
                    {pkg.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer id="contact" className="bg-primary text-primary-foreground">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand & Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <img src={hatmLogo} alt="حاتم" className="h-10 w-auto brightness-0 invert" />
                <span className="font-bold text-lg">HATM Host</span>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                منصة متكاملة لإدارة المناسبات والضيافة بأعلى معايير الجودة والاحترافية.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                  <span>الرياض - المملكة العربية السعودية</span>
                </div>
                <a href="tel:050000000000" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                  <span dir="ltr">050 000 000 00</span>
                </a>
                <a href="mailto:info@hatmhost.com" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <AtSign className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                  <span>info@hatmhost.com</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-base mb-5">روابط سريعة</h4>
              <ul className="space-y-3 text-sm">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    {link.to ? (
                      <Link to={link.to} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-base mb-5">تابعنا</h4>
              <div className="flex flex-wrap gap-3 mb-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={`https://${social.label.toLowerCase().replace(/\s*\(.*\)/, "")}.com/hatmhost`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <p className="text-primary-foreground/50 text-sm">@hatmhost</p>
            </div>

            {/* Contact Form */}
            <div>
              <h4 className="font-semibold text-base mb-5">تواصل معنا</h4>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary-foreground/10 rounded-xl p-6 text-center"
                >
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="font-medium">تم الإرسال بنجاح!</p>
                  <p className="text-sm text-primary-foreground/70 mt-1">سنتواصل معك قريباً</p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <Input
                    placeholder="الاسم *"
                    value={contactForm.name}
                    onChange={(e) => { setContactForm({ ...contactForm, name: e.target.value }); setFormErrors({ ...formErrors, name: false }); }}
                    className={`bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-9 text-sm ${formErrors.name ? "border-accent ring-1 ring-accent" : ""}`}
                  />
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني *"
                    value={contactForm.email}
                    onChange={(e) => { setContactForm({ ...contactForm, email: e.target.value }); setFormErrors({ ...formErrors, email: false }); }}
                    className={`bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-9 text-sm ${formErrors.email ? "border-accent ring-1 ring-accent" : ""}`}
                  />
                  <Input
                    type="tel"
                    placeholder="رقم الهاتف (اختياري)"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-9 text-sm"
                  />
                  <Textarea
                    placeholder="الرسالة *"
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => { setContactForm({ ...contactForm, message: e.target.value }); setFormErrors({ ...formErrors, message: false }); }}
                    className={`bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm min-h-[70px] ${formErrors.message ? "border-accent ring-1 ring-accent" : ""}`}
                  />
                  <Button type="submit" className="w-full bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border border-primary-foreground/20 h-9 text-sm">
                    <Send className="w-4 h-4 ml-2" />
                    إرسال
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
            <p>© 2026 HATM Host — ضيافة حاتم. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

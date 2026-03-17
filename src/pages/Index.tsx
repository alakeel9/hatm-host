import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, LayoutTemplate, Users, QrCode, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function Index() {
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
            <a href="#services" className="hover:text-foreground transition-colors">الخدمات</a>
            <a href="#packages" className="hover:text-foreground transition-colors">الباقات</a>
            <Link to="/marketplace" className="hover:text-foreground transition-colors">سوق المزودين</Link>
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
      <footer className="bg-card shadow-hatm-sm py-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 HATM Host — ضيافة حاتم. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}

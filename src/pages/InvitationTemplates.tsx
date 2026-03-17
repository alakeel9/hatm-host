import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Eye, Palette, Heart, Star, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "classic",
    name: "كلاسيكي أنيق",
    nameEn: "Classic Elegant",
    icon: Crown,
    bg: "from-[hsl(162,45%,20%)] to-[hsl(162,30%,35%)]",
    border: "border-[hsl(162,45%,20%)]",
    preview: {
      bg: "bg-gradient-to-br from-[hsl(162,20%,95%)] to-[hsl(162,15%,90%)]",
      accent: "text-[hsl(162,45%,20%)]",
      textColor: "text-[hsl(162,40%,15%)]",
    },
    desc: "تصميم راقٍ بألوان هادئة مستوحاة من التراث",
  },
  {
    id: "floral",
    name: "زهور الربيع",
    nameEn: "Spring Floral",
    icon: Heart,
    bg: "from-[hsl(340,60%,55%)] to-[hsl(320,50%,45%)]",
    border: "border-[hsl(340,60%,55%)]",
    preview: {
      bg: "bg-gradient-to-br from-[hsl(340,30%,95%)] to-[hsl(320,20%,92%)]",
      accent: "text-[hsl(340,60%,50%)]",
      textColor: "text-[hsl(340,30%,20%)]",
    },
    desc: "تصميم رومانسي بنقوش زهرية ناعمة",
  },
  {
    id: "modern",
    name: "عصري بسيط",
    nameEn: "Modern Minimal",
    icon: Sparkles,
    bg: "from-[hsl(220,30%,25%)] to-[hsl(220,25%,40%)]",
    border: "border-[hsl(220,30%,25%)]",
    preview: {
      bg: "bg-gradient-to-br from-[hsl(220,10%,97%)] to-[hsl(220,10%,93%)]",
      accent: "text-[hsl(220,30%,30%)]",
      textColor: "text-[hsl(220,20%,15%)]",
    },
    desc: "خطوط نظيفة وتصميم معاصر أنيق",
  },
  {
    id: "royal",
    name: "ملكي ذهبي",
    nameEn: "Royal Gold",
    icon: Star,
    bg: "from-[hsl(40,70%,45%)] to-[hsl(30,60%,35%)]",
    border: "border-[hsl(40,70%,45%)]",
    preview: {
      bg: "bg-gradient-to-br from-[hsl(40,30%,95%)] to-[hsl(30,25%,90%)]",
      accent: "text-[hsl(40,70%,40%)]",
      textColor: "text-[hsl(30,30%,15%)]",
    },
    desc: "تصميم فاخر بلمسات ذهبية ملكية",
  },
  {
    id: "sadu",
    name: "سدو تراثي",
    nameEn: "Sadu Heritage",
    icon: Palette,
    bg: "from-[hsl(0,72%,40%)] to-[hsl(162,45%,20%)]",
    border: "border-[hsl(0,72%,40%)]",
    preview: {
      bg: "bg-gradient-to-br from-[hsl(40,20%,95%)] to-[hsl(30,15%,90%)]",
      accent: "text-[hsl(0,72%,45%)]",
      textColor: "text-[hsl(162,40%,15%)]",
    },
    desc: "مستوحى من نقوش السدو السعودية التقليدية",
  },
  {
    id: "neon",
    name: "نيون حيوي",
    nameEn: "Vibrant Neon",
    icon: Sparkles,
    bg: "from-[hsl(270,60%,50%)] to-[hsl(300,50%,45%)]",
    border: "border-[hsl(270,60%,50%)]",
    preview: {
      bg: "bg-gradient-to-br from-[hsl(270,20%,10%)] to-[hsl(300,15%,8%)]",
      accent: "text-[hsl(270,70%,65%)]",
      textColor: "text-[hsl(0,0%,90%)]",
    },
    desc: "تصميم جريء وعصري للحفلات الشبابية",
  },
];

function InvitationPreviewCard({ template, eventName }: { template: typeof templates[0]; eventName?: string }) {
  return (
    <div className={`${template.preview.bg} rounded-xl p-6 text-center space-y-3 border ${template.border}/20 min-h-[280px] flex flex-col items-center justify-center`}>
      <div className={`text-xs font-medium ${template.preview.accent} tracking-widest uppercase`}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
      <div className={`w-16 h-px ${template.preview.accent} bg-current mx-auto opacity-30`} />
      <h3 className={`text-xl font-bold ${template.preview.textColor}`}>{eventName || "حفل زفاف أحمد وسارة"}</h3>
      <p className={`text-sm ${template.preview.textColor} opacity-70`}>يسعدنا دعوتكم لحضور</p>
      <p className={`text-sm ${template.preview.textColor} opacity-70`}>السبت ١٥ أبريل ٢٠٢٦ — الساعة ٧ مساءً</p>
      <p className={`text-sm ${template.preview.textColor} opacity-70`}>فندق الرياض — الرياض</p>
      <div className={`w-16 h-px ${template.preview.accent} bg-current mx-auto opacity-30 mt-2`} />
      <div className="flex gap-3 mt-3">
        <button className={`px-4 py-1.5 rounded-full text-xs font-medium bg-[hsl(142,70%,45%)] text-white`}>تأكيد الحضور ✅</button>
        <button className={`px-4 py-1.5 rounded-full text-xs font-medium bg-[hsl(0,72%,51%)] text-white`}>اعتذار ❌</button>
      </div>
    </div>
  );
}

export default function InvitationTemplates() {
  const [selected, setSelected] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/rsvp" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">قوالب الدعوات</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold mb-2">اختر قالب الدعوة</h2>
          <p className="text-muted-foreground">اختر التصميم المناسب لمناسبتك ثم أرسل الدعوات عبر الطريقة المفضلة</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-card rounded-xl shadow-hatm-sm overflow-hidden cursor-pointer transition-all ${selected === t.id ? "ring-2 ring-primary shadow-hatm-md" : "hover:shadow-hatm-md"}`}
              onClick={() => setSelected(t.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${t.bg}`} />
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <t.icon className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold text-sm">{t.name}</h3>
                      <p className="text-xs text-muted-foreground">{t.nameEn}</p>
                    </div>
                  </div>
                  {selected === t.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </motion.div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
                <InvitationPreviewCard template={t} />
                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={(e) => { e.stopPropagation(); setPreviewOpen(t.id); }}>
                  <Eye className="w-3 h-3 ml-1" /> معاينة كاملة
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {selected && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-3 pt-4">
            <Link to={`/delivery-preview/whatsapp?template=${selected}`}>
              <Button className="bg-primary text-primary-foreground shadow-hatm-sm">معاينة عبر واتساب</Button>
            </Link>
            <Link to={`/delivery-preview/email?template=${selected}`}>
              <Button variant="outline" className="shadow-hatm-sm">معاينة عبر الإيميل</Button>
            </Link>
            <Link to={`/delivery-preview/sms?template=${selected}`}>
              <Button variant="outline" className="shadow-hatm-sm">معاينة SMS</Button>
            </Link>
            <Link to={`/delivery-preview/link?template=${selected}`}>
              <Button variant="outline" className="shadow-hatm-sm">رابط مستقل</Button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-6 max-w-md w-full shadow-hatm-lg"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-semibold mb-4 text-center">{templates.find(t => t.id === previewOpen)?.name}</h3>
              <InvitationPreviewCard template={templates.find(t => t.id === previewOpen)!} />
              <Button variant="outline" className="w-full mt-4" onClick={() => setPreviewOpen(null)}>إغلاق</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

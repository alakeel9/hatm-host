import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, CreditCard, QrCode, UserCheck, Palette, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PackageType = "free" | "single" | "monthly";

const packages: { id: PackageType; name: string; basePrice: number; desc: string; perGuest?: number }[] = [
  { id: "free", name: "مجاني", basePrice: 0, desc: "حدث واحد — 50 دعوة — قالب أساسي" },
  { id: "single", name: "حدث واحد", basePrice: 99, desc: "دعوات غير محدودة — السعر يعتمد على عدد الضيوف", perGuest: 1 },
  { id: "monthly", name: "اشتراك شهري", basePrice: 499, desc: "أحداث غير محدودة — سعر ثابت شهرياً" },
];

const addons = [
  { id: "qr", label: "رموز QR مخصصة", price: 50, icon: QrCode },
  { id: "custom_inv", label: "دعوات مخصصة", price: 100, icon: Palette },
  { id: "coordinator", label: "منسق مخصص", price: 200, icon: UserCheck },
  { id: "vendors", label: "تنسيق مزودين", price: 150, icon: Users },
];

export default function Checkout() {
  const [selectedPkg, setSelectedPkg] = useState<PackageType>("single");
  const [guestCount, setGuestCount] = useState(120);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [paid, setPaid] = useState(false);

  const toggle = (id: string) => setSelectedAddons(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

  const pkg = packages.find(p => p.id === selectedPkg)!;
  const packagePrice = selectedPkg === "free" ? 0 : selectedPkg === "single" ? pkg.basePrice + (pkg.perGuest || 0) * guestCount : pkg.basePrice;
  const addonsPrice = selectedPkg === "free" ? 0 : selectedAddons.reduce((sum, id) => sum + (addons.find(a => a.id === id)?.price || 0), 0);
  const total = packagePrice + addonsPrice;

  if (paid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <span className="text-3xl text-tam">تم</span>
          </div>
          <h2 className="text-2xl font-bold">تم الدفع بنجاح!</h2>
          <p className="text-muted-foreground">مناسبتك جاهزة. يمكنك البدء بإرسال الدعوات.</p>
          <div className="flex gap-3 justify-center pt-4">
            <Link to="/dashboard"><Button className="bg-primary text-primary-foreground">لوحة التحكم</Button></Link>
            <Link to="/templates"><Button variant="outline" className="shadow-hatm-sm">اختيار قالب الدعوة</Button></Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">الدفع</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg space-y-6">
        {/* Package Selection */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-semibold mb-3">اختر الباقة</h3>
          <div className="space-y-2">
            {packages.map(p => (
              <motion.button
                key={p.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedPkg(p.id); if (p.id === "free") setSelectedAddons([]); }}
                className={`w-full flex items-center justify-between p-4 rounded-xl shadow-hatm-sm transition-all text-right ${selectedPkg === p.id ? "ring-2 ring-primary bg-primary/5" : "bg-card hover:shadow-hatm-md"}`}
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
                <div className="text-left">
                  <span className="font-bold tabular-nums">{p.basePrice}</span>
                  <span className="text-xs text-muted-foreground mr-1">ر.س</span>
                  {p.perGuest && <p className="text-[10px] text-muted-foreground">+ {p.perGuest} ر.س/ضيف</p>}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Guest Count (for single event) */}
        {selectedPkg === "single" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-4 shadow-hatm-sm">
            <label className="text-sm font-medium mb-2 block">عدد الضيوف</label>
            <Input type="number" value={guestCount} onChange={e => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))} className="shadow-hatm-sm" min={1} />
            <p className="text-xs text-muted-foreground mt-1">تكلفة الباقة: {pkg.basePrice} + ({guestCount} × {pkg.perGuest}) = <strong className="text-foreground">{packagePrice} ر.س</strong></p>
          </motion.div>
        )}

        {/* Add-ons (disabled for free) */}
        {selectedPkg !== "free" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="font-semibold mb-3">إضافات اختيارية</h3>
            <div className="space-y-3">
              {addons.map(a => (
                <motion.button key={a.id} whileTap={{ scale: 0.98 }} onClick={() => toggle(a.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl shadow-hatm-sm transition-all text-right ${selectedAddons.includes(a.id) ? "ring-2 ring-primary bg-primary/5" : "bg-card hover:shadow-hatm-md"}`}>
                  <a.icon className={`w-5 h-5 shrink-0 ${selectedAddons.includes(a.id) ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.label}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{a.price} ر.س</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pricing Summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl p-5 shadow-hatm-sm space-y-3">
          <h3 className="font-semibold">ملخص التسعير</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">الباقة ({pkg.name})</span>
              <span className="tabular-nums">{packagePrice} ر.س</span>
            </div>
            {selectedAddons.map(id => {
              const addon = addons.find(a => a.id === id)!;
              return (
                <div key={id} className="flex justify-between">
                  <span className="text-muted-foreground">{addon.label}</span>
                  <span className="tabular-nums">{addon.price} ر.س</span>
                </div>
              );
            })}
            <div className="border-t pt-2 flex justify-between text-base font-bold">
              <span>الإجمالي</span>
              <span className="tabular-nums">{total} <span className="text-sm font-normal text-muted-foreground">ر.س</span></span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaid(true)}
            className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-medium transition-shadow hover:shadow-hatm-md flex items-center gap-2 justify-center"
          >
            <CreditCard className="w-4 h-4" />
            <span>{total === 0 ? "ابدأ مجاناً" : "ادفع الآن"}</span>
            <span className="text-tam">تم</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

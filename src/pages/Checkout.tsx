import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, CreditCard, QrCode, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const addons = [
  { id: "qr", label: "رموز QR مخصصة", price: 50, icon: QrCode },
  { id: "custom_inv", label: "دعوات مخصصة", price: 100, icon: CreditCard },
  { id: "coordinator", label: "منسق مخصص", price: 200, icon: UserCheck },
];

export default function Checkout() {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [paid, setPaid] = useState(false);

  const toggle = (id: string) => setSelectedAddons(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  const basePrice = 199;
  const addonsPrice = selectedAddons.reduce((sum, id) => sum + (addons.find(a => a.id === id)?.price || 0), 0);
  const total = basePrice + addonsPrice;

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
            <Link to="/rsvp"><Button variant="outline" className="shadow-hatm-sm">إرسال الدعوات</Button></Link>
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
        {/* Package */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
          <h3 className="font-semibold mb-1">باقة الحدث الواحد</h3>
          <p className="text-sm text-muted-foreground mb-3">دعوات غير محدودة + رموز QR + منسق</p>
          <p className="text-2xl font-bold tabular-nums">{basePrice} <span className="text-sm font-normal text-muted-foreground">ر.س</span></p>
        </motion.div>

        {/* Add-ons */}
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

        {/* Total */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">الإجمالي</span>
            <span className="text-2xl font-bold tabular-nums">{total} <span className="text-sm font-normal text-muted-foreground">ر.س</span></span>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaid(true)}
            className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-medium transition-shadow hover:shadow-hatm-md flex items-center gap-2 justify-center"
          >
            <CreditCard className="w-4 h-4" />
            <span>ادفع الآن</span>
            <span className="text-tam">تم</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

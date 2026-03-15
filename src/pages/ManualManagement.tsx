import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Flower2, UtensilsCrossed, Camera, Building, Armchair, CakeSlice, CalendarDays, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const serviceOptions = [
  { id: "flowers", label: "زهور", icon: Flower2 },
  { id: "catering", label: "ضيافة", icon: UtensilsCrossed },
  { id: "photography", label: "تصوير", icon: Camera },
  { id: "halls", label: "قاعات", icon: Building },
  { id: "lounges", label: "استراحات", icon: Armchair },
  { id: "desserts", label: "حلويات", icon: CakeSlice },
];

export default function ManualManagement() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">إدارة يدوية</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-xl font-bold">تفاصيل المناسبة</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1.5 block">اسم المناسبة</label><Input placeholder="مثال: حفل زفاف" className="shadow-hatm-sm" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">النوع</label><Input placeholder="زفاف، مؤتمر..." className="shadow-hatm-sm" /></div>
            <div><label className="text-sm font-medium mb-1.5 block"><CalendarDays className="w-3.5 h-3.5 inline ml-1" />التاريخ</label><Input type="date" className="shadow-hatm-sm" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">الوقت</label><Input type="time" className="shadow-hatm-sm" /></div>
            <div><label className="text-sm font-medium mb-1.5 block"><MapPin className="w-3.5 h-3.5 inline ml-1" />الموقع</label><Input placeholder="الرياض" className="shadow-hatm-sm" /></div>
            <div><label className="text-sm font-medium mb-1.5 block"><Users className="w-3.5 h-3.5 inline ml-1" />عدد الضيوف</label><Input type="number" placeholder="100" className="shadow-hatm-sm" /></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-xl font-bold mb-4">اختر الخدمات</h2>
          <div className="grid grid-cols-3 gap-3">
            {serviceOptions.map(s => (
              <motion.button key={s.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => toggle(s.id)}
                className={`p-4 rounded-xl shadow-hatm-sm text-center transition-all ${selected.includes(s.id) ? "ring-2 ring-primary bg-primary/5" : "bg-card hover:shadow-hatm-md"}`}>
                <s.icon className={`w-6 h-6 mx-auto mb-2 ${selected.includes(s.id) ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm font-medium">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3 justify-center pt-4">
          <Link to="/checkout">
            <Button className="bg-primary text-primary-foreground shadow-hatm-sm h-11 px-8">
              متابعة للدفع
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

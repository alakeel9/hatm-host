import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, CheckCircle, Clock, XCircle, Send, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const guestData = [
  { name: "أحمد محمد", status: "confirmed" },
  { name: "سارة العلي", status: "confirmed" },
  { name: "خالد الحربي", status: "declined" },
  { name: "نورة السعيد", status: "pending" },
  { name: "فهد الشمري", status: "confirmed" },
];

const vendorStatus = [
  { name: "زهور الياسمين", service: "زهور", status: "delivered" },
  { name: "مطعم الديرة", service: "ضيافة", status: "in_progress" },
  { name: "استديو لحظات", service: "تصوير", status: "confirmed" },
  { name: "قاعة النخيل", service: "قاعة", status: "delivered" },
];

const statusIcon: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  confirmed: { icon: CheckCircle, color: "text-success", label: "مؤكد" },
  declined: { icon: XCircle, color: "text-destructive", label: "اعتذر" },
  pending: { icon: Clock, color: "text-primary", label: "بلا رد" },
  delivered: { icon: CheckCircle, color: "text-success", label: "تم التسليم" },
  in_progress: { icon: Truck, color: "text-primary", label: "قيد التجهيز" },
};

export default function CoordinatorPortal() {
  const [broadcast, setBroadcast] = useState("");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">بوابة المنسق</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">حفل زفاف أحمد وسارة</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Guest RSVP */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl shadow-hatm-sm overflow-hidden">
            <div className="p-5 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">حالة الضيوف</h3>
            </div>
            <div className="divide-y">
              {guestData.map((g, i) => {
                const s = statusIcon[g.status];
                return (
                  <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors duration-150">
                    <span className="text-sm font-medium">{g.name}</span>
                    <span className={`flex items-center gap-1 text-xs ${s.color}`}>
                      <s.icon className="w-3.5 h-3.5" /> {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Vendor Status */}
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl shadow-hatm-sm overflow-hidden">
            <div className="p-5 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">حالة المزودين</h3>
            </div>
            <div className="divide-y">
              {vendorStatus.map((v, i) => {
                const s = statusIcon[v.status];
                return (
                  <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors duration-150">
                    <div>
                      <span className="text-sm font-medium">{v.name}</span>
                      <span className="text-xs text-muted-foreground mr-2">({v.service})</span>
                    </div>
                    <span className={`flex items-center gap-1 text-xs ${s.color}`}>
                      <s.icon className="w-3.5 h-3.5" /> {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Broadcast */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 bg-card rounded-xl p-5 shadow-hatm-sm">
          <h3 className="font-semibold mb-3">بث رسالة للمزودين</h3>
          <div className="flex gap-3">
            <Input
              placeholder="اكتب رسالتك هنا..."
              value={broadcast}
              onChange={e => setBroadcast(e.target.value)}
              className="shadow-hatm-sm flex-1"
            />
            <Button className="bg-primary text-primary-foreground shadow-hatm-sm">
              <Send className="w-4 h-4 ml-1" /> إرسال
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

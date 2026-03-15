import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialRequests = [
  { id: 1, event: "زفاف أحمد وسارة", date: "15 أبريل 2026", service: "تنسيق زهور", details: "200 ضيف — بوكيهات طاولات + مدخل", status: "pending" as string },
  { id: 2, event: "مؤتمر التقنية", date: "20 مايو 2026", service: "تنسيق مسرح", details: "300 ضيف — تزيين مسرح رئيسي", status: "pending" as string },
  { id: 3, event: "حفل تخرج نورة", date: "1 يونيو 2026", service: "بوكيه تخرج", details: "80 ضيف — بوكيه + تنسيق طاولة كيك", status: "accepted" as string },
];

export default function VendorPortal() {
  const [requests, setRequests] = useState(initialRequests);
  const [celebrating, setCelebrating] = useState<number | null>(null);

  const handleAccept = (id: number) => {
    setRequests(r => r.map(req => req.id === id ? { ...req, status: "accepted" } : req));
    setCelebrating(id);
    setTimeout(() => setCelebrating(null), 1500);
  };

  const handleReject = (id: number) => {
    setRequests(r => r.map(req => req.id === id ? { ...req, status: "rejected" } : req));
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">بوابة المزود — زهور الياسمين</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold">الطلبات المسندة</h2>

        <div className="space-y-4">
          {requests.map(req => (
            <motion.div
              key={req.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-5 shadow-hatm-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{req.event}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{req.date} • {req.service}</p>
                  <p className="text-sm mt-2">{req.details}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {req.status === "pending" && (
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleAccept(req.id)}
                          className="bg-primary text-primary-foreground shadow-hatm-sm"
                          size="sm"
                        >
                          قبول الطلب
                        </Button>
                      </motion.div>
                      <Button variant="outline" size="sm" className="shadow-hatm-sm" onClick={() => handleReject(req.id)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  {req.status === "accepted" && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-lg"
                      >
                        <span className="font-bold text-lg">تم</span>
                        <CheckCircle className="w-5 h-5" />
                      </motion.div>
                    </AnimatePresence>
                  )}
                  {req.status === "rejected" && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">مرفوض</span>
                  )}
                </div>
              </div>
              {req.status !== "rejected" && (
                <div className="mt-3 pt-3 border-t flex gap-2">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    <MessageSquare className="w-3 h-3 ml-1" /> تواصل مع المنسق
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

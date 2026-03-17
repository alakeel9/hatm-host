import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, CheckCircle, Clock, Eye, X, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoicesData = [
  {
    id: "INV-001",
    client: "أحمد محمد",
    event: "حفل زفاف أحمد وسارة",
    date: "2026-03-10",
    status: "paid" as const,
    items: [
      { name: "باقة الحدث الواحد", price: 199 },
      { name: "رموز QR مخصصة", price: 50 },
      { name: "دعوات مخصصة", price: 100 },
      { name: "منسق مخصص", price: 200 },
      { name: "تنسيق زهور — زهور الياسمين", price: 1700 },
      { name: "تصوير — استديو لحظات", price: 5000 },
    ],
  },
  {
    id: "INV-002",
    client: "نورة السعيد",
    event: "حفل تخرج نورة",
    date: "2026-04-01",
    status: "pending" as const,
    items: [
      { name: "باقة الحدث الواحد", price: 199 },
      { name: "رموز QR مخصصة", price: 50 },
      { name: "بوكيه تخرج — زهور الياسمين", price: 350 },
      { name: "بوفيه حلويات — حلويات السعادة", price: 3000 },
    ],
  },
  {
    id: "INV-003",
    client: "خالد الحربي",
    event: "مؤتمر التقنية 2026",
    date: "2026-03-25",
    status: "paid" as const,
    items: [
      { name: "اشتراك شهري", price: 499 },
      { name: "قاعة رئيسية — قاعة النخيل", price: 15000 },
      { name: "بوفيه مفتوح (300 شخص) — مطعم الديرة", price: 13500 },
      { name: "تصوير فيديو — استديو لحظات", price: 5000 },
    ],
  },
  {
    id: "INV-004",
    client: "ريم الغامدي",
    event: "حفل خطوبة",
    date: "2026-04-15",
    status: "pending" as const,
    items: [
      { name: "باقة مجانية", price: 0 },
      { name: "ترقية: رموز QR", price: 50 },
    ],
  },
];

export default function Invoices() {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [sentInvoices, setSentInvoices] = useState<string[]>([]);
  const previewInvoice = invoicesData.find(i => i.id === previewId);

  const handleSendInvoice = (id: string) => {
    setSentInvoices(prev => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">الفواتير</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-4 shadow-hatm-sm text-center">
            <p className="text-2xl font-bold tabular-nums">{invoicesData.length}</p>
            <p className="text-xs text-muted-foreground">إجمالي الفواتير</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl p-4 shadow-hatm-sm text-center">
            <p className="text-2xl font-bold tabular-nums text-success">{invoicesData.filter(i => i.status === "paid").length}</p>
            <p className="text-xs text-muted-foreground">مدفوعة</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-4 shadow-hatm-sm text-center">
            <p className="text-2xl font-bold tabular-nums text-accent">{invoicesData.filter(i => i.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground">معلقة</p>
          </motion.div>
        </div>

        {/* Invoices List */}
        <div className="bg-card rounded-xl shadow-hatm-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                <th className="text-right p-3 font-medium text-muted-foreground">رقم الفاتورة</th>
                <th className="text-right p-3 font-medium text-muted-foreground">العميل</th>
                <th className="text-right p-3 font-medium text-muted-foreground">المناسبة</th>
                <th className="text-right p-3 font-medium text-muted-foreground">المبلغ</th>
                <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
                <th className="text-right p-3 font-medium text-muted-foreground">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {invoicesData.map((inv, i) => {
                const total = inv.items.reduce((s, it) => s + it.price, 0);
                return (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3 font-mono text-xs">{inv.id}</td>
                    <td className="p-3 font-medium">{inv.client}</td>
                    <td className="p-3 text-muted-foreground text-xs">{inv.event}</td>
                    <td className="p-3 font-semibold tabular-nums">{total.toLocaleString()} ر.س</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${inv.status === "paid" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}`}>
                        {inv.status === "paid" ? "مدفوعة ✅" : "معلقة ⏳"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setPreviewId(inv.id)}>
                          <Eye className="w-3 h-3 ml-1" /> عرض
                        </Button>
                        {inv.status === "pending" && !sentInvoices.includes(inv.id) && (
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => handleSendInvoice(inv.id)}>
                            <Send className="w-3 h-3 ml-1" /> إرسال
                          </Button>
                        )}
                        {sentInvoices.includes(inv.id) && (
                          <span className="text-xs text-success flex items-center gap-1"><CheckCircle className="w-3 h-3" /> أُرسلت</span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      <AnimatePresence>
        {previewInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl w-full max-w-md shadow-hatm-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-5 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">فاتورة {previewInvoice.id}</h3>
                </div>
                <button onClick={() => setPreviewId(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">العميل:</span>
                  <span className="font-medium">{previewInvoice.client}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">المناسبة:</span>
                  <span className="font-medium">{previewInvoice.event}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span className="font-medium">{previewInvoice.date}</span>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <p className="font-semibold text-sm">التفاصيل:</p>
                  {previewInvoice.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="tabular-nums font-medium">{item.price.toLocaleString()} ر.س</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold">الإجمالي:</span>
                  <span className="font-bold text-lg tabular-nums">
                    {previewInvoice.items.reduce((s, it) => s + it.price, 0).toLocaleString()} ر.س
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${previewInvoice.status === "paid" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}`}>
                    {previewInvoice.status === "paid" ? "مدفوعة ✅" : "معلقة ⏳"}
                  </span>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="w-3 h-3 ml-1" /> تحميل PDF
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

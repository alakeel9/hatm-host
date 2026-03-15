import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, CalendarDays, FileText, Settings, Flower2, UtensilsCrossed, Camera, Building, Armchair, CakeSlice } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["نظرة عامة", "المزودين", "التقارير", "الفواتير"];

const events = [
  { name: "زفاف أحمد وسارة", date: "15 أبريل 2026", guests: 120, status: "active" },
  { name: "مؤتمر التقنية", date: "20 مايو 2026", guests: 300, status: "active" },
  { name: "حفل تخرج نورة", date: "1 يونيو 2026", guests: 80, status: "pending" },
];

const vendors = [
  { name: "زهور الياسمين", type: "زهور", icon: Flower2, health: "active" },
  { name: "مطعم الديرة", type: "ضيافة", icon: UtensilsCrossed, health: "active" },
  { name: "استديو لحظات", type: "تصوير", icon: Camera, health: "busy" },
  { name: "قاعة النخيل", type: "قاعات", icon: Building, health: "active" },
  { name: "استراحة الورد", type: "استراحات", icon: Armchair, health: "off" },
  { name: "حلويات السعادة", type: "حلويات", icon: CakeSlice, health: "active" },
];

const healthMap: Record<string, { label: string; class: string }> = {
  active: { label: "نشط", class: "bg-success/10 text-success" },
  busy: { label: "مشغول", class: "bg-accent/10 text-accent" },
  off: { label: "متوقف", class: "bg-muted text-muted-foreground" },
};

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-60 bg-card shadow-hatm-sm min-h-screen hidden md:flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">حاتم</span>
          </div>
          <span className="font-semibold text-sm">بوابة الإدارة</span>
        </div>
        <nav className="flex-1 px-2 space-y-1 mt-4">
          {[{ icon: BarChart3, label: "نظرة عامة" }, { icon: Users, label: "المزودين" }, { icon: FileText, label: "التقارير" }, { icon: Settings, label: "الفواتير" }].map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === i ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowRight className="w-3 h-3" /> العودة للرئيسية
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="md:hidden mb-4">
          <Link to="/" className="text-sm text-muted-foreground flex items-center gap-1">
            <ArrowRight className="w-4 h-4" /> العودة
          </Link>
        </div>

        {activeTab === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold">نظرة عامة</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-5 shadow-hatm-sm">
                <p className="text-sm text-muted-foreground">إجمالي الأحداث</p>
                <p className="text-3xl font-bold mt-1 tabular-nums">3</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-hatm-sm">
                <p className="text-sm text-muted-foreground">إجمالي الضيوف</p>
                <p className="text-3xl font-bold mt-1 tabular-nums">500</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-hatm-sm">
                <p className="text-sm text-muted-foreground">نسبة الاستجابة</p>
                <p className="text-3xl font-bold mt-1 tabular-nums">82%</p>
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-hatm-sm overflow-hidden">
              <div className="p-5"><h3 className="font-semibold">الأحداث النشطة</h3></div>
              <table className="w-full text-sm">
                <thead><tr className="border-t bg-muted/30">
                  <th className="text-right p-3 font-medium text-muted-foreground">الحدث</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">التاريخ</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">الضيوف</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
                </tr></thead>
                <tbody>
                  {events.map((e, i) => (
                    <tr key={i} className="border-t hover:bg-muted/30 transition-colors duration-150">
                      <td className="p-3 font-medium">{e.name}</td>
                      <td className="p-3 text-muted-foreground">{e.date}</td>
                      <td className="p-3 tabular-nums">{e.guests}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.status === "active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                          {e.status === "active" ? "نشط" : "معلق"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold">إدارة المزودين</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendors.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <v.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.type}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${healthMap[v.health].class}`}>
                    {healthMap[v.health].label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold">التقارير</h2>
            <div className="bg-card rounded-xl p-8 shadow-hatm-sm text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">تقارير RSVP وتحليلات الحضور ومسح QR</p>
              <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                <div className="bg-muted/50 rounded-lg p-4"><p className="text-2xl font-bold tabular-nums">412</p><p className="text-xs text-muted-foreground">مسح QR</p></div>
                <div className="bg-muted/50 rounded-lg p-4"><p className="text-2xl font-bold tabular-nums">89%</p><p className="text-xs text-muted-foreground">حضور فعلي</p></div>
                <div className="bg-muted/50 rounded-lg p-4"><p className="text-2xl font-bold tabular-nums">4.8</p><p className="text-xs text-muted-foreground">تقييم</p></div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold">الفواتير</h2>
            <div className="bg-card rounded-xl shadow-hatm-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-muted/30">
                  <th className="text-right p-3 font-medium text-muted-foreground">العميل</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">المبلغ</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">إجراء</th>
                </tr></thead>
                <tbody>
                  {[
                    { client: "أحمد محمد", amount: "1,200 ر.س", status: "paid" },
                    { client: "نورة السعيد", amount: "800 ر.س", status: "pending" },
                    { client: "خالد الحربي", amount: "2,500 ر.س", status: "paid" },
                  ].map((inv, i) => (
                    <tr key={i} className="border-t hover:bg-muted/30 transition-colors duration-150">
                      <td className="p-3 font-medium">{inv.client}</td>
                      <td className="p-3 tabular-nums">{inv.amount}</td>
                      <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${inv.status === "paid" ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}`}>{inv.status === "paid" ? "مدفوعة" : "معلقة"}</span></td>
                      <td className="p-3">{inv.status === "pending" && <Button size="sm" variant="ghost" className="text-xs text-primary h-7">إرسال فاتورة</Button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

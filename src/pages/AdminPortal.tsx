// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, BarChart3, Users, CalendarDays, FileText, Settings, Flower2,
  UtensilsCrossed, Camera, Building, Armchair, CakeSlice, ExternalLink,
  Bell, BellOff, Check, CheckCheck, Trash2, Mail, Smartphone, MessageSquare,
  ShoppingBag, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Notification types ─── */
type NotifType = "booking" | "rsvp" | "order" | "system" | "confirmation";
type NotifChannel = "in-app" | "email" | "whatsapp" | "sms";
type UserRole = "client" | "provider" | "admin";
interface Notification {
  id: string; title: string; message: string; type: NotifType; channel: NotifChannel; role: UserRole; read: boolean; timestamp: string; relativeTime: string;
}

const typeConfig: Record<NotifType, { icon: any; class: string; label: string }> = {
  booking: { icon: CalendarDays, class: "bg-primary/10 text-primary", label: "حجز" },
  rsvp: { icon: Users, class: "bg-success/10 text-success", label: "RSVP" },
  order: { icon: ShoppingBag, class: "bg-accent/10 text-accent", label: "طلب" },
  system: { icon: AlertTriangle, class: "bg-destructive/10 text-destructive", label: "نظام" },
  confirmation: { icon: CheckCheck, class: "bg-success/10 text-success", label: "تأكيد" },
};

const channelConfig: Record<NotifChannel, { icon: any; label: string }> = {
  "in-app": { icon: Bell, label: "داخل التطبيق" },
  email: { icon: Mail, label: "بريد إلكتروني" },
  whatsapp: { icon: MessageSquare, label: "واتساب" },
  sms: { icon: Smartphone, label: "SMS" },
};

const mockNotifications: Notification[] = [
  { id: "1", title: "حجز جديد — زفاف أحمد وسارة", message: "تم إنشاء حجز جديد لخدمة تنسيق الزهور.", type: "booking", channel: "in-app", role: "provider", read: false, timestamp: "2026-04-11T10:30:00", relativeTime: "منذ 30 دقيقة" },
  { id: "2", title: "تحديث RSVP — نورة السعيد أكدت الحضور", message: "إجمالي المؤكدين الآن: 79", type: "rsvp", channel: "in-app", role: "client", read: false, timestamp: "2026-04-11T09:15:00", relativeTime: "منذ ساعة" },
  { id: "3", title: "طلب خدمة جديد", message: "طلب بوفيه مفتوح (200 شخص) لمؤتمر التقنية.", type: "order", channel: "email", role: "provider", read: false, timestamp: "2026-04-11T08:00:00", relativeTime: "منذ 3 ساعات" },
  { id: "4", title: "تم تأكيد الحجز", message: "قاعة النخيل ليوم 15 أبريل 2026. رقم #HT-2026-0412", type: "confirmation", channel: "whatsapp", role: "client", read: true, timestamp: "2026-04-10T16:00:00", relativeTime: "أمس" },
  { id: "5", title: "تنبيه: خدمة جديدة بانتظار الاعتماد", message: "مزود 'صوت الفرح' أضاف فرقة موسيقية حية.", type: "system", channel: "in-app", role: "admin", read: false, timestamp: "2026-04-10T14:30:00", relativeTime: "أمس" },
  { id: "6", title: "RSVP — خالد الحربي اعتذر", message: "السبب: التزام سابق.", type: "rsvp", channel: "sms", role: "client", read: true, timestamp: "2026-04-10T12:00:00", relativeTime: "أمس" },
  { id: "7", title: "تحديث طلب — تم قبول الطلب", message: "تم قبول طلبكم للتصوير من استديو لحظات.", type: "order", channel: "in-app", role: "client", read: true, timestamp: "2026-04-09T10:00:00", relativeTime: "منذ يومين" },
  { id: "8", title: "تنبيه أمان: تسجيل دخول جديد", message: "تسجيل دخول من الرياض.", type: "system", channel: "email", role: "admin", read: true, timestamp: "2026-04-08T08:00:00", relativeTime: "منذ 3 أيام" },
  { id: "9", title: "فاتورة جديدة بانتظار الدفع", message: "15,000 ر.س لحجز قاعة النخيل.", type: "booking", channel: "email", role: "client", read: false, timestamp: "2026-04-11T07:00:00", relativeTime: "منذ 4 ساعات" },
  { id: "10", title: "ملخص النشاط اليومي", message: "3 حجوزات جديدة، 12 رد RSVP، خدمتان بانتظار الاعتماد.", type: "system", channel: "in-app", role: "admin", read: false, timestamp: "2026-04-11T06:00:00", relativeTime: "منذ 5 ساعات" },
];

/* ─── Admin data ─── */
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

  // Notifications state
  const [notifications, setNotifications] = useState(mockNotifications);
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [typeFilter, setTypeFilter] = useState<NotifType | "all">("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = notifications.filter(n => {
    if (roleFilter !== "all" && n.role !== roleFilter) return false;
    if (typeFilter !== "all" && n.type !== typeFilter) return false;
    if (showUnreadOnly && n.read) return false;
    return true;
  });
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  const sidebarItems = [
    { icon: BarChart3, label: "نظرة عامة" },
    { icon: Users, label: "المزودين" },
    { icon: FileText, label: "التقارير" },
    { icon: Settings, label: "الفواتير" },
    { icon: Bell, label: "الإشعارات", badge: unreadCount },
  ];

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
          {sidebarItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === i ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.badge ? <span className="mr-auto bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span> : null}
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

        {/* Mobile tab selector */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-3 mb-4">
          {sidebarItems.map((item, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${activeTab === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Tab 0: Overview */}
        {activeTab === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-2xl font-bold">نظرة عامة</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-5 shadow-hatm-sm"><p className="text-sm text-muted-foreground">إجمالي الأحداث</p><p className="text-3xl font-bold mt-1 tabular-nums">3</p></div>
              <div className="bg-card rounded-xl p-5 shadow-hatm-sm"><p className="text-sm text-muted-foreground">إجمالي الضيوف</p><p className="text-3xl font-bold mt-1 tabular-nums">500</p></div>
              <div className="bg-card rounded-xl p-5 shadow-hatm-sm"><p className="text-sm text-muted-foreground">نسبة الاستجابة</p><p className="text-3xl font-bold mt-1 tabular-nums">82%</p></div>
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
                      <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.status === "active" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>{e.status === "active" ? "نشط" : "معلق"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 1: Vendors */}
        {activeTab === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">إدارة المزودين</h2>
              <Link to="/marketplace"><Button variant="outline" size="sm" className="shadow-hatm-sm"><ExternalLink className="w-3 h-3 ml-1" /> سوق المزودين</Button></Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendors.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center"><v.icon className="w-5 h-5 text-primary" /></div>
                    <div><p className="font-semibold text-sm">{v.name}</p><p className="text-xs text-muted-foreground">{v.type}</p></div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${healthMap[v.health].class}`}>{healthMap[v.health].label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Reports */}
        {activeTab === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">التقارير</h2>
              <Link to="/reports"><Button className="bg-primary text-primary-foreground shadow-hatm-sm" size="sm"><ExternalLink className="w-3 h-3 ml-1" /> تقارير مفصلة</Button></Link>
            </div>
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

        {/* Tab 3: Invoices */}
        {activeTab === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">الفواتير</h2>
              <Link to="/invoices"><Button className="bg-primary text-primary-foreground shadow-hatm-sm" size="sm"><ExternalLink className="w-3 h-3 ml-1" /> عرض الكل</Button></Link>
            </div>
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

        {/* Tab 4: Notifications */}
        {activeTab === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">الإشعارات</h2>
                {unreadCount > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>}
              </div>
              <Button variant="ghost" size="sm" className="text-xs" onClick={markAllRead}>
                <CheckCheck className="w-3 h-3 ml-1" /> قراءة الكل
              </Button>
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs text-muted-foreground shrink-0">الدور:</span>
                {(["all", "client", "provider", "admin"] as const).map(role => (
                  <button key={role} onClick={() => setRoleFilter(role)}
                    className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${roleFilter === role ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {role === "all" ? "الكل" : role === "client" ? "عميل" : role === "provider" ? "مزود" : "مدير"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs text-muted-foreground shrink-0">النوع:</span>
                <button onClick={() => setTypeFilter("all")}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${typeFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>الكل</button>
                {(Object.entries(typeConfig) as [NotifType, typeof typeConfig[NotifType]][]).map(([key, cfg]) => (
                  <button key={key} onClick={() => setTypeFilter(typeFilter === key ? "all" : key)}
                    className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${typeFilter === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {cfg.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${showUnreadOnly ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {showUnreadOnly ? <Bell className="w-3 h-3 inline ml-1" /> : <BellOff className="w-3 h-3 inline ml-1" />}
                  {showUnreadOnly ? "غير المقروءة فقط" : "عرض الكل"}
                </button>
                <span className="text-xs text-muted-foreground">{filtered.length} إشعار</span>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              <AnimatePresence>
                {filtered.map((notif, i) => {
                  const tc = typeConfig[notif.type];
                  const cc = channelConfig[notif.channel];
                  const TypeIcon = tc.icon;
                  const ChannelIcon = cc.icon;
                  const isExpanded = expandedId === notif.id;
                  return (
                    <motion.div key={notif.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ delay: i * 0.03 }}
                      className={`bg-card rounded-xl shadow-hatm-sm overflow-hidden transition-all ${!notif.read ? "border-r-4 border-r-primary" : ""}`}>
                      <div className="p-4 cursor-pointer" onClick={() => { setExpandedId(isExpanded ? null : notif.id); if (!notif.read) markAsRead(notif.id); }}>
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${tc.class}`}><TypeIcon className="w-4 h-4" /></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className={`text-sm font-medium truncate ${!notif.read ? "font-semibold" : ""}`}>{notif.title}</h3>
                              <span className="text-[10px] text-muted-foreground shrink-0">{notif.relativeTime}</span>
                            </div>
                            {!isExpanded && <p className="text-xs text-muted-foreground mt-0.5 truncate">{notif.message}</p>}
                          </div>
                        </div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{notif.message}</p>
                              <div className="flex items-center gap-3 mt-3 flex-wrap">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tc.class}`}>{tc.label}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1"><ChannelIcon className="w-3 h-3" />{cc.label}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{notif.role === "client" ? "عميل" : notif.role === "provider" ? "مزود" : "مدير"}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                                {!notif.read && <Button variant="ghost" size="sm" className="text-xs h-7" onClick={e => { e.stopPropagation(); markAsRead(notif.id); }}><Check className="w-3 h-3 ml-1" /> تم القراءة</Button>}
                                <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive" onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}><Trash2 className="w-3 h-3 ml-1" /> حذف</Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <BellOff className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>لا توجد إشعارات</p>
              </div>
            )}

            {/* Channel summary */}
            <div className="bg-card rounded-xl shadow-hatm-sm p-5 mt-6">
              <div className="flex items-center gap-2 mb-4"><Settings className="w-4 h-4 text-muted-foreground" /><h3 className="font-semibold text-sm">قنوات الإشعارات</h3></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.entries(channelConfig) as [NotifChannel, typeof channelConfig[NotifChannel]][]).map(([key, cfg]) => {
                  const count = notifications.filter(n => n.channel === key).length;
                  const CIcon = cfg.icon;
                  return (
                    <div key={key} className="bg-muted/50 rounded-lg p-3 text-center">
                      <CIcon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">{cfg.label}</p>
                      <p className="text-lg font-bold tabular-nums mt-1">{count}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

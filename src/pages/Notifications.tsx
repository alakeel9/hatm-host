// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Bell, BellOff, Check, CheckCheck, Trash2, Filter,
  CalendarDays, Users, ShoppingBag, MessageSquare, AlertTriangle, Settings,
  Mail, Smartphone, Send as SendIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

type NotifType = "booking" | "rsvp" | "order" | "system" | "confirmation";
type NotifChannel = "in-app" | "email" | "whatsapp" | "sms";
type UserRole = "client" | "provider" | "admin";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotifType;
  channel: NotifChannel;
  role: UserRole;
  read: boolean;
  timestamp: string;
  relativeTime: string;
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
  { id: "1", title: "حجز جديد — زفاف أحمد وسارة", message: "تم إنشاء حجز جديد لخدمة تنسيق الزهور. يرجى مراجعة التفاصيل وتأكيد الموعد.", type: "booking", channel: "in-app", role: "provider", read: false, timestamp: "2026-04-11T10:30:00", relativeTime: "منذ 30 دقيقة" },
  { id: "2", title: "تحديث RSVP — نورة السعيد أكدت الحضور", message: "قامت نورة السعيد بتأكيد حضورها لحفل زفاف أحمد وسارة. إجمالي المؤكدين الآن: 79", type: "rsvp", channel: "in-app", role: "client", read: false, timestamp: "2026-04-11T09:15:00", relativeTime: "منذ ساعة" },
  { id: "3", title: "طلب خدمة جديد", message: "تم استلام طلب جديد لخدمة بوفيه مفتوح (200 شخص) من المنسق للحدث: مؤتمر التقنية.", type: "order", channel: "email", role: "provider", read: false, timestamp: "2026-04-11T08:00:00", relativeTime: "منذ 3 ساعات" },
  { id: "4", title: "تم تأكيد الحجز", message: "تم تأكيد حجز قاعة النخيل الكبرى ليوم 15 أبريل 2026. رقم الحجز: #HT-2026-0412", type: "confirmation", channel: "whatsapp", role: "client", read: true, timestamp: "2026-04-10T16:00:00", relativeTime: "أمس" },
  { id: "5", title: "تنبيه: خدمة جديدة بانتظار الاعتماد", message: "قام مزود 'صوت الفرح' بإضافة خدمة جديدة (فرقة موسيقية حية). يرجى المراجعة والاعتماد.", type: "system", channel: "in-app", role: "admin", read: false, timestamp: "2026-04-10T14:30:00", relativeTime: "أمس" },
  { id: "6", title: "RSVP — خالد الحربي اعتذر", message: "اعتذر خالد الحربي عن حضور حفل زفاف أحمد وسارة. السبب: التزام سابق.", type: "rsvp", channel: "sms", role: "client", read: true, timestamp: "2026-04-10T12:00:00", relativeTime: "أمس" },
  { id: "7", title: "تحديث طلب — تم قبول الطلب", message: "تم قبول طلبكم لخدمة التصوير الفوتوغرافي من استديو لحظات.", type: "order", channel: "in-app", role: "client", read: true, timestamp: "2026-04-09T10:00:00", relativeTime: "منذ يومين" },
  { id: "8", title: "تنبيه أمان: تسجيل دخول جديد", message: "تم تسجيل دخول جديد لحساب الإدارة من الرياض. إذا لم تكن أنت، يرجى تغيير كلمة المرور.", type: "system", channel: "email", role: "admin", read: true, timestamp: "2026-04-08T08:00:00", relativeTime: "منذ 3 أيام" },
  { id: "9", title: "فاتورة جديدة بانتظار الدفع", message: "تم إصدار فاتورة بقيمة 15,000 ر.س لحجز قاعة النخيل. يرجى إتمام الدفع.", type: "booking", channel: "email", role: "client", read: false, timestamp: "2026-04-11T07:00:00", relativeTime: "منذ 4 ساعات" },
  { id: "10", title: "ملخص النشاط اليومي", message: "3 حجوزات جديدة، 12 رد RSVP، خدمتان بانتظار الاعتماد. اطلع على التفاصيل.", type: "system", channel: "in-app", role: "admin", read: false, timestamp: "2026-04-11T06:00:00", relativeTime: "منذ 5 ساعات" },
];

export default function Notifications() {
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

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h1 className="font-semibold">الإشعارات</h1>
          {unreadCount > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>}
        </div>
        <Button variant="ghost" size="sm" className="text-xs" onClick={markAllRead}>
          <CheckCheck className="w-3 h-3 ml-1" /> قراءة الكل
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-6">
          {/* Role filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-muted-foreground shrink-0">الدور:</span>
            {(["all", "client", "provider", "admin"] as const).map(role => (
              <button key={role} onClick={() => setRoleFilter(role)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${roleFilter === role ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {role === "all" ? "الكل" : role === "client" ? "عميل" : role === "provider" ? "مزود" : "مدير"}
              </button>
            ))}
          </div>
          {/* Type filter */}
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
          {/* Unread toggle */}
          <div className="flex items-center justify-between">
            <button onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${showUnreadOnly ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
              {showUnreadOnly ? <Bell className="w-3 h-3 inline ml-1" /> : <BellOff className="w-3 h-3 inline ml-1" />}
              {showUnreadOnly ? "غير المقروءة فقط" : "عرض الكل"}
            </button>
            <span className="text-xs text-muted-foreground">{filtered.length} إشعار</span>
          </div>
        </motion.div>

        {/* Notification List */}
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
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${tc.class}`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
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
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                              <ChannelIcon className="w-3 h-3" />{cc.label}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              {notif.role === "client" ? "عميل" : notif.role === "provider" ? "مزود" : "مدير"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                            {!notif.read && (
                              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={e => { e.stopPropagation(); markAsRead(notif.id); }}>
                                <Check className="w-3 h-3 ml-1" /> تم القراءة
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive" onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}>
                              <Trash2 className="w-3 h-3 ml-1" /> حذف
                            </Button>
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

        {/* Notification Channels Summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 bg-card rounded-xl shadow-hatm-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">قنوات الإشعارات</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.entries(channelConfig) as [NotifChannel, typeof channelConfig[NotifChannel]][]).map(([key, cfg]) => {
              const count = notifications.filter(n => n.channel === key).length;
              const ChannelIcon = cfg.icon;
              return (
                <div key={key} className="bg-muted/50 rounded-lg p-3 text-center">
                  <ChannelIcon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-medium">{cfg.label}</p>
                  <p className="text-lg font-bold tabular-nums mt-1">{count}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

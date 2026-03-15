import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Users, CheckCircle, Clock, XCircle, Send, QrCode, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "مؤكد", value: 78, icon: CheckCircle, color: "text-success" },
  { label: "اعتذر", value: 12, icon: XCircle, color: "text-muted-foreground" },
  { label: "بلا رد", value: 30, icon: Clock, color: "text-primary" },
];

const guests = [
  { name: "أحمد محمد", status: "confirmed", method: "WhatsApp" },
  { name: "سارة العلي", status: "confirmed", method: "SMS" },
  { name: "خالد الحربي", status: "declined", method: "Email" },
  { name: "نورة السعيد", status: "pending", method: "WhatsApp" },
  { name: "فهد الشمري", status: "confirmed", method: "SMS" },
  { name: "منيرة القحطاني", status: "pending", method: "Email" },
  { name: "عبدالله الدوسري", status: "confirmed", method: "WhatsApp" },
  { name: "هدى المطيري", status: "pending", method: "SMS" },
];

const statusMap: Record<string, { label: string; class: string }> = {
  confirmed: { label: "✅ مؤكد", class: "bg-success/10 text-success" },
  declined: { label: "❌ اعتذر", class: "bg-destructive/10 text-destructive" },
  pending: { label: "⏳ بلا رد", class: "bg-primary/10 text-primary" },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" />
          <span className="text-sm">الرئيسية</span>
        </Link>
        <h1 className="font-semibold">لوحة التحكم</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-6 shadow-hatm-sm"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold">حفل زفاف أحمد وسارة</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <CalendarDays className="w-4 h-4" /> 15 أبريل 2026 • الرياض
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/rsvp"><Button variant="outline" size="sm" className="shadow-hatm-sm"><Send className="w-4 h-4 ml-1" /> إرسال دعوات</Button></Link>
              <Button size="sm" className="bg-primary text-primary-foreground shadow-hatm-sm"><QrCode className="w-4 h-4 ml-1" /> رموز QR</Button>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 shadow-hatm-sm text-center"
            >
              <m.icon className={`w-6 h-6 mx-auto mb-2 ${m.color}`} />
              <p className="text-2xl font-bold tabular-nums">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Guest List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl shadow-hatm-sm overflow-hidden"
        >
          <div className="p-5 flex items-center justify-between">
            <h3 className="font-semibold text-lg">قائمة الضيوف</h3>
            <span className="text-sm text-muted-foreground">{guests.length} ضيف</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t bg-muted/30">
                  <th className="text-right p-3 font-medium text-muted-foreground">الاسم</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">طريقة الإرسال</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((g, i) => (
                  <tr key={i} className="border-t hover:bg-muted/30 transition-colors duration-150">
                    <td className="p-3 font-medium">{g.name}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[g.status].class}`}>
                        {statusMap[g.status].label}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground">{g.method}</td>
                    <td className="p-3">
                      {g.status === "pending" && (
                        <Button variant="ghost" size="sm" className="text-primary text-xs h-7">
                          <Send className="w-3 h-3 ml-1" /> تذكير
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/admin" className="bg-card rounded-xl p-5 shadow-hatm-sm hover:shadow-hatm-md transition-shadow text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-medium">بوابة الإدارة</p>
          </Link>
          <Link to="/vendor" className="bg-card rounded-xl p-5 shadow-hatm-sm hover:shadow-hatm-md transition-shadow text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-medium">بوابة المزودين</p>
          </Link>
          <Link to="/coordinator" className="bg-card rounded-xl p-5 shadow-hatm-sm hover:shadow-hatm-md transition-shadow text-center">
            <CalendarDays className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-medium">بوابة المنسقين</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

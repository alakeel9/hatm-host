import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Users, QrCode, TrendingUp, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const rsvpData = [
  { name: "زفاف أحمد", confirmed: 85, declined: 10, pending: 25 },
  { name: "مؤتمر التقنية", confirmed: 220, declined: 30, pending: 50 },
  { name: "حفل تخرج نورة", confirmed: 55, declined: 5, pending: 20 },
];

const pieData = [
  { name: "مؤكد ✅", value: 360, color: "hsl(142, 70%, 45%)" },
  { name: "اعتذر ❌", value: 45, color: "hsl(0, 72%, 51%)" },
  { name: "بلا رد ⏳", value: 95, color: "hsl(162, 45%, 50%)" },
];

const attendanceData = [
  { day: "السبت", attendance: 78 },
  { day: "الأحد", attendance: 85 },
  { day: "الاثنين", attendance: 62 },
  { day: "الثلاثاء", attendance: 91 },
  { day: "الأربعاء", attendance: 88 },
  { day: "الخميس", attendance: 95 },
  { day: "الجمعة", attendance: 72 },
];

const qrScans = [
  { hour: "4م", scans: 5 },
  { hour: "5م", scans: 18 },
  { hour: "6م", scans: 45 },
  { hour: "7م", scans: 85 },
  { hour: "8م", scans: 120 },
  { hour: "9م", scans: 95 },
  { hour: "10م", scans: 44 },
];

export default function Reports() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">التقارير والتحليلات</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "إجمالي الدعوات", value: "500", icon: Users, color: "text-primary" },
            { label: "نسبة الاستجابة", value: "81%", icon: TrendingUp, color: "text-success" },
            { label: "مسح QR", value: "412", icon: QrCode, color: "text-primary" },
            { label: "الأحداث النشطة", value: "3", icon: CalendarDays, color: "text-primary" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-4 shadow-hatm-sm">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* RSVP Bar Chart */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> إحصائيات RSVP حسب الحدث</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={rsvpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(162, 10%, 85%)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="confirmed" name="مؤكد" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="declined" name="اعتذر" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="بلا رد" fill="hsl(162, 45%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
            <h3 className="font-semibold mb-4">توزيع الردود الإجمالي</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Scans */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><QrCode className="w-5 h-5 text-primary" /> مسح QR خلال الحدث</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={qrScans}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(162, 10%, 85%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="scans" name="مسح" stroke="hsl(162, 45%, 20%)" strokeWidth={2} dot={{ fill: "hsl(162, 45%, 20%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Attendance Trend */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> نسبة الحضور (أسبوعي)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(162, 10%, 85%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="attendance" name="الحضور %" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

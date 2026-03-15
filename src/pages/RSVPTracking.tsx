import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Send, MessageSquare, Mail, Smartphone, Link2, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sendMethods = [
  { id: "whatsapp", label: "واتساب", icon: MessageSquare },
  { id: "sms", label: "SMS", icon: Smartphone },
  { id: "email", label: "إيميل", icon: Mail },
  { id: "link", label: "رابط مستقل", icon: Link2 },
];

export default function RSVPTracking() {
  const [method, setMethod] = useState("whatsapp");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">إرسال الدعوات وتتبع RSVP</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        {/* Send Method */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl font-bold mb-4">اختر طريقة الإرسال</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sendMethods.map(m => (
              <motion.button
                key={m.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMethod(m.id)}
                className={`p-4 rounded-xl shadow-hatm-sm text-center transition-all ${method === m.id ? "ring-2 ring-primary bg-primary/5" : "bg-card hover:shadow-hatm-md"}`}
              >
                <m.icon className={`w-6 h-6 mx-auto mb-2 ${method === m.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm font-medium">{m.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tracking Link */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-5 shadow-hatm-sm">
          <h3 className="font-semibold mb-3">رابط التتبع المستقل</h3>
          <div className="flex gap-2">
            <Input value="https://hatm.host/rsvp/abc123" readOnly className="shadow-hatm-sm text-sm font-mono" dir="ltr" />
            <Button variant="outline" className="shadow-hatm-sm shrink-0" onClick={handleCopy}>
              {copied ? <CheckCircle className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Send */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <Button className="bg-primary text-primary-foreground shadow-hatm-sm h-12 px-8">
            <Send className="w-4 h-4 ml-2" />
            إرسال الدعوات لـ 120 ضيف
          </Button>
          <p className="text-xs text-muted-foreground mt-3">سيتم إرسال الدعوات عبر {sendMethods.find(m => m.id === method)?.label}</p>
        </motion.div>
      </div>
    </div>
  );
}

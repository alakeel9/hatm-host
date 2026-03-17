import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, MessageSquare, Smartphone, Mail, Link2, QrCode, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const methodInfo: Record<string, { label: string; icon: typeof MessageSquare; color: string }> = {
  whatsapp: { label: "واتساب", icon: MessageSquare, color: "bg-[hsl(142,70%,45%)]" },
  sms: { label: "SMS", icon: Smartphone, color: "bg-[hsl(220,70%,50%)]" },
  email: { label: "إيميل", icon: Mail, color: "bg-[hsl(0,72%,51%)]" },
  link: { label: "رابط مستقل", icon: Link2, color: "bg-primary" },
};

function QRCodeMock({ size = 120 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: size, height: size }} className="bg-foreground/5 rounded-lg border border-border p-2 relative">
        <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-[1px]">
          {Array.from({ length: 49 }).map((_, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const isCorner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
            const isRandom = Math.random() > 0.5;
            return (
              <div key={i} className={`rounded-[1px] ${isCorner || isRandom ? "bg-foreground" : "bg-transparent"}`} />
            );
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">QR-HATM-G001</p>
    </div>
  );
}

export default function DeliveryPreview() {
  const { method } = useParams<{ method: string }>();
  const [searchParams] = useSearchParams();
  const template = searchParams.get("template") || "classic";
  const info = methodInfo[method || "whatsapp"];
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/templates" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة للقوالب</span>
        </Link>
        <h1 className="font-semibold">معاينة الإرسال — {info?.label}</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl font-bold mb-2">كيف ستظهر الدعوة للضيف</h2>
          <p className="text-sm text-muted-foreground">قالب: {template} • طريقة الإرسال: {info?.label}</p>
        </motion.div>

        {/* Device Frame */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {method === "whatsapp" && (
            <div className="bg-[hsl(142,20%,93%)] rounded-2xl p-4 max-w-sm mx-auto shadow-hatm-md">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[hsl(142,15%,85%)]">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">حاتم</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">HATM Host</p>
                  <p className="text-[10px] text-muted-foreground">متصل</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm space-y-3">
                <p className="text-sm font-medium">🎉 دعوة حضور</p>
                <p className="text-sm">يسعدنا دعوتكم لحضور <strong>حفل زفاف أحمد وسارة</strong></p>
                <p className="text-xs text-muted-foreground">📅 السبت ١٥ أبريل ٢٠٢٦ — ٧:٠٠ م</p>
                <p className="text-xs text-muted-foreground">📍 فندق الرياض — الرياض</p>
                <QRCodeMock size={80} />
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-[hsl(142,70%,45%)] text-white text-xs font-medium">تأكيد ✅</button>
                  <button className="flex-1 py-2 rounded-lg bg-[hsl(0,72%,51%)] text-white text-xs font-medium">اعتذار ❌</button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">عبر HATM Host — ضيافة حاتم</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">٧:٠٠ م ✓✓</p>
            </div>
          )}

          {method === "sms" && (
            <div className="bg-muted rounded-2xl p-4 max-w-sm mx-auto shadow-hatm-md">
              <div className="text-center mb-3">
                <p className="text-xs text-muted-foreground">رسالة نصية من HATM Host</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm space-y-2">
                <p className="text-sm">🎉 يسعدنا دعوتكم لحضور حفل زفاف أحمد وسارة</p>
                <p className="text-xs text-muted-foreground">📅 السبت ١٥/٤/٢٠٢٦ — ٧ م</p>
                <p className="text-xs text-muted-foreground">📍 فندق الرياض</p>
                <div className="border-t pt-2 mt-2">
                  <p className="text-xs text-primary font-medium">للتأكيد: رد بـ "نعم"</p>
                  <p className="text-xs text-muted-foreground">للاعتذار: رد بـ "لا"</p>
                  <p className="text-[10px] text-muted-foreground mt-2">أو زر الرابط: hatm.host/r/abc123</p>
                </div>
              </div>
            </div>
          )}

          {method === "email" && (
            <div className="bg-muted rounded-2xl p-4 max-w-md mx-auto shadow-hatm-md">
              <div className="bg-card rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="font-medium text-foreground">من:</span> HATM Host &lt;invite@hatm.host&gt;</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="font-medium text-foreground">إلى:</span> guest@email.com</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="font-medium text-foreground">الموضوع:</span> 🎉 دعوة حضور — حفل زفاف أحمد وسارة</div>
                </div>
                <div className="p-6 space-y-4 text-center">
                  <p className="text-xs text-muted-foreground tracking-widest">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                  <h3 className="text-lg font-bold">حفل زفاف أحمد وسارة</h3>
                  <p className="text-sm text-muted-foreground">يسعدنا دعوتكم لمشاركتنا فرحتنا</p>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                    <p>📅 السبت ١٥ أبريل ٢٠٢٦</p>
                    <p>⏰ الساعة ٧:٠٠ مساءً</p>
                    <p>📍 فندق الرياض — الرياض</p>
                  </div>
                  <QRCodeMock size={100} />
                  <div className="flex gap-3 justify-center">
                    <button className="px-6 py-2 rounded-lg bg-[hsl(142,70%,45%)] text-white text-sm font-medium">تأكيد الحضور ✅</button>
                    <button className="px-6 py-2 rounded-lg bg-[hsl(0,72%,51%)] text-white text-sm font-medium">اعتذار ❌</button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">HATM Host — ضيافة حاتم | hatm.host</p>
                </div>
              </div>
            </div>
          )}

          {method === "link" && (
            <div className="bg-muted rounded-2xl p-4 max-w-md mx-auto shadow-hatm-md">
              <div className="bg-card rounded-xl p-6 shadow-sm space-y-4 text-center">
                <div className="bg-muted/50 rounded-lg p-2 text-xs font-mono text-muted-foreground" dir="ltr">
                  https://hatm.host/invite/abc123?guest=ahmed
                </div>
                <div className="border-t pt-4 space-y-3">
                  <p className="text-xs text-muted-foreground tracking-widest">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                  <h3 className="text-xl font-bold">حفل زفاف أحمد وسارة</h3>
                  <p className="text-sm text-muted-foreground">يسعدنا دعوتكم لمشاركتنا فرحتنا</p>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                    <p>📅 السبت ١٥ أبريل ٢٠٢٦ • ⏰ ٧:٠٠ م</p>
                    <p>📍 فندق الرياض — الرياض</p>
                  </div>
                  <QRCodeMock size={120} />
                  <div className="flex gap-3 justify-center">
                    <button className="px-6 py-2 rounded-lg bg-[hsl(142,70%,45%)] text-white text-sm font-medium">تأكيد الحضور ✅</button>
                    <button className="px-6 py-2 rounded-lg bg-[hsl(0,72%,51%)] text-white text-sm font-medium">اعتذار ❌</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Send Action */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center space-y-3">
          {!sent ? (
            <Button className="bg-primary text-primary-foreground shadow-hatm-sm h-12 px-8" onClick={() => setSent(true)}>
              إرسال الدعوات لـ 120 ضيف عبر {info?.label}
            </Button>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-[hsl(142,70%,45%)]/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <p className="font-bold text-lg">تم الإرسال بنجاح! 🎉</p>
              <p className="text-sm text-muted-foreground">تم إرسال 120 دعوة عبر {info?.label}</p>
              <div className="flex gap-3 justify-center pt-2">
                <Link to="/dashboard"><Button className="bg-primary text-primary-foreground">لوحة التحكم</Button></Link>
                <Link to="/qr-scanner"><Button variant="outline">ماسح QR</Button></Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

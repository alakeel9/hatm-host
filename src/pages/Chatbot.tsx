import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CalendarDays, Users, Flower2, UtensilsCrossed, Camera, Building, Armchair, CakeSlice, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const eventTypes = [
  { id: "wedding", label: "زفاف", labelEn: "Wedding", emoji: "💍" },
  { id: "private", label: "حفل خاص", labelEn: "Private Party", emoji: "🎉" },
  { id: "conference", label: "مؤتمر", labelEn: "Conference", emoji: "🎤" },
  { id: "formal", label: "مناسبة رسمية", labelEn: "Formal", emoji: "🏛️" },
];

const optionalServices = [
  { id: "flowers", label: "زهور", icon: Flower2 },
  { id: "catering", label: "ضيافة", icon: UtensilsCrossed },
  { id: "photography", label: "تصوير", icon: Camera },
  { id: "halls", label: "قاعات", icon: Building },
  { id: "lounges", label: "استراحات", icon: Armchair },
  { id: "desserts", label: "حلويات", icon: CakeSlice },
];

const stepAnim = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
};

export default function Chatbot() {
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const canProceed = () => {
    if (step === 0) return !!eventType;
    if (step === 1) return !!date && !!time && !!location;
    if (step === 2) return !!guestCount;
    return true;
  };

  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" />
          <span className="text-sm">العودة</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">حاتم</span>
          </div>
          <span className="font-semibold">مساعد حاتم</span>
        </div>
        <div className="w-20" />
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden max-w-lg mx-auto">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">الخطوة {step + 1} من {totalSteps}</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" {...stepAnim} className="space-y-6">
                <h2 className="text-2xl font-bold text-center">ما نوع مناسبتك؟</h2>
                <div className="grid grid-cols-2 gap-4">
                  {eventTypes.map(et => (
                    <motion.button
                      key={et.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setEventType(et.id)}
                      className={`p-6 rounded-xl shadow-hatm-sm text-center transition-all ${eventType === et.id ? "ring-2 ring-primary bg-primary/5 shadow-hatm-md" : "bg-card hover:shadow-hatm-md"}`}
                    >
                      <span className="text-3xl mb-2 block">{et.emoji}</span>
                      <span className="font-semibold block">{et.label}</span>
                      <span className="text-xs text-muted-foreground">{et.labelEn}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" {...stepAnim} className="space-y-6">
                <h2 className="text-2xl font-bold text-center">تفاصيل المناسبة</h2>
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">التاريخ</label>
                    <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="shadow-hatm-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">الوقت</label>
                    <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="shadow-hatm-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">الموقع</label>
                    <Input placeholder="أدخل موقع المناسبة" value={location} onChange={e => setLocation(e.target.value)} className="shadow-hatm-sm" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...stepAnim} className="space-y-6">
                <h2 className="text-2xl font-bold text-center">عدد الضيوف</h2>
                <div className="max-w-xs mx-auto">
                  <div className="flex items-center gap-4 justify-center">
                    <Users className="w-6 h-6 text-primary" />
                    <Input
                      type="number"
                      placeholder="100"
                      value={guestCount}
                      onChange={e => setGuestCount(e.target.value)}
                      className="text-center text-2xl font-bold h-14 shadow-hatm-sm max-w-[150px]"
                    />
                    <span className="text-muted-foreground">ضيف</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" {...stepAnim} className="space-y-6">
                <h2 className="text-2xl font-bold text-center">خدمات إضافية</h2>
                <p className="text-sm text-muted-foreground text-center">اختر الخدمات التي تريد إضافتها (اختياري)</p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {optionalServices.map(s => (
                    <motion.button
                      key={s.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleService(s.id)}
                      className={`p-4 rounded-xl shadow-hatm-sm text-center transition-all ${selectedServices.includes(s.id) ? "ring-2 ring-primary bg-primary/5 shadow-hatm-md" : "bg-card hover:shadow-hatm-md"}`}
                    >
                      <s.icon className={`w-6 h-6 mx-auto mb-2 ${selectedServices.includes(s.id) ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium block">{s.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" {...stepAnim} className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl text-tam">تم</span>
                </div>
                <h2 className="text-2xl font-bold">مناسبتك جاهزة!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">تم إنشاء مناسبتك بنجاح. يمكنك الآن إرسال الدعوات وتتبع الردود من لوحة التحكم.</p>
                <div className="bg-card rounded-xl p-6 shadow-hatm-sm max-w-sm mx-auto text-right space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">النوع</span>
                    <span className="font-medium">{eventTypes.find(e => e.id === eventType)?.label}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التاريخ</span>
                    <span className="font-medium">{date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الضيوف</span>
                    <span className="font-medium">{guestCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الخدمات</span>
                    <span className="font-medium">{selectedServices.length || "—"}</span>
                  </div>
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <Link to="/dashboard">
                    <Button className="bg-primary text-primary-foreground">لوحة التحكم</Button>
                  </Link>
                  <Link to="/rsvp">
                    <Button variant="outline" className="shadow-hatm-sm">إرسال الدعوات</Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Nav */}
      {step < 4 && (
        <div className="fixed bottom-0 inset-x-0 bg-card shadow-hatm-md p-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between" dir="rtl">
            <Button
              variant="ghost"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-muted-foreground"
            >
              <ArrowRight className="w-4 h-4 ml-1" /> السابق
            </Button>
            <Link to="/manual" className="text-sm text-primary hover:underline">أدير يدوياً</Link>
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed() && step < 3}
              className="bg-primary text-primary-foreground"
            >
              {step === 3 ? "إنهاء" : "التالي"} <ArrowLeft className="w-4 h-4 mr-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

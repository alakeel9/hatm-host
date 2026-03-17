import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, QrCode, ScanLine, CheckCircle, XCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const guestQRs = [
  { id: "G001", name: "أحمد محمد", status: "confirmed", scanned: false },
  { id: "G002", name: "سارة العلي", status: "confirmed", scanned: false },
  { id: "G003", name: "خالد الحربي", status: "confirmed", scanned: false },
  { id: "G004", name: "نورة السعيد", status: "confirmed", scanned: false },
  { id: "G005", name: "فهد الشمري", status: "confirmed", scanned: false },
  { id: "G006", name: "منيرة القحطاني", status: "confirmed", scanned: false },
  { id: "G007", name: "عبدالله الدوسري", status: "confirmed", scanned: false },
  { id: "G008", name: "هدى المطيري", status: "confirmed", scanned: false },
];

export default function QRScanner() {
  const [guests, setGuests] = useState(guestQRs);
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [mode, setMode] = useState<"scan" | "list">("scan");

  const scannedCount = guests.filter(g => g.scanned).length;

  const simulateScan = () => {
    const unscanned = guests.filter(g => !g.scanned);
    if (unscanned.length === 0) return;
    setScanning(true);
    setTimeout(() => {
      const guest = unscanned[Math.floor(Math.random() * unscanned.length)];
      setGuests(prev => prev.map(g => g.id === guest.id ? { ...g, scanned: true } : g));
      setLastScanned(guest.id);
      setScanning(false);
      setTimeout(() => setLastScanned(null), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">ماسح QR — تسجيل الحضور</h1>
        <div className="w-20" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-4 shadow-hatm-sm text-center">
            <p className="text-2xl font-bold tabular-nums text-success">{scannedCount}</p>
            <p className="text-xs text-muted-foreground">حضروا</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl p-4 shadow-hatm-sm text-center">
            <p className="text-2xl font-bold tabular-nums">{guests.length - scannedCount}</p>
            <p className="text-xs text-muted-foreground">متبقي</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-4 shadow-hatm-sm text-center">
            <p className="text-2xl font-bold tabular-nums">{guests.length > 0 ? Math.round((scannedCount / guests.length) * 100) : 0}%</p>
            <p className="text-xs text-muted-foreground">نسبة الحضور</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-card rounded-xl p-1 shadow-hatm-sm">
          <button onClick={() => setMode("scan")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "scan" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            <ScanLine className="w-4 h-4 inline ml-1" /> مسح QR
          </button>
          <button onClick={() => setMode("list")} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            <User className="w-4 h-4 inline ml-1" /> قائمة الحضور
          </button>
        </div>

        {mode === "scan" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Scanner Frame */}
            <div className="bg-card rounded-2xl p-6 shadow-hatm-sm flex flex-col items-center">
              <div className={`w-56 h-56 rounded-2xl border-2 border-dashed flex items-center justify-center relative overflow-hidden ${scanning ? "border-primary" : "border-border"}`}>
                {scanning ? (
                  <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 100 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="absolute w-full h-1 bg-primary/60 shadow-lg"
                  />
                ) : (
                  <QrCode className="w-16 h-16 text-muted-foreground/30" />
                )}
                {scanning && (
                  <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                    <p className="text-sm text-primary font-medium animate-pulse">جاري المسح...</p>
                  </div>
                )}
              </div>
              <Button className="mt-6 bg-primary text-primary-foreground shadow-hatm-sm h-12 px-8" onClick={simulateScan} disabled={scanning || scannedCount === guests.length}>
                <ScanLine className="w-4 h-4 ml-2" />
                {scannedCount === guests.length ? "تم مسح جميع الضيوف" : "مسح رمز QR"}
              </Button>
            </div>

            {/* Last Scanned */}
            <AnimatePresence>
              {lastScanned && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="bg-[hsl(142,70%,45%)]/10 rounded-xl p-4 flex items-center gap-3 shadow-hatm-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{guests.find(g => g.id === lastScanned)?.name}</p>
                    <p className="text-xs text-muted-foreground">QR-HATM-{lastScanned} — تم التسجيل ✅</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {mode === "list" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl shadow-hatm-sm overflow-hidden">
            <div className="divide-y">
              {guests.map((g) => (
                <div key={g.id} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${g.scanned ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {g.scanned ? <CheckCircle className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">QR-HATM-{g.id}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${g.scanned ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {g.scanned ? "حضر ✅" : "لم يحضر"}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

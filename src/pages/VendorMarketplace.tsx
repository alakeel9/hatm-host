import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flower2, UtensilsCrossed, Camera, Building, Armchair, CakeSlice, Star, MapPin, Phone, Mail, CheckCircle, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const vendors = [
  {
    id: "yasmin-flowers",
    name: "زهور الياسمين",
    type: "زهور",
    icon: Flower2,
    rating: 4.9,
    location: "الرياض",
    phone: "+966 50 123 4567",
    email: "info@yasmin.sa",
    image: "🌸",
    products: [
      { id: "f1", name: "بوكيه طاولات (10 قطع)", price: 500 },
      { id: "f2", name: "تنسيق مدخل فاخر", price: 1200 },
      { id: "f3", name: "بوكيه عروس", price: 350 },
      { id: "f4", name: "أقواس زهور", price: 2000 },
    ],
  },
  {
    id: "aldeerah",
    name: "مطعم الديرة",
    type: "ضيافة",
    icon: UtensilsCrossed,
    rating: 4.7,
    location: "الرياض",
    phone: "+966 50 234 5678",
    email: "catering@aldeerah.sa",
    image: "🍽️",
    products: [
      { id: "c1", name: "بوفيه مفتوح (100 شخص)", price: 5000 },
      { id: "c2", name: "بوفيه مفتوح (200 شخص)", price: 9000 },
      { id: "c3", name: "قهوة وتمر VIP", price: 1500 },
      { id: "c4", name: "محطة مشروبات حية", price: 2500 },
    ],
  },
  {
    id: "lahadhaat",
    name: "استديو لحظات",
    type: "تصوير",
    icon: Camera,
    rating: 4.8,
    location: "الرياض / جدة",
    phone: "+966 50 345 6789",
    email: "book@lahadhaat.sa",
    image: "📸",
    products: [
      { id: "p1", name: "تصوير فوتوغرافي (4 ساعات)", price: 3000 },
      { id: "p2", name: "تصوير فيديو سينمائي", price: 5000 },
      { id: "p3", name: "بوث تصوير تفاعلي", price: 2000 },
      { id: "p4", name: "طباعة فورية (200 صورة)", price: 1500 },
    ],
  },
  {
    id: "nakheel-hall",
    name: "قاعة النخيل",
    type: "قاعات",
    icon: Building,
    rating: 4.6,
    location: "الرياض",
    phone: "+966 50 456 7890",
    email: "book@nakheel.sa",
    image: "🏛️",
    products: [
      { id: "h1", name: "قاعة رئيسية (300 شخص)", price: 15000 },
      { id: "h2", name: "قاعة VIP (100 شخص)", price: 8000 },
      { id: "h3", name: "حديقة خارجية", price: 10000 },
    ],
  },
  {
    id: "alward-lounge",
    name: "استراحة الورد",
    type: "استراحات",
    icon: Armchair,
    rating: 4.5,
    location: "الرياض",
    phone: "+966 50 567 8901",
    email: "info@alward.sa",
    image: "🌿",
    products: [
      { id: "l1", name: "استراحة كاملة (يوم واحد)", price: 5000 },
      { id: "l2", name: "استراحة VIP مع مسبح", price: 8000 },
    ],
  },
  {
    id: "saadah-sweets",
    name: "حلويات السعادة",
    type: "حلويات",
    icon: CakeSlice,
    rating: 4.8,
    location: "الرياض",
    phone: "+966 50 678 9012",
    email: "order@saadah.sa",
    image: "🎂",
    products: [
      { id: "d1", name: "كيكة زفاف (3 طبقات)", price: 2000 },
      { id: "d2", name: "بوفيه حلويات متنوعة", price: 3000 },
      { id: "d3", name: "شوكولاتة مخصصة (200 قطعة)", price: 1200 },
      { id: "d4", name: "توزيعات حلويات فاخرة", price: 800 },
    ],
  },
];

export default function VendorMarketplace() {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, string[]>>({});
  const [requestSent, setRequestSent] = useState(false);

  const vendor = vendors.find(v => v.id === selectedVendor);
  const vendorCart = selectedVendor ? (cart[selectedVendor] || []) : [];

  const toggleProduct = (vendorId: string, productId: string) => {
    setCart(prev => {
      const current = prev[vendorId] || [];
      return { ...prev, [vendorId]: current.includes(productId) ? current.filter(p => p !== productId) : [...current, productId] };
    });
  };

  const totalCartItems = Object.values(cart).reduce((sum, items) => sum + items.length, 0);

  const sendRequest = () => {
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">سوق المزودين</h1>
        <div className="flex items-center gap-3">
          <Link to="/provider-orders">
            <Button size="sm" variant="outline" className="shadow-hatm-sm">
              دخول مزودي الخدمة
            </Button>
          </Link>
          {totalCartItems > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{totalCartItems}</span>
          )}
          <ShoppingCart className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-2xl font-bold mb-2">اختر مزودي الخدمات</h2>
          <p className="text-muted-foreground">تصفح المزودين واختر الخدمات المناسبة لمناسبتك</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vendors.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl shadow-hatm-sm hover:shadow-hatm-md transition-all cursor-pointer overflow-hidden"
              onClick={() => setSelectedVendor(v.id)}
            >
              <div className="h-24 bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center text-4xl">
                {v.image}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <v.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">{v.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 text-[hsl(40,70%,45%)] fill-[hsl(40,70%,45%)]" />
                    <span className="font-medium">{v.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{v.location}</p>
                <p className="text-xs text-muted-foreground">{v.products.length} خدمات متاحة</p>
                {(cart[v.id]?.length || 0) > 0 && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{cart[v.id].length} خدمة مختارة</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vendor Detail Modal */}
      <AnimatePresence>
        {selectedVendor && vendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-end md:items-center justify-center"
            onClick={() => setSelectedVendor(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-hatm-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <vendor.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{vendor.name}</h3>
                </div>
                <button onClick={() => setSelectedVendor(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>

              <div className="p-5 space-y-4">
                {/* Vendor Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-[hsl(40,70%,45%)] fill-[hsl(40,70%,45%)]" /><span className="font-medium">{vendor.rating}</span><span className="text-muted-foreground">— {vendor.type}</span></div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="w-4 h-4" />{vendor.location}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Phone className="w-4 h-4" /><span dir="ltr">{vendor.phone}</span></div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Mail className="w-4 h-4" />{vendor.email}</div>
                </div>

                {/* Products */}
                <div>
                  <h4 className="font-semibold mb-3">الخدمات والمنتجات</h4>
                  <div className="space-y-2">
                    {vendor.products.map(p => (
                      <motion.button
                        key={p.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleProduct(vendor.id, p.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all ${vendorCart.includes(p.id) ? "ring-2 ring-primary bg-primary/5" : "bg-muted/50 hover:bg-muted"}`}
                      >
                        <div className="flex items-center gap-2">
                          {vendorCart.includes(p.id) && <CheckCircle className="w-4 h-4 text-primary shrink-0" />}
                          <span className="text-sm font-medium">{p.name}</span>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">{p.price.toLocaleString()} ر.س</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {vendorCart.length > 0 && (
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">المجموع:</span>
                      <span className="font-bold tabular-nums">
                        {vendor.products.filter(p => vendorCart.includes(p.id)).reduce((s, p) => s + p.price, 0).toLocaleString()} ر.س
                      </span>
                    </div>
                    {!requestSent ? (
                      <Button className="w-full bg-primary text-primary-foreground shadow-hatm-sm" onClick={sendRequest}>
                        إرسال الطلب للمنسق
                      </Button>
                    ) : (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-2">
                        <CheckCircle className="w-8 h-8 text-success mx-auto mb-1" />
                        <p className="text-sm font-medium text-success">تم إرسال الطلب! ✅</p>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

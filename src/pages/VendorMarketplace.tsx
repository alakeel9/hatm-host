// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Flower2, UtensilsCrossed, Camera, Building, Armchair, CakeSlice,
  Star, MapPin, Phone, Mail, CheckCircle, ShoppingCart, X, Music, Sparkles,
  Plus, XCircle, Clock, Search, Image as ImageIcon, Edit2, Trash2, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ---------------- Marketplace data ---------------- */
const vendors = [
  { id: "yasmin-flowers", name: "زهور الياسمين", type: "زهور", icon: Flower2, rating: 4.9, location: "الرياض", phone: "+966 50 123 4567", email: "info@yasmin.sa", image: "🌸",
    products: [
      { id: "f1", name: "بوكيه طاولات (10 قطع)", price: 500 },
      { id: "f2", name: "تنسيق مدخل فاخر", price: 1200 },
      { id: "f3", name: "بوكيه عروس", price: 350 },
      { id: "f4", name: "أقواس زهور", price: 2000 },
    ] },
  { id: "aldeerah", name: "مطعم الديرة", type: "ضيافة", icon: UtensilsCrossed, rating: 4.7, location: "الرياض", phone: "+966 50 234 5678", email: "catering@aldeerah.sa", image: "🍽️",
    products: [
      { id: "c1", name: "بوفيه مفتوح (100 شخص)", price: 5000 },
      { id: "c2", name: "بوفيه مفتوح (200 شخص)", price: 9000 },
      { id: "c3", name: "قهوة وتمر VIP", price: 1500 },
      { id: "c4", name: "محطة مشروبات حية", price: 2500 },
    ] },
  { id: "lahadhaat", name: "استديو لحظات", type: "تصوير", icon: Camera, rating: 4.8, location: "الرياض / جدة", phone: "+966 50 345 6789", email: "book@lahadhaat.sa", image: "📸",
    products: [
      { id: "p1", name: "تصوير فوتوغرافي (4 ساعات)", price: 3000 },
      { id: "p2", name: "تصوير فيديو سينمائي", price: 5000 },
      { id: "p3", name: "بوث تصوير تفاعلي", price: 2000 },
      { id: "p4", name: "طباعة فورية (200 صورة)", price: 1500 },
    ] },
  { id: "nakheel-hall", name: "قاعة النخيل", type: "قاعات", icon: Building, rating: 4.6, location: "الرياض", phone: "+966 50 456 7890", email: "book@nakheel.sa", image: "🏛️",
    products: [
      { id: "h1", name: "قاعة رئيسية (300 شخص)", price: 15000 },
      { id: "h2", name: "قاعة VIP (100 شخص)", price: 8000 },
      { id: "h3", name: "حديقة خارجية", price: 10000 },
    ] },
  { id: "alward-lounge", name: "استراحة الورد", type: "استراحات", icon: Armchair, rating: 4.5, location: "الرياض", phone: "+966 50 567 8901", email: "info@alward.sa", image: "🌿",
    products: [
      { id: "l1", name: "استراحة كاملة (يوم واحد)", price: 5000 },
      { id: "l2", name: "استراحة VIP مع مسبح", price: 8000 },
    ] },
  { id: "saadah-sweets", name: "حلويات السعادة", type: "حلويات", icon: CakeSlice, rating: 4.8, location: "الرياض", phone: "+966 50 678 9012", email: "order@saadah.sa", image: "🎂",
    products: [
      { id: "d1", name: "كيكة زفاف (3 طبقات)", price: 2000 },
      { id: "d2", name: "بوفيه حلويات متنوعة", price: 3000 },
      { id: "d3", name: "شوكولاتة مخصصة (200 قطعة)", price: 1200 },
      { id: "d4", name: "توزيعات حلويات فاخرة", price: 800 },
    ] },
];

/* ---------------- Service Listings data ---------------- */
type ListingStatus = "pending" | "approved" | "rejected";
interface ServiceListing {
  id: string; name: string; description: string; category: string;
  priceMin: number; priceMax: number; availability: string; images: string[];
  provider: string; rating: number; status: ListingStatus; createdAt: string;
}
const categories = [
  { id: "catering", label: "ضيافة", icon: UtensilsCrossed },
  { id: "photography", label: "تصوير", icon: Camera },
  { id: "halls", label: "قاعات", icon: Building },
  { id: "flowers", label: "زهور", icon: Flower2 },
  { id: "lounges", label: "استراحات", icon: Armchair },
  { id: "sweets", label: "حلويات", icon: CakeSlice },
  { id: "entertainment", label: "ترفيه", icon: Music },
  { id: "decor", label: "ديكور", icon: Sparkles },
];
const mockListings: ServiceListing[] = [
  { id: "1", name: "بوفيه مفتوح فاخر", description: "بوفيه شامل لجميع المناسبات يشمل أطباق عربية وعالمية مع خدمة ضيافة كاملة.", category: "catering", priceMin: 5000, priceMax: 15000, availability: "متاح — حجز مسبق 7 أيام", images: ["🍽️"], provider: "مطعم الديرة", rating: 4.7, status: "approved", createdAt: "2026-03-01" },
  { id: "2", name: "تصوير فوتوغرافي سينمائي", description: "تصوير احترافي بأحدث المعدات مع مونتاج سينمائي وتسليم خلال أسبوع.", category: "photography", priceMin: 3000, priceMax: 8000, availability: "متاح — الأسبوع القادم", images: ["📸"], provider: "استديو لحظات", rating: 4.8, status: "approved", createdAt: "2026-03-05" },
  { id: "3", name: "تنسيق زهور كامل", description: "تنسيق زهور طبيعية للمداخل والطاولات وبوكيهات العروس.", category: "flowers", priceMin: 1500, priceMax: 5000, availability: "متاح", images: ["🌸"], provider: "زهور الياسمين", rating: 4.9, status: "approved", createdAt: "2026-02-20" },
  { id: "4", name: "قاعة النخيل الكبرى", description: "قاعة فاخرة تتسع لـ 500 ضيف مع إضاءة وصوت متكامل.", category: "halls", priceMin: 15000, priceMax: 30000, availability: "متاح — أبريل ومايو", images: ["🏛️"], provider: "قاعة النخيل", rating: 4.6, status: "approved", createdAt: "2026-02-15" },
  { id: "5", name: "كيك زفاف مخصص", description: "كيك زفاف متعدد الطبقات بتصميم مخصص حسب الطلب.", category: "sweets", priceMin: 1500, priceMax: 4000, availability: "حجز مسبق 14 يوم", images: ["🎂"], provider: "حلويات السعادة", rating: 4.8, status: "pending", createdAt: "2026-04-01" },
  { id: "6", name: "فرقة موسيقية حية", description: "فرقة موسيقية متخصصة في المناسبات مع DJ ومعدات صوت.", category: "entertainment", priceMin: 4000, priceMax: 10000, availability: "حجز مسبق 21 يوم", images: ["🎵"], provider: "صوت الفرح", rating: 4.5, status: "pending", createdAt: "2026-04-05" },
  { id: "7", name: "ديكور مناسبات فاخر", description: "تصميم وتنفيذ ديكور كامل للمناسبات بأحدث الصيحات.", category: "decor", priceMin: 8000, priceMax: 20000, availability: "متاح", images: ["✨"], provider: "لمسات الإبداع", rating: 4.4, status: "rejected", createdAt: "2026-03-28" },
];
const statusConfig: Record<ListingStatus, { label: string; icon: any; class: string }> = {
  pending: { label: "بانتظار الموافقة", icon: Clock, class: "bg-accent/10 text-accent" },
  approved: { label: "معتمد", icon: CheckCircle, class: "bg-success/10 text-success" },
  rejected: { label: "مرفوض", icon: XCircle, class: "bg-destructive/10 text-destructive" },
};
type ViewMode = "client" | "provider" | "admin";
type Tab = "vendors" | "services";

export default function VendorMarketplace() {
  const [tab, setTab] = useState<Tab>("vendors");

  /* Marketplace state */
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
  const sendRequest = () => { setRequestSent(true); setTimeout(() => setRequestSent(false), 3000); };

  /* Service listings state */
  const [viewMode, setViewMode] = useState<ViewMode>("client");
  const [listings, setListings] = useState(mockListings);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListing, setNewListing] = useState({ name: "", description: "", category: "catering", priceMin: "", priceMax: "", availability: "" });
  const [createSuccess, setCreateSuccess] = useState(false);

  const filteredListings = listings.filter(l => {
    const matchCategory = !selectedCategory || l.category === selectedCategory;
    const matchSearch = !searchQuery || l.name.includes(searchQuery) || l.description.includes(searchQuery) || l.provider.includes(searchQuery);
    if (viewMode === "client") return matchCategory && matchSearch && l.status === "approved";
    return matchCategory && matchSearch;
  });
  const detail = listings.find(l => l.id === selectedListing);
  const categoryInfo = (cat: string) => categories.find(c => c.id === cat);
  const handleCreate = () => {
    if (!newListing.name || !newListing.description) return;
    const listing: ServiceListing = {
      id: Date.now().toString(),
      name: newListing.name, description: newListing.description, category: newListing.category,
      priceMin: Number(newListing.priceMin) || 0, priceMax: Number(newListing.priceMax) || 0,
      availability: newListing.availability || "متاح", images: ["📦"],
      provider: "مزود جديد", rating: 0, status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setListings(prev => [listing, ...prev]);
    setNewListing({ name: "", description: "", category: "catering", priceMin: "", priceMax: "", availability: "" });
    setCreateSuccess(true);
    setTimeout(() => { setCreateSuccess(false); setShowCreateForm(false); }, 2000);
  };
  const handleApprove = (id: string) => setListings(prev => prev.map(l => l.id === id ? { ...l, status: "approved" as ListingStatus } : l));
  const handleReject = (id: string) => setListings(prev => prev.map(l => l.id === id ? { ...l, status: "rejected" as ListingStatus } : l));
  const handleDelete = (id: string) => { setListings(prev => prev.filter(l => l.id !== id)); setSelectedListing(null); };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 shadow-hatm-sm bg-card">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4" /><span className="text-sm">العودة</span>
        </Link>
        <h1 className="font-semibold">سوق المزودين والخدمات</h1>
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

      {/* Tabs */}
      <div className="container mx-auto px-4 pt-6 max-w-6xl">
        <div className="inline-flex items-center gap-1 bg-muted rounded-lg p-1">
          <button onClick={() => setTab("vendors")}
            className={`text-sm px-4 py-2 rounded-md font-medium transition-colors ${tab === "vendors" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
            سوق المزودين
          </button>
          <button onClick={() => setTab("services")}
            className={`text-sm px-4 py-2 rounded-md font-medium transition-colors ${tab === "services" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
            قائمة الخدمات
          </button>
        </div>
      </div>

      {/* ============= VENDORS TAB ============= */}
      {tab === "vendors" && (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold mb-2">اختر مزودي الخدمات</h2>
            <p className="text-muted-foreground">تصفح المزودين واختر الخدمات المناسبة لمناسبتك</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vendors.map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl shadow-hatm-sm hover:shadow-hatm-md transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedVendor(v.id)}>
                <div className="h-24 bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center text-4xl">{v.image}</div>
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
      )}

      {/* ============= SERVICES TAB ============= */}
      {tab === "services" && (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {viewMode === "client" ? "استعرض الخدمات" : viewMode === "provider" ? "خدماتي" : "إدارة الخدمات"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {viewMode === "client" ? "اختر الخدمات المناسبة لمناسبتك" : viewMode === "provider" ? "أنشئ وأدر قوائم خدماتك" : "راجع واعتمد الخدمات المقدمة من المزودين"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                {(["client", "provider", "admin"] as ViewMode[]).map(mode => (
                  <button key={mode} onClick={() => setViewMode(mode)}
                    className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${viewMode === mode ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
                    {mode === "client" ? "عميل" : mode === "provider" ? "مزود" : "مدير"}
                  </button>
                ))}
              </div>
              {viewMode === "provider" && (
                <Button onClick={() => setShowCreateForm(true)} className="bg-primary text-primary-foreground shadow-hatm-sm">
                  <Plus className="w-4 h-4 ml-1" /> إضافة خدمة
                </Button>
              )}
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="ابحث عن خدمة..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pr-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button onClick={() => setSelectedCategory(null)}
                className={`shrink-0 text-xs px-3 py-2 rounded-lg font-medium transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                <Filter className="w-3 h-3 inline ml-1" />الكل
              </button>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`shrink-0 text-xs px-3 py-2 rounded-lg font-medium transition-colors ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                  <cat.icon className="w-3 h-3 inline ml-1" />{cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((listing, i) => {
              const cat = categoryInfo(listing.category);
              const CatIcon = cat?.icon || Sparkles;
              const st = statusConfig[listing.status];
              return (
                <motion.div key={listing.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-card rounded-xl shadow-hatm-sm hover:shadow-hatm-md transition-all cursor-pointer overflow-hidden"
                  onClick={() => setSelectedListing(listing.id)}>
                  <div className="h-24 bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center text-4xl">{listing.images[0]}</div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CatIcon className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-sm">{listing.name}</h3>
                      </div>
                      {listing.rating > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3.5 h-3.5 text-[hsl(40,70%,45%)] fill-[hsl(40,70%,45%)]" />
                          <span className="font-medium">{listing.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{listing.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tabular-nums">{listing.priceMin.toLocaleString()} — {listing.priceMax.toLocaleString()} ر.س</span>
                      {viewMode !== "client" && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${st.class}`}>{st.label}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{listing.provider}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>لا توجد خدمات مطابقة</p>
            </div>
          )}
        </div>
      )}

      {/* Vendor Detail Modal */}
      <AnimatePresence>
        {selectedVendor && vendor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-end md:items-center justify-center" onClick={() => setSelectedVendor(null)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-hatm-lg" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <vendor.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{vendor.name}</h3>
                </div>
                <button onClick={() => setSelectedVendor(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-[hsl(40,70%,45%)] fill-[hsl(40,70%,45%)]" /><span className="font-medium">{vendor.rating}</span><span className="text-muted-foreground">— {vendor.type}</span></div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="w-4 h-4" />{vendor.location}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Phone className="w-4 h-4" /><span dir="ltr">{vendor.phone}</span></div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground"><Mail className="w-4 h-4" />{vendor.email}</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">الخدمات والمنتجات</h4>
                  <div className="space-y-2">
                    {vendor.products.map(p => (
                      <motion.button key={p.id} whileTap={{ scale: 0.98 }} onClick={() => toggleProduct(vendor.id, p.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-right transition-all ${vendorCart.includes(p.id) ? "ring-2 ring-primary bg-primary/5" : "bg-muted/50 hover:bg-muted"}`}>
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

      {/* Service Listing Detail Modal */}
      <AnimatePresence>
        {selectedListing && detail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-end md:items-center justify-center" onClick={() => setSelectedListing(null)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-hatm-lg" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">{detail.name}</h3>
                <button onClick={() => setSelectedListing(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary rounded-xl flex items-center justify-center text-5xl">{detail.images[0]}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[detail.status].class}`}>{statusConfig[detail.status].label}</span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{categoryInfo(detail.category)?.label}</span>
                  {detail.rating > 0 && (
                    <span className="flex items-center gap-1 text-xs"><Star className="w-3 h-3 text-[hsl(40,70%,45%)] fill-[hsl(40,70%,45%)]" />{detail.rating}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground mb-1">نطاق السعر</p><p className="font-semibold tabular-nums">{detail.priceMin.toLocaleString()} — {detail.priceMax.toLocaleString()} ر.س</p></div>
                  <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground mb-1">التوفر</p><p className="font-semibold text-xs">{detail.availability}</p></div>
                  <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground mb-1">المزود</p><p className="font-semibold">{detail.provider}</p></div>
                  <div className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground mb-1">تاريخ الإنشاء</p><p className="font-semibold tabular-nums">{detail.createdAt}</p></div>
                </div>
                {viewMode === "client" && (
                  <Button className="w-full bg-primary text-primary-foreground shadow-hatm-sm">اختيار هذه الخدمة</Button>
                )}
                {viewMode === "provider" && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1"><Edit2 className="w-4 h-4 ml-1" /> تعديل</Button>
                    <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => handleDelete(detail.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {viewMode === "admin" && detail.status === "pending" && (
                  <div className="flex gap-2">
                    <Button onClick={() => { handleApprove(detail.id); setSelectedListing(null); }} className="flex-1 bg-success text-white hover:bg-success/90">
                      <CheckCircle className="w-4 h-4 ml-1" /> اعتماد
                    </Button>
                    <Button onClick={() => { handleReject(detail.id); setSelectedListing(null); }} variant="outline" className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/5">
                      <XCircle className="w-4 h-4 ml-1" /> رفض
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Service Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-end md:items-center justify-center" onClick={() => setShowCreateForm(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-hatm-lg" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-card z-10 p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">إضافة خدمة جديدة</h3>
                <button onClick={() => setShowCreateForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              {createSuccess ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-10 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <p className="font-semibold text-lg">تم إضافة الخدمة!</p>
                  <p className="text-sm text-muted-foreground mt-1">بانتظار اعتماد المدير</p>
                </motion.div>
              ) : (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">اسم الخدمة *</label>
                    <Input value={newListing.name} onChange={e => setNewListing({ ...newListing, name: e.target.value })} placeholder="مثال: بوفيه مفتوح فاخر" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">الوصف *</label>
                    <Textarea value={newListing.description} onChange={e => setNewListing({ ...newListing, description: e.target.value })} placeholder="وصف تفصيلي للخدمة..." rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">التصنيف</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button key={cat.id} onClick={() => setNewListing({ ...newListing, category: cat.id })}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${newListing.category === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          <cat.icon className="w-3 h-3 inline ml-1" />{cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-sm font-medium mb-1 block">السعر الأدنى (ر.س)</label><Input type="number" value={newListing.priceMin} onChange={e => setNewListing({ ...newListing, priceMin: e.target.value })} placeholder="1000" /></div>
                    <div><label className="text-sm font-medium mb-1 block">السعر الأعلى (ر.س)</label><Input type="number" value={newListing.priceMax} onChange={e => setNewListing({ ...newListing, priceMax: e.target.value })} placeholder="5000" /></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">التوفر</label>
                    <Input value={newListing.availability} onChange={e => setNewListing({ ...newListing, availability: e.target.value })} placeholder="مثال: متاح — حجز مسبق 7 أيام" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">صور الخدمة</label>
                    <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                      <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">اضغط لرفع الصور</p>
                    </div>
                  </div>
                  <Button onClick={handleCreate} className="w-full bg-primary text-primary-foreground shadow-hatm-sm" disabled={!newListing.name || !newListing.description}>
                    إضافة الخدمة
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

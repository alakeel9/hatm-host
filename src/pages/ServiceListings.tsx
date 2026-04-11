// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Plus, X, CheckCircle, XCircle, Clock, Star, Search,
  Image as ImageIcon, Edit2, Trash2, Eye, Filter,
  Flower2, UtensilsCrossed, Camera, Building, Armchair, CakeSlice, Music, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ListingStatus = "pending" | "approved" | "rejected";

interface ServiceListing {
  id: string;
  name: string;
  description: string;
  category: string;
  priceMin: number;
  priceMax: number;
  availability: string;
  images: string[];
  provider: string;
  rating: number;
  status: ListingStatus;
  createdAt: string;
}

const categories = [
  { id: "catering", label: "ضيافة", labelEn: "Catering", icon: UtensilsCrossed },
  { id: "photography", label: "تصوير", labelEn: "Photography", icon: Camera },
  { id: "halls", label: "قاعات", labelEn: "Halls", icon: Building },
  { id: "flowers", label: "زهور", labelEn: "Flowers", icon: Flower2 },
  { id: "lounges", label: "استراحات", labelEn: "Lounges", icon: Armchair },
  { id: "sweets", label: "حلويات", labelEn: "Sweets", icon: CakeSlice },
  { id: "entertainment", label: "ترفيه", labelEn: "Entertainment", icon: Music },
  { id: "decor", label: "ديكور", labelEn: "Decor", icon: Sparkles },
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

export default function ServiceListings() {
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
    if (viewMode === "provider") return matchCategory && matchSearch;
    return matchCategory && matchSearch; // admin sees all
  });

  const detail = listings.find(l => l.id === selectedListing);
  const categoryInfo = (cat: string) => categories.find(c => c.id === cat);

  const handleCreate = () => {
    if (!newListing.name || !newListing.description) return;
    const listing: ServiceListing = {
      id: Date.now().toString(),
      name: newListing.name,
      description: newListing.description,
      category: newListing.category,
      priceMin: Number(newListing.priceMin) || 0,
      priceMax: Number(newListing.priceMax) || 0,
      availability: newListing.availability || "متاح",
      images: [categoryInfo(newListing.category)?.icon ? "📦" : "📦"],
      provider: "مزود جديد",
      rating: 0,
      status: "pending",
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
        <h1 className="font-semibold">قائمة الخدمات</h1>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {(["client", "provider", "admin"] as ViewMode[]).map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${viewMode === mode ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
              {mode === "client" ? "عميل" : mode === "provider" ? "مزود" : "مدير"}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Title & Actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {viewMode === "client" ? "استعرض الخدمات" : viewMode === "provider" ? "خدماتي" : "إدارة الخدمات"}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {viewMode === "client" ? "اختر الخدمات المناسبة لمناسبتك" : viewMode === "provider" ? "أنشئ وأدر قوائم خدماتك" : "راجع واعتمد الخدمات المقدمة من المزودين"}
            </p>
          </div>
          {viewMode === "provider" && (
            <Button onClick={() => setShowCreateForm(true)} className="bg-primary text-primary-foreground shadow-hatm-sm">
              <Plus className="w-4 h-4 ml-1" /> إضافة خدمة جديدة
            </Button>
          )}
        </motion.div>

        {/* Search & Filter */}
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

        {/* Listings Grid */}
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

      {/* Detail Modal */}
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

                {/* Client: Select */}
                {viewMode === "client" && (
                  <Button className="w-full bg-primary text-primary-foreground shadow-hatm-sm">اختيار هذه الخدمة</Button>
                )}

                {/* Provider: Edit/Delete */}
                {viewMode === "provider" && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1"><Edit2 className="w-4 h-4 ml-1" /> تعديل</Button>
                    <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => handleDelete(detail.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Admin: Approve / Reject */}
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

      {/* Create Service Modal (Provider) */}
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

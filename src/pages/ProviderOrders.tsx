// @ts-nocheck
import { useState } from "react";

type OrderStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

type Order = {
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  price: number;
  status: OrderStatus;
};

const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    clientName: "Ahmed Ali",
    serviceName: "Photography",
    date: "2026-04-15",
    price: 1200,
    status: "pending",
  },
  {
    id: "ORD-1002",
    clientName: "Sara Mohamed",
    serviceName: "Catering",
    date: "2026-04-14",
    price: 2500,
    status: "in_progress",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "قيد الانتظار",
  accepted: "مقبول",
  in_progress: "قيد التنفيذ",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">طلباتي</h1>
        <select
          className="border border-border rounded-lg px-3 py-2 bg-card text-card-foreground"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">الكل</option>
          <option value="pending">قيد الانتظار</option>
          <option value="accepted">مقبول</option>
          <option value="in_progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      {/* Orders Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border border-border rounded-xl p-4 shadow-sm space-y-3 bg-card"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{order.id}</span>
              <span
                className={`px-2 py-1 rounded text-sm ${statusStyles[order.status]}`}
              >
                {statusLabels[order.status]}
              </span>
            </div>

            <div>
              <p className="font-medium">{order.clientName}</p>
              <p className="text-muted-foreground">{order.serviceName}</p>
              <p className="text-sm text-muted-foreground/70">{order.date}</p>
            </div>

            <div className="font-bold">{order.price} SAR</div>

            <div className="flex gap-2 flex-wrap">
              {order.status === "pending" && (
                <>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => updateStatus(order.id, "accepted")}
                  >
                    قبول
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => updateStatus(order.id, "cancelled")}
                  >
                    رفض
                  </button>
                </>
              )}
              {order.status === "accepted" && (
                <button
                  className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                  onClick={() => updateStatus(order.id, "in_progress")}
                >
                  بدء التنفيذ
                </button>
              )}
              {order.status === "in_progress" && (
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  onClick={() => updateStatus(order.id, "completed")}
                >
                  إنهاء الطلب
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

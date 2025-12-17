
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ShoppingBag, ShoppingCart, Wallet, CheckCircle } from "lucide-react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const BuyerStatistics = ({ email }) => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("7 Days");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Buyer Orders 
  useEffect(() => {
    if (!email) return;
    setLoading(true);
    axiosSecure
      .get(`/orders?email=${email}`)
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, [email, axiosSecure]);

  // Filter Orders by Date 
  const filterByDate = (items) => {
    const now = new Date();
    const days = filter === "Today" ? 1 : filter === "7 Days" ? 7 : 30;
    return items.filter((item) => {
      const date = new Date(item.createdAt);
      const diff = (now - date) / (1000 * 60 * 60 * 24);
      return diff < days;
    });
  };

  const filteredOrders = filterByDate(orders);
  const deliveredOrders = filteredOrders.filter((o) => o.status === "Delivered");
  const pendingOrders = filteredOrders.filter((o) => o.status === "Pending");
  const cancelledOrders = filteredOrders.filter((o) => o.status === "Cancelled");
  const totalSpend = filteredOrders.reduce((acc, o) => acc + (o.total || 0), 0);

  // Weekly Chart Data
  const weeklyChart = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({
    name: day,
    orders: filteredOrders.filter(
      (o) =>
        new Date(o.createdAt).toLocaleDateString("en-US", { weekday: "short" }) === day
    ).length,
    spend: filteredOrders
      .filter(
        (o) =>
          new Date(o.createdAt).toLocaleDateString("en-US", { weekday: "short" }) === day
      )
      .reduce((acc, o) => acc + (o.total || 0), 0),
  }));

  // Pie Chart Data
  const pieData = [
    { name: "Delivered", value: deliveredOrders.length },
    { name: "Pending", value: pendingOrders.length },
    { name: "Cancelled", value: cancelledOrders.length },
  ];

  const StatCard = ({ title, value, subText, icon: Icon, color }) => (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow flex flex-col justify-between transition-all hover:shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{title}</span>
        <Icon className={color} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold">{value}</h2>
      <p className="text-xs text-green-500">{subText}</p>
    </div>
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
        <h1 className="text-xl sm:text-2xl text-lime-600 font-bold">
          Buyer Dashboard
        </h1>
        <div className="flex flex-wrap gap-2">
          {["Today", "7 Days", "30 Days"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                filter === t
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard
          title={`My Orders (${filter})`}
          value={filteredOrders.length}
          subText={`Delivered: ${deliveredOrders.length}`}
          icon={ShoppingCart}
          color="text-blue-500"
        />
        <StatCard
          title="Delivered Orders"
          value={deliveredOrders.length}
          subText="Successfully received"
          icon={CheckCircle}
          color="text-green-500"
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders.length}
          subText="On the way"
          icon={ShoppingBag}
          color="text-yellow-500"
        />
        <StatCard
          title="Total Spend"
          value={`৳ ${totalSpend.toLocaleString()}`}
          subText="All time spending"
          icon={Wallet}
          color="text-emerald-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Orders & Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `৳ ${value}`} />
              <Legend />
              <Line dataKey="orders" stroke="#3B82F6" strokeWidth={3} name="Orders" />
              <Line dataKey="spend" stroke="#10B981" strokeWidth={3} name="Spend (৳)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={100}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Orders Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#60A5FA" radius={[4, 4, 0, 0]} name="Orders" />
              <Bar dataKey="spend" fill="#34D399" radius={[4, 4, 0, 0]} name="Spend (৳)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BuyerStatistics;

import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
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
import {
  ShoppingBag,
  ShoppingCart,
  Wallet,
  CheckCircle,
} from "lucide-react";
import { TbAlertCircle } from "react-icons/tb";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const BuyerStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [filter, setFilter] = useState("7 Days");
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 1. Data Fetching
  useEffect(() => {
    if (!user?.email) return;

    const loadAllData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [ordersRes, userRes] = await Promise.all([
          axiosSecure.get(`/orders?email=${user.email}`),
          axiosSecure.get(`/user?email=${user.email}`),
        ]);

        setOrders(ordersRes.data || []);
        setUserData(userRes.data);
      } catch (err) {
        console.error("BuyerStatistics Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [user?.email, axiosSecure]);


  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-50">
        <div className="text-center">
          <TbAlertCircle className="text-5xl mx-auto mb-2" />
          <p className="text-lg font-semibold">Something went wrong fetching data.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No user record found.
      </div>
    );
  }

  if (userData?.status === "Suspended") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50">
        <TbAlertCircle className="text-7xl text-red-500 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Account is Suspended!
        </h2>
        <p className="text-gray-500 max-w-md">
          Your access has been restricted. Please contact our support team at <span className="font-bold">support@example.com</span> to reactivate your account.
        </p>
      </div>
    );
  }


  const filterByDate = (items = []) => {
    const now = new Date();
    const days = filter === "Today" ? 1 : filter === "7 Days" ? 7 : 30;

    return items.filter((item) => {
      if (!item.createdAt) return false;
      const diff = (now - new Date(item.createdAt)) / (1000 * 60 * 60 * 24);
      return diff < days;
    });
  };

  const filteredOrders = filterByDate(orders);
  const deliveredOrders = filteredOrders.filter((o) => o.status === "Delivered");
  const pendingOrders = filteredOrders.filter((o) => o.status === "Pending");
  const cancelledOrders = filteredOrders.filter((o) => o.status === "Cancelled");
  const totalSpend = filteredOrders.reduce((acc, o) => acc + (o.total || 0), 0);

  const weeklyChart = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({
    name: day,
    orders: filteredOrders.filter(
      (o) => new Date(o.createdAt).toLocaleDateString("en-US", { weekday: "short" }) === day
    ).length,
    spend: filteredOrders
      .filter((o) => new Date(o.createdAt).toLocaleDateString("en-US", { weekday: "short" }) === day)
      .reduce((acc, o) => acc + (o.total || 0), 0),
  }));

  const pieData = [
    { name: "Delivered", value: deliveredOrders.length },
    { name: "Pending", value: pendingOrders.length },
    { name: "Cancelled", value: cancelledOrders.length },
  ];

  const StatCard = ({ title, value, subText, icon: Icon, color }) => (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        <Icon className={color} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      <p className="text-xs text-green-500 font-semibold">{subText}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Buyer Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {userData.name || 'User'}</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm w-fit">
          {["Today", "7 Days", "30 Days"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                filter === t ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="My Orders" value={filteredOrders.length} subText={`Items in ${filter}`} icon={ShoppingCart} color="text-blue-500" />
        <StatCard title="Delivered" value={deliveredOrders.length} subText="Successful" icon={CheckCircle} color="text-green-500" />
        <StatCard title="Pending" value={pendingOrders.length} subText="In Progress" icon={ShoppingBag} color="text-yellow-500" />
        <StatCard title="Total Spend" value={`${totalSpend.toLocaleString()} ৳`} subText="Filtered period" icon={Wallet} color="text-emerald-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl lg:col-span-2 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Order & Spend Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                formatter={(v, name) => [name === "spend" ? `৳ ${v}` : v, name === "spend" ? "Spending" : "Orders"]}
              />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="spend" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={90} paddingAngle={5}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl lg:col-span-3 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Activity Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "#f9fafb" }} />
              <Legend iconType="rect" />
              <Bar dataKey="orders" fill="#60A5FA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spend" fill="#34D399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BuyerStatistics;
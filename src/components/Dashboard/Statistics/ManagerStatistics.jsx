import { useEffect, useState } from "react";
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
import { ShoppingCart, Package, DollarSign, CheckCircle } from "lucide-react";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const ManagerStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("7 Days");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data 
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axiosSecure.get("/products"),
      axiosSecure.get("/orders"),
      axiosSecure.get("/users"),
    ])
      .then(([productsRes, ordersRes, usersRes]) => {
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter By Date 
  const filterByDate = (items, field) => {
    const now = new Date();
    let days = filter === "Today" ? 1 : filter === "7 Days" ? 7 : 30;

    return items?.filter((item) => {
      const date = new Date(item[field]);
      const diff = (now - date) / (1000 * 60 * 60 * 24);
      return diff < days;
    });
  };

  const filteredProducts = filterByDate(products, "createdAt");
  const filteredOrders = filterByDate(orders, "createdAt");
  const filteredUsers = filterByDate(users, "created_at");
  const activeOrders = filteredOrders.filter(
    (o) => o.status === "Pending" || o.status === "Active"
  ).length;
  const completedOrders = filteredOrders.filter(
    (o) => o.status === "Completed"
  ).length;
  const totalRevenue = filteredOrders.reduce((acc, cur) => acc + (cur.total || 0), 0);

  // Weekly Chart 
  const weeklyChart = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => ({
    name: day,
    orders: filteredOrders.filter(
      (o) =>
        new Date(o.createdAt).toLocaleDateString("en-US", { weekday: "short" }) ===
        day
    ).length,
    revenue: filteredOrders
      .filter(
        (o) =>
          new Date(o.createdAt).toLocaleDateString("en-US", { weekday: "short" }) ===
          day
      )
      .reduce((acc, cur) => acc + (cur.total || 0), 0),
    products: filteredProducts.filter(
      (p) =>
        new Date(p.createdAt).toLocaleDateString("en-US", { weekday: "short" }) ===
        day
    ).length,
  }));

  // Pie Chart 
  const pieData = [
    { name: "Approved", value: orders.filter(o => o.status === "Approved").length },
    { name: "Pending", value: orders.filter(o => o.status === "Pending").length },
    { name: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length }
  ];

  // Stat Card 
  const StatCard = ({ title, value, subText, icon: Icon, color }) => (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow flex flex-col justify-between transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <Icon size={24} className={color} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</h2>
      <p className="text-xs mt-1 text-green-500">{subText}</p>
    </div>
  );

  if (loading)
    return (
      <LoadingSpinner/>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 overflow-x-hidden font-sans">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-lime-600">
          Analytics Dashboard for Manager
        </h1>
        <div className="flex flex-wrap gap-2">
          {["Today", "7 Days", "30 Days"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition
                ${filter === t ? "bg-blue-600 text-white" : "bg-white border hover:bg-gray-100"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard title="Total Products" value={filteredProducts.length} subText={`Based on ${filter}`} icon={Package} color="text-blue-500" />
        <StatCard title="Active Orders" value={activeOrders} subText={`Based on ${filter}`} icon={ShoppingCart} color="text-yellow-500" />
        <StatCard title="Completed Orders" value={completedOrders} subText={`Based on ${filter}`} icon={CheckCircle} color="text-green-500" />
        <StatCard title="Total Revenue" value={`${totalRevenue.toLocaleString()} Tk.`} subText={`Based on ${filter}`} icon={DollarSign} color="text-emerald-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Orders & Revenue Trend ({filter})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `৳ ${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Order Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Weekly Products vs Orders
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyChart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="products" fill="#60A5FA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="#34D399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ManagerStatistics;

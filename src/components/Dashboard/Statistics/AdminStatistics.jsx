import { Users, ShoppingCart, Package, UserCheck } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis,  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("7 Days");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/products").then(res => setProducts(res.data));
    axiosSecure.get("/orders").then(res => setOrders(res.data));
    axiosSecure.get("/users").then(res => setUsers(res.data));
  }, []);

  const filterByDate = (items, field) => {
    const now = new Date();
    let days = filter === "Today" ? 1 : filter === "7 Days" ? 7 : 30;

    return items?.filter(item => {
      const date = new Date(item[field]);
      const diff = (now - date) / (1000 * 60 * 60 * 24);
      return diff <= days;
    });
  };

  const filteredProducts = filterByDate(products, "createdAt");
  const newUsers = filterByDate(users, "created_at");
  const activeManagers = users.filter(u => u.role === "Manager").length;

  const ordersThisMonth = orders.filter(o => {
    const d = new Date(o.createdAt);
    const n = new Date();
    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  });

  const weeklyChart = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => ({
    name: day,
    sales: orders.filter(o => new Date(o.createdAt).toLocaleDateString("en-US",{weekday:"short"})===day).length,
    users: users.filter(u => new Date(u.created_at).toLocaleDateString("en-US",{weekday:"short"})===day).length,
    products: products.filter(p => new Date(p.createdAt).toLocaleDateString("en-US",{weekday:"short"})===day).length
  }));

  const pieData = [
    { name: "Approved", value: orders.filter(o => o.status === "Approved").length },
    { name: "Pending", value: orders.filter(o => o.status === "Pending").length },
    { name: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length }
  ];

  const StatCard = ({ title, value, subText, icon: Icon, color }) => (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{title}</span>
        <Icon className={color} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold">{value}</h2>
      <p className="text-xs text-green-500">{subText}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 overflow-x-hidden">

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
        <h1 className="text-xl sm:text-2xl text-lime-600 font-bold">
          Analytics Dashboard for Admin
        </h1>

        <div className="flex flex-wrap gap-2">
          {["Today","7 Days","30 Days"].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition
                ${filter === t
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-100"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard title={`Products (${filter})`} value={filteredProducts.length} subText="Based on filter" icon={Package} color="text-blue-500" />
        <StatCard title="Orders (This Month)" value={ordersThisMonth.length} subText="Current month" icon={ShoppingCart} color="text-green-500" />
        <StatCard title="Users (New / Total)" value={`${newUsers.length} / ${users.length}`} subText="User growth" icon={Users} color="text-yellow-500" />
        <StatCard title="Managers Active" value={activeManagers} subText="Role based" icon={UserCheck} color="text-red-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white p-4 sm:p-6 rounded-xl lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="sales" stroke="#3B82F6" />
              <Line dataKey="users" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl">
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

        <div className="bg-white p-4 sm:p-6 rounded-xl lg:col-span-3">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#60A5FA" />
              <Bar dataKey="sales" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;

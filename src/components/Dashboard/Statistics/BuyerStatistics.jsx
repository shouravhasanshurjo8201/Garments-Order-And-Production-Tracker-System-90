import React, { useState } from "react";
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

// --- Mock Data (Buyer View) ---
const dataWeek = [
  { name: "Mon", orders: 1, spend: 500 },
  { name: "Tue", orders: 2, spend: 1200 },
  { name: "Wed", orders: 0, spend: 0 },
  { name: "Thu", orders: 3, spend: 1800 },
  { name: "Fri", orders: 1, spend: 650 },
  { name: "Sat", orders: 2, spend: 1400 },
  { name: "Sun", orders: 1, spend: 700 },
];

const pieData = [
  { name: "Delivered", value: 12 },
  { name: "Pending", value: 3 },
  { name: "Cancelled", value: 1 },
];

const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

const BuyerStatistics = () => {
  const [filter, setFilter] = useState("7 Days");

  // --- Stat Card ---
  const StatCard = ({ title, value, subText, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-500">{title}</span>
        <Icon size={24} className={color} />
      </div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-xs mt-1 text-green-500 font-medium">{subText}</div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 font-sans">
      
      {/* --- Header --- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
          Analytics Dashboard for Buyer
        </h1>

        {/* Filters */}
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
          {["Today", "7 Days", "30 Days"].map((time) => (
            <button
              key={time}
              onClick={() => setFilter(time)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                filter === time
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </header>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title={`My Orders (${filter})`}
          value="16"
          subText="+2 new orders"
          icon={ShoppingCart}
          color="text-blue-500"
        />

        <StatCard
          title="Delivered Orders"
          value="12"
          subText="Successfully received"
          icon={CheckCircle}
          color="text-green-500"
        />

        <StatCard
          title="Pending Orders"
          value="3"
          subText="On the way"
          icon={ShoppingBag}
          color="text-yellow-500"
        />

        <StatCard
          title="Total Spend"
          value="৳ 6,250"
          subText="All time spending"
          icon={Wallet}
          color="text-emerald-500"
        />
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Orders & Spending Trend ({filter})
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataWeek}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#3B82F6"
                strokeWidth={3}
                name="Orders"
              />
              <Line
                type="monotone"
                dataKey="spend"
                stroke="#10B981"
                strokeWidth={3}
                name="Spend (৳)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Order Status
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Weekly Orders Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataWeek}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="orders"
                fill="#60A5FA"
                name="Orders"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="spend"
                fill="#34D399"
                name="Spend (৳)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BuyerStatistics;

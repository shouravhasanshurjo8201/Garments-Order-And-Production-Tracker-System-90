import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Users, ShoppingCart, Package, UserCheck } from 'lucide-react';

// --- Mock Data (ডেমো ডাটা) ---
const dataWeek = [
  { name: 'Mon', sales: 4000, users: 2400, products: 240 },
  { name: 'Tue', sales: 3000, users: 1398, products: 210 },
  { name: 'Wed', sales: 2000, users: 9800, products: 290 },
  { name: 'Thu', sales: 2780, users: 3908, products: 200 },
  { name: 'Fri', sales: 1890, users: 4800, products: 181 },
  { name: 'Sat', sales: 2390, users: 3800, products: 250 },
  { name: 'Sun', sales: 3490, users: 4300, products: 210 },
];

const pieData = [
  { name: 'Delivered', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Cancelled', value: 100 },
  { name: 'Returned', value: 50 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']; // Tailwind Colors (Blue, Green, Yellow, Red)

const AdminStatistics = () => {
  const [filter, setFilter] = useState('7 Days');

  // স্ট্যাট কার্ড কম্পোনেন্ট
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
    // Full-width Container (bg-gray-100)
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 font-sans">
      
      {/* --- Header Section --- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
          Analytics Dashboard for Admin
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
          {['Today', '7 Days', '30 Days'].map((time) => (
            <button
              key={time}
              onClick={() => setFilter(time)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                filter === time
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </header>

      {/* --- Stats Cards Section (Responsive Grid) --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        
        <StatCard
          title={`Products (${filter})`}
          value="124"
          subText="+12 added this period"
          icon={Package}
          color="text-blue-500"
        />

        <StatCard
          title="Orders (This Month)"
          value="1,240"
          subText="+15% from last month"
          icon={ShoppingCart}
          color="text-green-500"
        />

        <StatCard
          title="Users (New / Total)"
          value="85 / 15K"
          subText="New registrations today"
          icon={Users}
          color="text-yellow-500"
        />

        <StatCard
          title="Managers Active"
          value="6"
          subText="Currently Online"
          icon={UserCheck}
          color="text-red-500"
        />
      </div>

      {/* --- Charts Section (Responsive Grid) --- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Line Chart: Sales & Users (Full Width on Mobile, 2/3 on Desktop) */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales & User Trends ({filter})</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataWeek} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 8 }} name="Sales (BDT)" />
              <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} name="New Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Order Status (1/3 on Desktop) */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80} // Larger inner radius for a modern donut look
                outerRadius={120}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Weekly Products vs Orders (Full Width) */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Weekly Product & Order Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataWeek}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Bar dataKey="products" fill="#60A5FA" name="New Products" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sales" fill="#34D399" name="Total Orders" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminStatistics;
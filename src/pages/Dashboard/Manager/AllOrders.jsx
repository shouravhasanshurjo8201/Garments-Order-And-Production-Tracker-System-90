import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Download, Search, Filter, Calendar, FileText, Loader2, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Time & Date Filters
    const [timeRange, setTimeRange] = useState('all'); // all, weekly, monthly, custom
    const [selectedMonth, setSelectedMonth] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const API_URL = 'http://localhost:3000';

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            let url = `${API_URL}/orders`;
            if (statusFilter) {
                url += `?status=${statusFilter}`;
            }
            const response = await axios.get(url, { withCredentials: true });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    }, [statusFilter]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // (Search, Weekly, Monthly, Custom Date)
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            // (ID, Email, Product ID)
            const matchesSearch =
                order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.productId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.product?.toLowerCase().includes(searchTerm.toLowerCase());

            if (!matchesSearch) return false;

            const orderDate = new Date(order.createdAt);
            const now = new Date();

            if (timeRange === 'weekly') {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(now.getDate() - 7);
                return orderDate >= oneWeekAgo && orderDate <= now;
            }

            if (timeRange === 'monthly') {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(now.getMonth() - 1);
                return orderDate >= oneMonthAgo && orderDate <= now;
            }

            if (timeRange === 'custom') {
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    start.setHours(0, 0, 0, 0);
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59, 999);
                    return orderDate >= start && orderDate <= end;
                }
            }

            return true;
        });
    }, [orders, searchTerm, timeRange, startDate, endDate]);

    const exportToExcel = () => {
        if (filteredOrders.length === 0) return alert("No data available to export!");

        const dataToExport = filteredOrders.map((order, index) => ({
            "SL": index + 1,
            "Order ID": order._id,
            "Product ID": order.productId || 'N/A',
            "Product Name": order.product || 'N/A',
            "User Email": order.email,
            "Quantity": order.quantity,
            "Status": order.status || 'Pending',
            "Order Date": new Date(order.createdAt).toLocaleDateString("en-GB")
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders Report");

        XLSX.writeFile(workbook, `Orders_Report_${timeRange}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const downloadMonthlyReport = async () => {
        if (!selectedMonth) return alert("Please select a month first!");

        try {
            const [year, month] = selectedMonth.split('-');
            const response = await axios.get(`${API_URL}/orders/monthly-report?month=${month}&year=${year}`, { withCredentials: true });
            const monthlyData = response.data;

            if (monthlyData.length === 0) return alert("No orders found for this specific month!");

            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text(`Monthly Production & Order Report`, 14, 22);
            doc.setFontSize(11);
            doc.text(`Month: ${month}/${year} | Total Orders: ${monthlyData.length} | Generated: ${new Date().toLocaleDateString()}`, 14, 30);

            let yPosition = 40;
            doc.text("Order ID", 14, yPosition);
            doc.text("Product ID", 60, yPosition);
            doc.text("Qty", 120, yPosition);
            doc.text("Status", 145, yPosition);
            doc.text("Date", 175, yPosition);
            doc.line(14, yPosition + 2, 200, yPosition + 2);

            monthlyData.forEach((order) => {
                yPosition += 10;
                if (yPosition > 280) { doc.addPage(); yPosition = 20; } // Page break safety
                doc.text(order._id.substring(0, 10) + '...', 14, yPosition);
                doc.text((order.productId || order.product || 'N/A').substring(0, 15), 60, yPosition);
                doc.text(String(order.quantity), 120, yPosition);
                doc.text(order.status || 'Pending', 145, yPosition);
                doc.text(new Date(order.createdAt).toLocaleDateString("en-GB"), 175, yPosition);
            });

            doc.save(`Monthly_Report_${month}_${year}.pdf`);
        } catch (error) {
            console.error("Error generating monthly report:", error);
            alert("Failed to generate monthly report.");
        }
    };

    const exportSingleOrderInvoice = (order) => {
        const doc = new jsPDF();

        // Header Design
        doc.setFillColor(245, 247, 250);
        doc.rect(0, 0, 210, 40, 'F');

        doc.setFontSize(22);
        doc.setTextColor(22, 163, 74); // Green color
        doc.text("GARMENTS PRODUCTION TRACKER", 14, 25);

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`Invoice Generated: ${new Date().toLocaleString()}`, 14, 33);

        // Invoice Info Box
        doc.setDrawColor(226, 232, 240);
        doc.line(14, 48, 196, 48);

        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text("INVOICE / ORDER DETAILS", 14, 58);

        doc.setFontSize(11);
        doc.text(`Order ID:`, 14, 70);
        doc.setFont("courier", "bold");
        doc.text(`${order._id}`, 50, 70);

        doc.setFont("helvetica", "normal");
        doc.text(`Customer Email:`, 14, 80);
        doc.text(`${order.email}`, 50, 80);

        doc.text(`Product Identification:`, 14, 90);
        doc.text(`${order.productId || order.product || 'N/A'}`, 50, 90);

        doc.text(`Ordered Quantity:`, 14, 100);
        doc.setFont("helvetica", "bold");
        doc.text(`${order.quantity} Pcs`, 50, 100);

        doc.setFont("helvetica", "normal");
        doc.text(`Order Placement Date:`, 14, 110);
        doc.text(`${new Date(order.createdAt).toLocaleString()}`, 50, 110);

        doc.text(`Current Status:`, 14, 120);
        doc.setFont("helvetica", "bold");
        doc.text(`${order.status || 'Pending'}`, 50, 120);

        // Footer
        doc.line(14, 135, 196, 135);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184);
        doc.text("Thank you for choosing our production tracking platform.", 14, 145);

        doc.save(`Invoice_${order._id.substring(0, 8)}.pdf`);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen text-gray-800">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Management Hub</h1>
                    <p className="text-sm text-gray-500">Monitor, track timelines, filter specific segments, and export analytics.</p>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button
                        onClick={fetchOrders}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors shadow-sm"
                        title="Reload Data"
                    >
                        <RefreshCw size={16} />
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm w-full sm:w-auto"
                    >
                        <Download size={16} /> Export Filtered (Excel)
                    </button>
                </div>
            </div>

            {/* Filters Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
                {/* 1. Live Search */}
                <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Search Database</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="ID, Email, Product..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-1.5 w-full border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 border-gray-200"
                        />
                    </div>
                </div>

                {/* 2. Status Select */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Filter Status</label>
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-400 shrink-0" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-1.5 border rounded-lg text-sm w-full bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* 3. Predefined Time Range */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Timeline Target</label>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400 shrink-0" />
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="p-1.5 border rounded-lg text-sm w-full bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Lifetime Orders</option>
                            <option value="weekly">Last 7 Days (Weekly)</option>
                            <option value="monthly">Last 30 Days (Monthly)</option>
                            <option value="custom">Custom Date Range</option>
                        </select>
                    </div>
                </div>

                {/* 4. Monthly Specific Report Generator */}
                <div className="border-t pt-3 md:pt-0 md:border-t-0 md:border-l md:pl-4 border-gray-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Download Specific Month PDF</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="p-1 border rounded-lg text-sm bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                        <button
                            onClick={downloadMonthlyReport}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 shadow-sm"
                        >
                            <FileText size={14} /> Fetch
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Date Inputs (Only displays when 'custom' is picked) */}
            {timeRange === 'custom' && (
                <div className="flex flex-wrap items-center gap-4 bg-amber-50/60 p-4 rounded-xl border border-amber-100 mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-2 text-sm text-amber-900 font-medium">
                        <span>Specify Date Parameters:</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">From:</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-1 border rounded-md bg-white border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">To:</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="p-1 border rounded-md bg-white border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            )}

            {/* Counter Badge summary */}
            <div className="mb-4 text-xs font-semibold text-gray-500 flex items-center gap-2">
                Showing {filteredOrders.length} of {orders.length} total entries found.
            </div>

            {/* Orders Table Layout */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-2">
                        <Loader2 className="animate-spin text-blue-600" size={32} />
                        <span className="text-sm text-gray-500 font-medium">Querying active infrastructure...</span>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm italic">
                        No orders matched the selected filter configuration.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold border-b border-gray-100 tracking-wider">
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">User Email</th>
                                    <th className="p-4">Product Ref</th>
                                    <th className="p-4 text-center">Quantity</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Placement Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="p-4 font-bold text-blue-600 font-mono text-xs">
                                            #{order._id.substring(0, 8)}...
                                        </td>
                                        <td className="p-4 text-gray-600 max-w-45 truncate" title={order.email}>
                                            {order.email}
                                        </td>
                                        <td className="p-4 text-xs text-gray-500 font-medium">
                                            {order.product || order.productId || 'N/A'}
                                        </td>
                                        <td className="p-4 text-center font-bold text-gray-700">
                                            {order.quantity} Pcs
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.status === 'Approved' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                order.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                    order.status === 'Processing' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                        'bg-amber-50 text-amber-700 border border-amber-100'
                                                }`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500 text-xs">
                                            {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => exportSingleOrderInvoice(order)}
                                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-white font-medium bg-blue-50 hover:bg-blue-600 px-2.5 py-1.5 rounded-md transition-all shadow-sm"
                                                title="Download Invoice PDF"
                                            >
                                                <Download size={12} /> Invoice
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllOrders;
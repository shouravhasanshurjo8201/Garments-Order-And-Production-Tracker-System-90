import { useState } from "react";
import { Plus, Bot, BookOpen, CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp, Zap } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const BULK_QA = [
    { question: "How do I place an order?", answer: "Go to the Products page, select a product, choose your quantity, and click 'Order Now'. Fill in your details and confirm." },
    { question: "How can I track my order?", answer: "Go to 'My Orders' section, find your order, and click on it to see the current status and full tracking history." },
    { question: "What are the order statuses?", answer: "Pending = waiting for admin approval. Approved = order confirmed. Shipped = on the way. Delivered = successfully received." },
    { question: "How do I cancel an order?", answer: "You can cancel a Pending order from 'My Orders' section. Once Approved or Shipped, cancellation is not available." },
    { question: "What products are available?", answer: "We offer a wide range of garment products including shirts, pants, jackets, and more. Visit the Products page for current stock and prices." },
    { question: "How is the product quantity managed?", answer: "Each product has a stock quantity. When an order is placed, the quantity is automatically reduced. Out-of-stock items cannot be ordered." },
    { question: "Who is an Admin?", answer: "Admins can manage all products, approve or reject orders, manage users, and access the full dashboard." },
    { question: "How do I become an Admin?", answer: "Contact the system administrator to request an Admin role for your account." },
    { question: "Can my account be suspended?", answer: "Yes. If you violate system rules, an admin can suspend your account. You will see a suspension message when you try to log in." },
    { question: "How do I log in?", answer: "Click the Login button on the homepage and sign in using your Google account." },
    { question: "How does order approval work?", answer: "After placing an order, it goes to Pending status. An admin reviews it and either Approves or rejects it. You will see the updated status in My Orders." },
    { question: "What is the Garments Production Tracker System?", answer: "It is a web application for managing garment product orders, inventory, production tracking, and user management for a garments business." },
    { question: "How do I view all my past orders?", answer: "Log in and navigate to the 'My Orders' section from your dashboard. All your orders will be listed there with their current status." },
    { question: "Can I order more than available stock?", answer: "No. The system will not allow you to order a quantity greater than the available stock for any product." },
    { question: "How do I contact support?", answer: "You can use this chatbot for quick help. For further assistance, contact the system administrator directly." },
];

export default function AIKnowledgePanel() {
    const [activeTab, setActiveTab] = useState("qa");

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [qaList, setQaList] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [instruction, setInstruction] = useState("");
    const [loading, setLoading] = useState(false);
    const [bulkLoading, setBulkLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3500);
    };

    const handleAddQA = async () => {
        if (!question.trim() || !answer.trim()) {
            return showToast("error", "Both Question and Answer are required!");
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/admin/add-knowledge`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: question.trim(), answer: answer.trim() }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setQaList(prev => [{ question: question.trim(), answer: answer.trim(), id: data.id }, ...prev]);
                setQuestion("");
                setAnswer("");
                showToast("success", "Q&A added successfully!");
            } else throw new Error("Failed");
        } catch {
            showToast("error", "Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBulkAdd = async () => {
        setBulkLoading(true);
        let successCount = 0;
        try {
            for (const item of BULK_QA) {
                const res = await fetch(`${API_URL}/admin/add-knowledge`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: item.question, answer: item.answer }),
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    successCount++;
                    setQaList(prev => [...prev, { ...item, id: data.id }]);
                }
            }
            showToast("success", `${successCount} Q&A items added successfully!`);
        } catch {
            showToast("error", "Something went wrong during bulk add.");
        } finally {
            setBulkLoading(false);
        }
    };

    const handleSaveInstruction = async () => {
        if (!instruction.trim()) {
            return showToast("error", "Instruction cannot be empty!");
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/admin/ai-config`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: instruction.trim() }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", "AI Instruction saved successfully!");
            } else throw new Error("Failed");
        } catch {
            showToast("error", "Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const defaultInstruction = `You are an expert assistant for the Garments Production Tracker System. This system helps users manage garment product orders, track production, and handle inventory.

Your responsibilities:
- Help users place and track orders
- Explain product availability and stock
- Guide users through the system features
- Answer questions about order statuses (Pending, Approved, Shipped, Delivered)

Rules:
- Always be polite, clear, and concise
- Only answer questions related to this garments system
- If you don't know something, say so honestly
- Respond in the same language the user writes in`;

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
            {toast && (
                <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm transition-all
                    ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {toast.msg}
                </div>
            )}

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-green-400 rounded-2xl flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">AI Knowledge Panel</h1>
                    </div>
                    <p className="text-slate-500 text-sm pl-1">Train your chatbot with custom Q&A and instructions</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-slate-100 mb-6">
                    <button
                        onClick={() => setActiveTab("qa")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all
                            ${activeTab === "qa" ? "bg-green-400 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Add Q&A
                    </button>
                    <button
                        onClick={() => setActiveTab("instruction")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all
                            ${activeTab === "instruction" ? "bg-blue-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <Bot className="w-4 h-4" />
                        AI Instruction
                    </button>
                </div>

                {/* Q&A Tab */}
                {activeTab === "qa" && (
                    <div className="space-y-4">

                        {/* Bulk Add */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                            <h2 className="font-semibold text-amber-800 text-sm flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4" />
                                Quick Start — Add {BULK_QA.length} Q&A at Once
                            </h2>
                            <p className="text-amber-700 text-xs mb-3">
                                Instantly train your chatbot with pre-built questions about orders, products, users, and system features.
                            </p>
                            <ul className="mb-3 text-amber-600 text-xs space-y-0.5">
                                {BULK_QA.slice(0, 5).map((item, i) => (
                                    <li key={i}>• {item.question}</li>
                                ))}
                                <li className="text-amber-500">• ...and {BULK_QA.length - 5} more</li>
                            </ul>
                            <button
                                onClick={handleBulkAdd}
                                disabled={bulkLoading}
                                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition text-sm"
                            >
                                {bulkLoading
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Adding all Q&A...</>
                                    : <><Zap className="w-4 h-4" /> Add All {BULK_QA.length} Q&A Now</>}
                            </button>
                        </div>

                        {/* Single Add */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h2 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Add Custom Q&A</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Question</label>
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={e => setQuestion(e.target.value)}
                                        onKeyDown={e => e.key === "Enter" && handleAddQA()}
                                        placeholder="e.g. How do I track an order?"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:bg-white transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">Answer</label>
                                    <textarea
                                        value={answer}
                                        onChange={e => setAnswer(e.target.value)}
                                        placeholder="e.g. Go to My Orders section and click on your order to see tracking details."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:bg-white transition resize-none"
                                    />
                                </div>
                                <button
                                    onClick={handleAddQA}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition text-sm"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    Add Q&A
                                </button>
                            </div>
                        </div>

                        {/* Added list */}
                        {qaList.length > 0 && (
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                                <h2 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">
                                    Added This Session ({qaList.length})
                                </h2>
                                <div className="space-y-2">
                                    {qaList.map((item, i) => (
                                        <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition"
                                            >
                                                <span className="text-sm font-medium text-slate-700 truncate pr-2">{item.question}</span>
                                                {expandedIndex === i
                                                    ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                                                    : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                                            </button>
                                            {expandedIndex === i && (
                                                <div className="px-4 pb-3 text-sm text-slate-500 bg-slate-50 border-t border-slate-100">
                                                    {item.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-sm text-green-700">
                            <p className="font-medium mb-1">💡 Tips for better AI responses:</p>
                            <ul className="space-y-1 text-green-600 text-xs">
                                <li>• Write questions in natural language as users would ask them</li>
                                <li>• Add multiple questions about the same topic with different phrasing</li>
                                <li>• Keep answers short, clear, and specific</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Instruction Tab */}
                {activeTab === "instruction" && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h2 className="font-semibold text-slate-700 mb-1 text-sm uppercase tracking-wide">AI System Instruction</h2>
                            <p className="text-xs text-slate-400 mb-4">Define how the AI should behave and respond</p>
                            <textarea
                                value={instruction}
                                onChange={e => setInstruction(e.target.value)}
                                rows={10}
                                placeholder="Write your system instruction here..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-black focus:outline-none focus:border-blue-400 focus:bg-white transition resize-none font-mono"
                            />
                            <button
                                onClick={handleSaveInstruction}
                                disabled={loading}
                                className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition text-sm"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                Save Instruction
                            </button>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm">
                            <p className="font-medium text-blue-700 mb-2">💡 Recommended instruction for this system:</p>
                            <p className="text-blue-600 text-xs leading-relaxed font-mono whitespace-pre-line">{defaultInstruction}</p>
                            <button
                                onClick={() => setInstruction(defaultInstruction)}
                                className="mt-3 text-xs text-blue-500 hover:text-blue-700 underline font-medium"
                            >
                                Use this instruction →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

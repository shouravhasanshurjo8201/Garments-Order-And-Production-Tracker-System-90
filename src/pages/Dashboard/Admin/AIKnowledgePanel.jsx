import { useState } from "react";
import { Plus, Bot, BookOpen, Trash2, CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AIKnowledgePanel() {
    const [activeTab, setActiveTab] = useState("qa"); // "qa" | "instruction"

    // QA State
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [qaList, setQaList] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Instruction State
    const [instruction, setInstruction] = useState("");

    // UI State
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null); // { type: "success"|"error", msg }

    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3000);
    };

    // Add Q&A
    const handleAddQA = async () => {
        if (!question.trim() || !answer.trim()) {
            return showToast("error", "Question এবং Answer দুটোই দিতে হবে!");
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
                showToast("success", "Q&A সফলভাবে যোগ হয়েছে!");
            } else {
                throw new Error("Failed");
            }
        } catch {
            showToast("error", "সমস্যা হয়েছে! আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    // Save AI Instruction
    const handleSaveInstruction = async () => {
        if (!instruction.trim()) {
            return showToast("error", "Instruction খালি রাখা যাবে না!");
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
                showToast("success", "AI Instruction সেভ হয়েছে!");
            } else {
                throw new Error("Failed");
            }
        } catch {
            showToast("error", "সমস্যা হয়েছে! আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm transition-all
                    ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.type === "success"
                        ? <CheckCircle className="w-4 h-4" />
                        : <AlertCircle className="w-4 h-4" />}
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
                    <p className="text-slate-500 text-sm ml-13 pl-1">Chatbot এর জন্য তথ্য যোগ করুন</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-slate-100 mb-6">
                    <button
                        onClick={() => setActiveTab("qa")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all
                            ${activeTab === "qa" ? "bg-green-400 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Q&A যোগ করুন
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
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h2 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">নতুন Q&A যোগ করুন</h2>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">প্রশ্ন (Question)</label>
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={e => setQuestion(e.target.value)}
                                        placeholder="যেমন: How do I track an order?"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:bg-white transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-500 mb-1 block">উত্তর (Answer)</label>
                                    <textarea
                                        value={answer}
                                        onChange={e => setAnswer(e.target.value)}
                                        placeholder="যেমন: Go to Orders section and click on your order ID to see tracking details."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:bg-white transition resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleAddQA}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition text-sm"
                                >
                                    {loading
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : <Plus className="w-4 h-4" />}
                                    যোগ করুন
                                </button>
                            </div>
                        </div>

                        {/* Added Q&A List (this session) */}
                        {qaList.length > 0 && (
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                                <h2 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">
                                    এই Session এ যোগ করা ({qaList.length}টি)
                                </h2>
                                <div className="space-y-2">
                                    {qaList.map((item, i) => (
                                        <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition"
                                            >
                                                <span className="text-sm font-medium text-slate-700 truncate pr-2">
                                                    {item.question}
                                                </span>
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

                        {/* Tips */}
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-sm text-green-700">
                            <p className="font-medium mb-1">💡 টিপস:</p>
                            <ul className="space-y-1 text-green-600 text-xs">
                                <li>• প্রশ্ন যত স্বাভাবিক ভাষায় লিখবেন, AI তত ভালো match করবে</li>
                                <li>• একই বিষয়ে একাধিক প্রশ্ন আলাদা আলাদা করে যোগ করুন</li>
                                <li>• উত্তর সংক্ষিপ্ত ও স্পষ্ট রাখুন</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Instruction Tab */}
                {activeTab === "instruction" && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h2 className="font-semibold text-slate-700 mb-1 text-sm uppercase tracking-wide">AI System Instruction</h2>
                            <p className="text-xs text-slate-400 mb-4">AI কীভাবে আচরণ করবে সেটা এখানে লিখুন</p>

                            <textarea
                                value={instruction}
                                onChange={e => setInstruction(e.target.value)}
                                placeholder={`যেমন:\nYou are an expert assistant for the Garments Production Tracker System. Always respond in English. Be concise and helpful. Only answer questions related to garments production, orders, and inventory management.`}
                                rows={8}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition resize-none font-mono"
                            />

                            <button
                                onClick={handleSaveInstruction}
                                disabled={loading}
                                className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white font-medium py-3 rounded-xl transition text-sm"
                            >
                                {loading
                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                    : <CheckCircle className="w-4 h-4" />}
                                Instruction সেভ করুন
                            </button>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm">
                            <p className="font-medium text-blue-700 mb-1">💡 উদাহরণ Instruction:</p>
                            <p className="text-blue-600 text-xs leading-relaxed">
                                "You are an expert assistant for the Garments Production Tracker System.
                                Help users with order tracking, product inventory, and production management.
                                Always be polite and concise. If you don't know something, say so honestly."
                            </p>
                            <button
                                onClick={() => setInstruction("You are an expert assistant for the Garments Production Tracker System. Help users with order tracking, product inventory, and production management. Always be polite and concise. If you don't know something, say so honestly.")}
                                className="mt-2 text-xs text-blue-500 hover:text-blue-700 underline"
                            >
                                এটা use করুন →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
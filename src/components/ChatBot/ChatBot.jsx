import { useState, useEffect, useRef } from "react";
import logo from '../../assets/images/logo-flat.png'
import { Send, X, MessageCircle } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, loading]);

    const sendMessage = async () => {
        if (!message.trim() || loading) return;

        const userMsgText = message.trim();
        const userMessage = { role: "user", text: userMsgText };

        // UI update immediately
        setChatHistory(prev => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        // Prepare history for Gemini
        const geminiHistory = [...chatHistory, userMessage].map(chat => ({
            role: chat.role === "user" ? "user" : "model",
            parts: [{ text: chat.text }]
        }));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/support/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsgText,
                    history: geminiHistory
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setChatHistory(prev => [...prev, { role: "ai", text: data.reply }]);
            } else {
                throw new Error(data.error || "Failed to fetch");
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setChatHistory(prev => [...prev, { role: "ai", text: "I'm having trouble connecting. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-2 right-2 z-100 flex flex-col items-end font-sans">
            {isOpen && (
                <div className="mb-2 w-50 sm:w-86 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px] border border-blue-100">
                    {/* Header */}
                    <div className="bg-green-400 p-3 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 bg-white rounded-full overflow-hidden">
                                <img src={logo} alt="Logo" fill className="object-contain p-1" />
                            </div>
                            <div>
                                <h2 className="font-bold text-sm leading-none">Garments Production System</h2>
                                <span className="text-[10px] text-cyan-100 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-cyan-100 rounded-full animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1.5 rounded-full transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
                        {chatHistory.length === 0 && (
                            <div className="bg-blue-50 p-3 rounded-2xl rounded-tl-none text-[13px] text-slate-600 border border-blue-100">
                                Hello! I am your Garments Production System assistant. How can I help you today?
                            </div>
                        )}
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] ${chat.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                                    : "bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-200"
                                    }`}>
                                    {chat.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white">
                        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-1 bg-transparent text-[13px] focus:outline-none"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !message.trim()}
                                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:bg-slate-300 transition"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 flex items-center justify-center rounded-full shadow-2xl bg-blue-600 text-white hover:scale-105 active:scale-95 transition-all duration-300"
            >
                {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-8 h-8" />}
            </button>
        </div>
    );
}

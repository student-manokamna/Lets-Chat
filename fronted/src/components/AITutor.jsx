import { useState } from "react";
import { MessageCircleIcon, XIcon, SendIcon, BotIcon } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { motion, AnimatePresence } from "framer-motion";

const AITutor = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { role: "ai", content: "Hola! I am your AI Language Tutor. How can I help you practice today?" },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = message;
        setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);
        setMessage("");
        setIsLoading(true);

        try {
            const res = await axiosInstance.post("/ai/chat", { message: userMessage });
            setChatHistory((prev) => [...prev, { role: "ai", content: res.data.response }]);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Sorry, I encountered an error. Please make sure the GEMINI_API_KEY is set in the backend.";
            setChatHistory((prev) => [
                ...prev,
                { role: "ai", content: errorMessage },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 btn btn-circle btn-primary btn-lg shadow-xl z-50 ${isOpen ? "hidden" : "flex"}`}
            >
                <BotIcon className="size-8" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-base-100 rounded-2xl shadow-2xl border border-base-300 z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary text-primary-content p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <BotIcon className="size-6" />
                                <h3 className="font-bold text-lg">AI Language Tutor</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="btn btn-ghost btn-sm btn-circle text-primary-content">
                                <XIcon className="size-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/50">
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
                                    <div className={`chat-bubble ${msg.role === "user" ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chat chat-start">
                                    <div className="chat-bubble chat-bubble-secondary">
                                        <span className="loading loading-dots loading-xs"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 bg-base-100 border-t border-base-300 flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="input input-bordered flex-1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" className="btn btn-primary btn-square" disabled={isLoading}>
                                <SendIcon className="size-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AITutor;

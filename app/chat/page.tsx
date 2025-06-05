// app/chat/page.tsx
import ChatAssistant from "@/components/ChatAssistant";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <ChatAssistant />
    </main>
  );
}

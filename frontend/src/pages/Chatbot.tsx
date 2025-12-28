import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatbotBox from '../components/ChatbotBox';

export default function ChatbotPage() {
  const [chats, setChats] = useState([
    {
      id: '1',
      title: 'Chat 1',
    },
    {
      id: '2',
      title: 'Chat 2',
    },
  ]);

  const params = useParams();
  const navigate = useNavigate();

  const chatId = params.chatId;

  const handleNewChat = () => {
    const id = Math.random() * 10;
    setChats((prev) => {
      return [
        ...prev,
        {
          id: id.toString(),
          title: 'Chat ' + id,
        },
      ];
    });
    navigate('/app/chatbot/' + id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-teal-300 to-yellow-200">
      <Navbar />

      <div className="w-full h-screen flex gap-3">
        {/* sidebar */}
        <div className="w-[25vw] shrink-0 p-4">
          <button
            onClick={handleNewChat}
            className="px-4 py-2 bg-teal-300 border-2 hover:cursor-pointer"
          >
            + New Chat
          </button>

          <div className="h-[80vh] mt-3">
            {chats.map((chat) => {
              return (
                <Link
                  key={chat.id}
                  to={`/app/chatbot/${chat.id}`}
                  className="bg-white block mb-2 p-3"
                >
                  {chat.title}
                </Link>
              );
            })}
          </div>
        </div>

        {chatId ? (
          <ChatbotBox chatId={chatId} />
        ) : (
          <p className="p-3">Choose or start a new chat</p>
        )}
      </div>
    </div>
  );
}

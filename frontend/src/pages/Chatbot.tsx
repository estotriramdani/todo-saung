import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ChatbotBox from '../components/ChatbotBox';

interface ResponseAPI {
  data: { id: number; title: string }[];
}

export default function ChatbotPage() {
  const [chats, setChats] = useState<ResponseAPI['data']>([]);

  const params = useParams();
  const navigate = useNavigate();

  const chatId = params.chatId;

  const handleNewChat = async () => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const response = await fetch('/api/chatbot/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `New Chat ${timestamp}`,
      }),
    });

    const responseJson: { data: { id: number; title: string } } = await response.json();
    const id = responseJson.data.id;
    const title = responseJson.data.title;

    setChats((prev) => {
      return [
        {
          id,
          title,
        },
        ...prev,
      ];
    });
    navigate('/app/chatbot/' + id);
  };

  // useEffect bertujuan untuk menjalankan logic pertama kali
  // ketika website/page/component dimuat
  useEffect(() => {
    const getData = async () => {
      // ambil data dari API
      const response = await fetch('/api/chatbot/chats');
      const responseJson: ResponseAPI = await response.json();

      // set data API tersebut ke local state
      setChats(responseJson.data);
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full h-screen flex">
        {/* Sidebar */}
        <div className="w-80 shrink-0 bg-slate-800/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-700/50">
            <button onClick={handleNewChat} className="btn-gradient-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Chat
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="text-xs font-semibold text-slate-400 px-3 py-2 uppercase tracking-wider">
              Recent Chats
            </div>
            {chats.map((chat) => {
              const isActive = chat.id.toString() === chatId;
              return (
                <Link
                  key={chat.id}
                  to={`/app/chatbot/${chat.id}`}
                  className={`
                    block p-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                        : 'hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        isActive ? 'bg-purple-400' : 'bg-slate-500 group-hover:bg-slate-400'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium truncate ${
                          isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {chat.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="p-3">
            <Link to="/app" className="btn-gradient-primary">
              Back to home
            </Link>
          </div>
        </div>

        {/* Main Chat Area */}
        {chatId ? (
          <ChatbotBox chatId={chatId} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-6 max-w-2xl px-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30 animate-pulse">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to AI Chat
                </h2>
                <p className="text-slate-400 text-lg">
                  Select a chat from the sidebar or start a new conversation
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-200">
                  <div className="text-purple-400 mb-2">💡</div>
                  <p className="text-sm text-slate-300">Ask questions and get instant answers</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-200">
                  <div className="text-pink-400 mb-2">🚀</div>
                  <p className="text-sm text-slate-300">Powered by advanced AI technology</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

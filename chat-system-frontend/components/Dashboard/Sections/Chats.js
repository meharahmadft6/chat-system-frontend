import { motion } from "framer-motion";
import { FiSend, FiPaperclip, FiMic } from "react-icons/fi";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/images/teachers/teacher1.jpg",
    lastMessage: "Don't forget to submit your assignment by Friday",
    time: "2h ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Study Group",
    avatar: "/images/group-chat.png",
    lastMessage: "Alex: I'll share my notes with everyone",
    time: "5h ago",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "/images/teachers/teacher2.jpg",
    lastMessage: "Your question about the dataset was excellent",
    time: "1d ago",
    unread: 0,
    online: false,
  },
];

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    avatar: "/images/teachers/teacher1.jpg",
    content: "Hi there! How's the project coming along?",
    time: "10:30 AM",
    isMe: false,
  },
  {
    id: 2,
    sender: "You",
    avatar: "/images/avatars/student1.png",
    content:
      "Going well! I've completed the frontend part, working on the backend now.",
    time: "10:32 AM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    avatar: "/images/teachers/teacher1.jpg",
    content:
      "That's great to hear. Let me know if you need any help with the API integration.",
    time: "10:33 AM",
    isMe: false,
  },
  {
    id: 4,
    sender: "You",
    avatar: "/images/avatars/student1.png",
    content: "Will do. Thanks!",
    time: "10:35 AM",
    isMe: true,
  },
];

const ChatsSection = () => {
  const [activeChat, setActiveChat] = useState(1);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        <p className="text-gray-600">Communicate with teachers and peers</p>
      </motion.div>

      {/* Chat Container */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Conversations List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto"
        >
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
            />
          </div>
          <div className="divide-y divide-gray-100">
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 cursor-pointer ${
                  activeChat === conversation.id ? "bg-indigo-50" : ""
                }`}
                onClick={() => setActiveChat(conversation.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col flex-1"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            <img
              src="/images/teachers/teacher1.jpg"
              alt="Sarah Johnson"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    message.isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      message.isMe
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {!message.isMe && (
                      <p className="text-xs font-medium text-indigo-600">
                        {message.sender}
                      </p>
                    )}
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 text-right ${
                        message.isMe ? "text-indigo-200" : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiPaperclip size={20} />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
              />
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                <FiMic size={20} />
              </button>
              <button className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatsSection;

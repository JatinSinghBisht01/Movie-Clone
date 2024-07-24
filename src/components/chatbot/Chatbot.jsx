import React, { useState } from "react";
import { SiChatbot } from "react-icons/si";
import { SyncLoader } from "react-spinners";
import { GoogleGenerativeAI } from "@google/generative-ai";

const formatMessage = (message) => {
  const bolded = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  const italicized = bolded.replace(/\*(.*?)\*/g, "<em>$1</em>");
  return italicized;
};

const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed z-50 bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-4 rounded-full cursor-pointer transition duration-500"
    >
      <SiChatbot size={25} />
    </button>
  );
};

const MessageBox = ({ message, author }) => {
  const color = author === "bot" ? "bg-gray-700" : "bg-yellow-600";
  return (
    <div
      className={`${color} text-white p-2 md:p-4 text-sm md:text-base rounded-lg shadow-lg ${
        author === "bot" ? "mr-6" : "ml-6"
      }`}
      dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
    />
  );
};

export default function Chatbot() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Welcome to the chatbot! What type of movies are you looking for?",
      author: "bot",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = AIzaSyAXozVKSMNMDrGv05hihGyW3dcqSymzUUo;

  const handleSendMessage = async () => {
    if (userInput.trim() !== "") {
      const newMessages = [...messages, { message: userInput, author: "user" }];

      setMessages(newMessages);
      setUserInput("");
      setIsLoading(true);

      const botResponse = await getBotResponse(userInput);

      const updatedMessages = [
        ...newMessages,
        { message: botResponse, author: "bot" },
      ];

      const trimmedMessages = updatedMessages.slice(-10);

      setMessages(trimmedMessages);
      setIsLoading(false); // Set loading state to false
    }
  };

  const getBotResponse = async (input) => {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
    });

    const generationConfig = {
      temperature: 0.9,
      topP: 1,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const parts = [
      { text: `input: ${input}` },
      { text: 'output: ' },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
      });
      console.log(result);
      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      return "I'm sorry, I couldn't understand that. Can you please try again?";
    }
  };

  return (
    <div>
      <FloatingButton onClick={() => setIsChatbotOpen(!isChatbotOpen)} />
      {isChatbotOpen && (
        <div className="fixed z-50 bottom-20 right-0 mx-4 my-2 bg-gray-800 rounded-lg shadow-lg w-72 md:w-96">
          <div className="bg-yellow-600 rounded-t-lg text-base md:text-lg shadow-lg text-white p-4">
            AI Chatbot
          </div>
          <div className="p-4 space-y-2 smd:pace-y-4 max-h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <MessageBox
                key={index}
                message={msg.message}
                author={msg.author}
              />
            ))}
            {isLoading && (
              <div className="flex justify-left p-2">
                <SyncLoader color="#fff" loading={isLoading} size={10} />
              </div>
            )}
            
          </div>
          <div className="p-4">
              <input
                type="text"
                className="bg-gray-800 text-white text-sm md:text-base w-full rounded-lg p-1 md:p-2 border border-gray-400 focus:border-white focus:outline-none"
                placeholder="Type your query..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>
        </div>
      )}
    </div>
  );
}

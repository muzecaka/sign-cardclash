import React from "react";

function ChatMessage({ message }) {
  return (
    <div className="text-sm sm:text-base mb-1 text-white">
      <span className="font-medium">{message.userId || "System"}:</span>{" "}
      <span>{message.text}</span>{" "}
      <span className="text-gray-400 text-xs">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
}

export default ChatMessage;

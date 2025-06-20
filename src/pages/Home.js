import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const [gameIdInput, setGameIdInput] = useState("");
  const navigate = useNavigate();

  const handleHostGame = () => {
    navigate("/host");
  };

  const handleJoinGame = () => {
    if (!gameIdInput.trim()) {
      alert("Please enter a Game ID to join.");
      return;
    }
    navigate(`/join/${gameIdInput.trim()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
          SIGN-CARDCLASH
        </h1>
        <div className="flex flex-col space-y-4">
          <Button onClick={handleHostGame} className="w-full">
            Host a Game
          </Button>
          <div className="flex space-x-2">
            <input
              type="text"
              value={gameIdInput}
              onChange={(e) => setGameIdInput(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
              placeholder="Enter Game ID"
            />
            <Button onClick={handleJoinGame} className="px-4 py-2">
              Join Game
            </Button>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-2 text-gray-400 text-sm">
        Sign Card Clash by @muzecaka | ZEUS of Sign
      </footer>
    </div>
  );
}

export default Home;

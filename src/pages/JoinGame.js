import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import socket from "../socket";
import { toast } from "react-toastify";
import Button from "../components/Button";

function JoinGame() {
  const { gameId } = useParams();
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isSpectator, setIsSpectator] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("gameData", ({ game }) => {
      if (!game) {
        toast.error("Invalid game ID.");
        navigate("/join");
      }
    });

    if (gameId) {
      socket.emit("getGame", { gameId });
    }
  }, [gameId, navigate]);

  const handleJoinGame = () => {
    if (!name.trim()) {
      toast.error("Please enter a name.");
      return;
    }
    if (!inviteCode.trim()) {
      toast.error("Please enter an invite code.");
      return;
    }

    socket.on("joinSuccess", ({ gameId: joinedGameId, role }) => {
      if (role === "spectator") {
        navigate(`/game/${joinedGameId}/spectator`);
      } else {
        navigate(`/lobby/${joinedGameId}`);
      }
    });

    socket.on("joinError", ({ message }) => {
      toast.error(message);
    });

    socket.emit("joinGame", { gameId, name, inviteCode, isSpectator });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white p-4">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
        SIGN-CARDCLASH - Join Game
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-600"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">
            Invite Code
          </label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-600"
            placeholder="Enter invite code"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isSpectator}
              onChange={() => setIsSpectator(!isSpectator)}
              className="mr-2 accent-orange-600"
            />
            <span className="text-sm text-gray-400">Join as Spectator</span>
          </label>
        </div>
        <Button
          onClick={handleJoinGame}
          className="w-full px-4 py-2 bg-orange-600 rounded hover:bg-orange-700"
        >
          Join Game
        </Button>
        <Link to={`/tutorial?gameId=${gameId || ""}&isJoinRoute=true`}>
          <Button className="w-full py-3 mt-4 text-base font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg">
            View Tutorial
          </Button>
        </Link>
      </div>
      <footer className="fixed bottom-2 text-gray-400 text-sm">
        Sign Card Clash by @muzecaka | ZEUS of Sign
      </footer>
    </div>
  );
}

export default JoinGame;

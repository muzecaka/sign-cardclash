import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import Button from "../components/Button";
import { toast } from "react-toastify";

function HostSetup() {
  const [hostName, setHostName] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [playerCount, setPlayerCount] = useState(5);
  const [roundTimeLimit, setRoundTimeLimit] = useState(30);
  const [gameCreated, setGameCreated] = useState(false);
  const [gameId, setGameId] = useState("");
  const [playerCodes, setPlayerCodes] = useState([]);
  const [spectatorCode, setSpectatorCode] = useState("");
  const navigate = useNavigate();

  // Debug log to confirm REACT_APP_CLIENT_URL
  console.log("REACT_APP_CLIENT_URL:", process.env.REACT_APP_CLIENT_URL);

  const handleCreateGame = () => {
    const trimmedHostName = hostName.trim();
    if (!trimmedHostName) {
      toast.error("Please enter your name!");
      return;
    }
    if (trimmedHostName.length > 20) {
      toast.error("Name must be 20 characters or less!");
      return;
    }

    if (!gameTitle || playerCount < 1 || playerCount > 30) {
      toast.error(
        "Please enter a game title and select a player count between 1 and 30."
      );
      return;
    }

    console.log(
      "Attempting to create game with title:",
      gameTitle,
      "player count:",
      playerCount,
      "round time limit:",
      roundTimeLimit,
      "host name:",
      trimmedHostName
    );
    socket.emit("createGame", {
      title: gameTitle,
      playerCount: Number(playerCount),
      hostName: trimmedHostName,
      roundTimeLimit: Number(roundTimeLimit),
    });

    socket.once(
      "gameCreated",
      ({
        gameId: newGameId,
        playerCodes: newPlayerCodes,
        spectatorCode: newSpectatorCode,
      }) => {
        console.log(
          "Game created successfully. Game ID:",
          newGameId,
          "Player Codes:",
          newPlayerCodes,
          "Spectator Code:",
          newSpectatorCode
        );
        setGameCreated(true);
        setGameId(newGameId);
        setPlayerCodes(newPlayerCodes);
        setSpectatorCode(newSpectatorCode);
      }
    );

    socket.on("connect", () => {
      console.log("Socket.IO connected successfully from HostSetup");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error in HostSetup:", error);
    });
  };

  const handleGoToLobby = () => {
    navigate(`/lobby/${gameId}`);
  };

  const handleCopyInviteCodes = () => {
    const baseUrl =
      process.env.REACT_APP_CLIENT_URL || "https://sign-cardclash.netlify.app";
    const textToCopy = `Game URL: ${baseUrl}/join/${gameId}\nPlayer Codes:\n${playerCodes
      .map((code) => `  - ${code}`)
      .join("\n")}\nSpectator Code: ${spectatorCode}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.info("Invite codes copied to clipboard!");
    });
  };

  if (gameCreated) {
    const baseUrl =
      process.env.REACT_APP_CLIENT_URL || "https://sign-cardclash.netlify.app";
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
            SIGN-CARDCLASH - Host Setup
          </h1>
          <div className="mb-4">
            <p className="text-lg">Game Title: {gameTitle}</p>
            <p className="text-sm text-gray-400">
              Game URL:{" "}
              <a
                href={`${baseUrl}/join/${gameId}`}
                className="underline"
              >{`${baseUrl}/join/${gameId}`}</a>
            </p>
            <p className="text-sm text-gray-400">Player Codes:</p>
            <ul className="list-disc list-inside text-gray-400">
              {playerCodes.map((code, index) => (
                <li key={index}>{code}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-400">
              Spectator Code: {spectatorCode}
            </p>
            <p className="text-sm text-gray-400">
              Round Time Limit: {roundTimeLimit} seconds
            </p>
          </div>
          <Button
            onClick={handleCopyInviteCodes}
            className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
          >
            Copy Invite Codes
          </Button>
          <Button
            onClick={handleGoToLobby}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            Go to Lobby
          </Button>
        </div>
        <footer className="fixed bottom-2 text-gray-400 text-sm">
          Sign Card Clash by @muzecaka | ZEUS of Sign
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
          SIGN-CARDCLASH - Host Game
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-600"
            placeholder="Enter your name"
            maxLength={20}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Game Title
          </label>
          <input
            type="text"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-600"
            placeholder="Enter game title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Number of Players
          </label>
          <select
            value={playerCount}
            onChange={(e) => setPlayerCount(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-600"
          >
            {[...Array(30).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Round Time Limit (seconds)
          </label>
          <select
            value={roundTimeLimit}
            onChange={(e) => setRoundTimeLimit(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-600"
          >
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={0}>No limit</option>
          </select>
        </div>
        <Button
          onClick={handleCreateGame}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          Create
        </Button>
      </div>
      <footer className="fixed bottom-2 text-gray-400 text-sm">
        Sign Card Clash by @muzecaka | ZEUS of Sign
      </footer>
    </div>
  );
}

export default HostSetup;

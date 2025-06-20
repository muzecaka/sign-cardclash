import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import HostScreen from "./HostScreen"; // Corrected import
import PlayerScreen from "./PlayerScreen"; // Corrected import

function GameScreen() {
  const { gameId } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    socket.emit("getGame", { gameId });
    socket.on("gameData", ({ game, role: newRole }) => {
      setRole(newRole);
    });

    return () => {
      socket.off("gameData");
    };
  }, [gameId]);

  if (!role)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white p-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
          SIGN-CARDCLASH
        </h1>
        <p>Loading...</p>
        <footer className="fixed bottom-2 text-gray-400 text-sm">
          Sign Card Clash by @muzecaka | ZEUS of Sign
        </footer>
      </div>
    );

  return role === "host" ? <HostScreen /> : <PlayerScreen />;
}

export default GameScreen;

import React from "react";
import { motion } from "framer-motion";

const getCardImage = (card) => {
  if (!card || !card.id) return "/assets/images/back.png";
  const basePath = "/assets/images/";
  if (card.id <= 25) return `${basePath}card${card.id}.png`;
  if (card.id <= 29) return `${basePath}special${card.id - 25}.png`;
  if (card.id === 30) return `${basePath}infinite.png`;
  return "/assets/images/back.png";
};

function Card({ card, onPick, isPlayerTurn, currentPlayerId, playerName }) {
  const isPicked = !!card.pickedBy;
  const isRevealed = !!card.value; // Card value is only present after reveal
  const canPick = isPlayerTurn && !isPicked && card.id;

  return (
    <motion.div
      className={`relative w-[50px] h-[75px] sm:w-[60px] sm:h-[90px] lg:w-[70px] lg:h-[105px] rounded-lg shadow-md cursor-${
        canPick ? "pointer" : "default"
      }`}
      onClick={() => canPick && onPick(card.id)}
      whileHover={canPick ? { scale: 1.1, y: -5 } : {}}
      animate={{ rotateY: isRevealed ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 backface-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        <img
          src={
            isRevealed
              ? getCardImage(card) // Show card value after reveal
              : "/assets/images/back.png" // Show back until revealed
          }
          alt={isRevealed ? `Card ${card.id}` : "Card Back"}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            console.error(`Failed to load image: ${e.target.src}`);
            e.target.src = "/assets/images/back.png";
          }}
        />
        {isPicked && !isRevealed && (
          <div className="absolute inset-0 bg-gray-800 opacity-50 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">Picked</span>
          </div>
        )}
        {isRevealed && playerName && (
          <div className="absolute bottom-0 left-0 right-0 bg-black-900 bg-opacity-50 text-white text-xs text-center py-1 rounded-b-lg">
            {playerName}
          </div>
        )}
      </motion.div>
      <motion.div
        className="absolute inset-0 backface-hidden"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        <img
          src="/assets/images/back.png"
          alt="Card Back"
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
    </motion.div>
  );
}

export default Card;

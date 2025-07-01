import { memo } from "react";
import { motion } from "framer-motion";

const Champions = memo(() => {
  console.log(
    "Rendering Champions.js with image: /assets/images/champions.png"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white"
    >
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 mb-8">
        Sign-CardClash Champion!
      </h1>
      <img
        src="/assets/images/champions.png"
        alt="Champion Trophy"
        className="w-full max-w-md h-auto object-contain"
        style={{ maxHeight: "500px", width: "100%" }}
        onError={(e) => console.error("Failed to load champions.png:", e)}
      />
      <p className="text-2xl mt-4">Congratulations, you are the Champion!</p>
      <footer className="fixed bottom-2 text-gray-400 text-sm">
        Sign Card Clash by @muzecaka | ZEUS of Sign
      </footer>
    </motion.div>
  );
});

export default Champions;

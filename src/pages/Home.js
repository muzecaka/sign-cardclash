import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-8">
        SIGN-CARDCLASH
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/host")}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition-background duration-300"
        >
          Host a Game
        </button>
        <button
          onClick={() => navigate("/join")}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition-background duration-300"
        >
          Join Game
        </button>
      </div>
      <footer className="fixed bottom-2 text-gray-400 text-sm">
        Sign Card Clash by @muzecaka | ZEUS of Sign
      </footer>
    </div>
  );
};

export default Home;

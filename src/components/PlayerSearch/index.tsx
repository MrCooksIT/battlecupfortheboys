// src/components/PlayerSearch/index.tsx
import React, { useState } from "react";
import { Search, ExternalLink, AlertCircle } from "lucide-react";
import { Player, PlayerHero } from "../../types";

interface PlayerSearchProps {
  onPlayerDataFound: (player: Player) => void;
}

const PlayerSearch: React.FC<PlayerSearchProps> = ({ onPlayerDataFound }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a Steam ID or Dotabuff URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Extract Steam ID from input
      let steamId = searchTerm.trim();

      // Handle Dotabuff URLs
      if (steamId.includes("dotabuff.com/players/")) {
        const match = steamId.match(/\/players\/(\d+)/);
        if (match && match[1]) {
          steamId = match[1];
        }
      }

      // For demo purposes, we'll use mocked data
      // In a real app, you would call OpenDota API here
      // Example: const response = await fetch(`https://api.opendota.com/api/players/${steamId}`);

      // Simulate API call delay
      setTimeout(() => {
        // Mock player data
        const playerData: Player = {
          id: steamId,
          name: `Player ${steamId.substring(0, 4)}`,
          position: Math.floor(Math.random() * 5) + 1,
          accountId: steamId,
          dotabuffUrl: `https://www.dotabuff.com/players/${steamId}`,
          mostPlayed: [
            { heroId: "Juggernaut", gamesPlayed: 56, winRate: 58.9 },
            { heroId: "Pudge", gamesPlayed: 48, winRate: 52.1 },
            { heroId: "Invoker", gamesPlayed: 42, winRate: 49.5 },
            { heroId: "Sniper", gamesPlayed: 39, winRate: 51.3 },
            { heroId: "Phantom Assassin", gamesPlayed: 37, winRate: 53.2 },
            { heroId: "Axe", gamesPlayed: 34, winRate: 55.9 },
            { heroId: "Lion", gamesPlayed: 31, winRate: 49.8 },
            { heroId: "Shadow Fiend", gamesPlayed: 28, winRate: 47.2 },
            { heroId: "Drow Ranger", gamesPlayed: 26, winRate: 50.1 },
            { heroId: "Crystal Maiden", gamesPlayed: 24, winRate: 54.2 },
          ],
        };

        onPlayerDataFound(playerData);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(
        "Error fetching player data. Please check the ID and try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h3 className="text-lg font-semibold mb-3">Search Player</h3>
      <p className="text-gray-300 mb-3">
        Enter a Steam ID or Dotabuff URL to find player's most played heroes
      </p>

      <div className="flex mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Steam ID or Dotabuff URL..."
            className="pl-9 pr-2 py-2 border border-gray-700 bg-gray-700 text-white rounded-l w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="bg-red-800 text-white p-2 mb-3 rounded-lg flex items-center">
          <AlertCircle size={16} className="mr-2" />
          {error}
        </div>
      )}

      <div className="text-sm text-gray-400">
        <p>Example formats:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Steam ID: 76561198045693131</li>
          <li>Dotabuff URL: https://www.dotabuff.com/players/85427403</li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerSearch;
